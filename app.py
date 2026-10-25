"""One Dark Player — минималистичный плеер для Яндекс Музыки в теме Atom One Dark."""

import ctypes
import json
import logging
import os
import re
import socket
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote, unquote

import requests
import webview
from yandex_music import Client
from yandex_music.exceptions import UnauthorizedError, YandexMusicError

from taskbar import TaskbarButtons

APP_TITLE = 'One Dark Player'
LOGIN_TITLE = 'Вход в Яндекс'
APP_DIR = Path(__file__).resolve().parent
# В собранном .exe интерфейс и иконка распакованы во временную папку PyInstaller.
RES_DIR = Path(getattr(sys, '_MEIPASS', APP_DIR))
FROZEN = getattr(sys, 'frozen', False)
DATA_DIR = Path(os.environ.get('APPDATA') or Path.home()) / 'OneDarkPlayer'
CONFIG_FILE = DATA_DIR / 'config.json'

# Публичный client_id приложения Яндекс Музыки: после входа Яндекс
# перенаправляет на адрес с #access_token=... — его и забираем.
OAUTH_URL = (
    'https://oauth.yandex.ru/authorize?response_type=token'
    '&client_id=23cabbbdc6cd418abb4b39c32c41195d'
)
TOKEN_RE = re.compile(r'access_token=([^&#\s]+)')
LOGIN_TIMEOUT = 600
UI_PORT = 47813  # постоянный адрес интерфейса, если порт свободен

MY_WAVE = 'user:onyourwave'
SETTING_GROUPS = (('diversity', 'Характер'), ('mood_energy', 'Настроение'), ('language', 'Язык'))
SETTING_PREFIX = {'diversity': 'settingDiversity', 'mood_energy': 'settingMoodEnergy', 'language': 'settingLanguage'}
# Если сервер не вернул настройки волны — показываем стандартные.
FALLBACK_SETTINGS = {
    'diversity': [('favorite', 'Любимое'), ('discover', 'Незнакомое'), ('popular', 'Популярное')],
    'mood_energy': [('active', 'Бодрое'), ('fun', 'Весёлое'), ('calm', 'Спокойное'), ('sad', 'Грустное')],
    'language': [('russian', 'Русский'), ('not-russian', 'Иностранный'), ('without-words', 'Без слов')],
}

LRC_TIME = re.compile(r'\[(\d+):(\d+(?:[.:]\d+)?)\]')
LRCLIB_URL = 'https://lrclib.net/api'
LRCLIB_HEADERS = {'User-Agent': 'OneDarkPlayer/1.1 (desktop player)'}
LRCLIB_TOLERANCE = 3  # секунд: длительность записи в LRCLIB может немного отличаться

log = logging.getLogger('player')


def load_config():
    try:
        return json.loads(CONFIG_FILE.read_text(encoding='utf-8'))
    except (OSError, ValueError):
        return {}


def save_config(config):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    CONFIG_FILE.write_text(json.dumps(config, ensure_ascii=False, indent=2), encoding='utf-8')


def colorref(hex_color):
    """'#21252b' -> COLORREF (0x00BBGGRR)."""
    r, g, b = (int(hex_color.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4))
    return (b << 16) | (g << 8) | r


def paint_titlebar(hwnd, caption='#21252b', text='#abb2bf', border='#181a1f', dark=True):
    """Красит системный заголовок окна в цвета темы (Windows 11)."""
    try:
        if not hwnd:
            return
        dwm = ctypes.windll.dwmapi
        # DWMWA_USE_IMMERSIVE_DARK_MODE, DWMWA_BORDER_COLOR, DWMWA_CAPTION_COLOR, DWMWA_TEXT_COLOR
        values = ((20, int(dark)), (34, colorref(border)), (35, colorref(caption)), (36, colorref(text)))
        for attr, value in values:
            v = ctypes.c_int(value)
            dwm.DwmSetWindowAttribute(hwnd, attr, ctypes.byref(v), ctypes.sizeof(v))
    except Exception:
        log.exception('Не удалось покрасить заголовок окна')


def pick_port():
    """Порт для интерфейса, который точно никто не слушает.

    Windows пускает два сервера на один порт, если оба просят SO_REUSEADDR (так делает
    сервер pywebview), и тогда окно может получить файлы чужого экземпляра. Поэтому
    проверяем порт эксклюзивной привязкой, а если он занят — берём свободный у системы.
    """
    for port in (UI_PORT, 0):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            try:
                sock.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
                sock.bind(('127.0.0.1', port))
                return sock.getsockname()[1]
            except OSError:
                continue
    return None


def find_window(title):
    try:
        return ctypes.windll.user32.FindWindowW(None, title)
    except Exception:
        return None


def extract_token(text):
    text = (text or '').strip()
    match = TOKEN_RE.search(text)
    if match:
        return match.group(1)
    return text if re.fullmatch(r'[\w\-.]{20,}', text) else None


def bare_id(track_id):
    """'123:456' -> '123': номер трека без альбома."""
    return str(track_id).split(':')[0]


def cover_url(uri, size='200x200'):
    return f'https://{uri.replace("%%", size)}' if uri else None


def parse_lrc(text):
    """'[01:02.50] строка' -> [{'t': 62.5, 'text': 'строка'}, ...] по возрастанию времени."""
    lines = []
    for raw in text.splitlines():
        stamps = LRC_TIME.findall(raw)
        words = LRC_TIME.sub('', raw).strip()
        for minutes, seconds in stamps:
            lines.append({'t': int(minutes) * 60 + float(seconds.replace(':', '.')), 'text': words})
    return sorted(lines, key=lambda line: line['t'])


def lyrics_result(text, synced, writers, source):
    """Текст -> {'synced', 'lines': [{'t', 'text'}], 'writers', 'source'}; LRC без меток становится обычным текстом."""
    lines = parse_lrc(text) if synced else []
    if not lines:
        synced = False
        lines = [{'t': None, 'text': line.strip()} for line in text.strip().splitlines()]
    return {'synced': synced, 'lines': lines, 'writers': writers, 'source': source}


def best_lrclib_match(items, duration):
    """Из результатов поиска — запись той же длительности (±3 с); синхронный текст в приоритете."""
    def diff(item):
        return abs((item.get('duration') or 0) - duration)

    candidates = [i for i in items or [] if not duration or diff(i) <= LRCLIB_TOLERANCE]
    candidates.sort(key=lambda i: (not i.get('syncedLyrics'), not i.get('plainLyrics'), diff(i)))
    return candidates[0] if candidates else None


def lrclib_lyrics(track):
    """Ищет текст в LRCLIB (lrclib.net) — открытой базе синхронных текстов песен."""
    title = track.title or ''
    artist = (track.artists_name() or [''])[0]
    if not title or not artist:
        return None
    duration = (track.duration_ms or 0) / 1000
    album = track.albums[0].title if track.albums else ''

    def get(path, params, strict=True):
        for attempt in range(2):
            response = requests.get(f'{LRCLIB_URL}/{path}', params=params, headers=LRCLIB_HEADERS, timeout=10)
            if response.status_code < 500 or not strict or attempt:
                break
            time.sleep(0.8)  # LRCLIB иногда отвечает 503 под нагрузкой — один повтор
        if response.status_code == 404 or (not strict and response.status_code != 200):
            return None
        response.raise_for_status()
        return response.json()

    # Точное совпадение по названию, исполнителю, альбому и длительности, иначе — поиск.
    # На /get LRCLIB отвечает 503, когда не смог заглянуть во внешние источники, — это не повод сдаваться.
    found = None
    if album and duration:
        found = get('get', {'track_name': title, 'artist_name': artist, 'album_name': album,
                            'duration': round(duration)}, strict=False)
    if not found:
        found = best_lrclib_match(get('search', {'track_name': title, 'artist_name': artist}), duration)
    if not found:
        return None
    if found.get('instrumental'):
        return {'synced': False, 'lines': [], 'writers': [], 'source': 'LRCLIB', 'instrumental': True}
    text = found.get('syncedLyrics') or found.get('plainLyrics') or ''
    if not text.strip():
        return None
    return lyrics_result(text, bool(found.get('syncedLyrics')), [], 'LRCLIB')


class StreamProxy:
    """Локальный прокси для аудио.

    Отдаёт поток Яндекса с заголовком CORS: без него Web Audio (эквалайзер)
    глушит звук с чужого домена. Пробрасывает Range, чтобы работала перемотка,
    и сам обновляет ссылку, если старая успела протухнуть.
    """

    PASS_HEADERS = ('Content-Type', 'Content-Length', 'Content-Range', 'Accept-Ranges')

    def __init__(self, resolve):
        self._resolve = resolve
        self._links = {}
        proxy = self

        class Handler(BaseHTTPRequestHandler):
            def do_OPTIONS(self):
                self.send_response(204)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Headers', 'Range')
                self.end_headers()

            def do_GET(self):
                proxy._serve(self)

            def log_message(self, *args):
                pass  # в окне без консоли писать некуда

        self._server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        self._server.daemon_threads = True
        self._server.handle_error = lambda request, address: log.exception('Аудио-прокси')
        threading.Thread(target=self._server.serve_forever, daemon=True).start()

    def register(self, track_id, link):
        self._links[track_id] = link
        return f'http://127.0.0.1:{self._server.server_port}/stream/{quote(track_id, safe="")}'

    def _open(self, track_id, headers, refresh=False):
        if refresh or track_id not in self._links:
            self._links[track_id] = self._resolve(track_id)
        return requests.get(self._links[track_id], headers=headers, stream=True, timeout=20)

    def _serve(self, req):
        track_id = unquote(req.path.removeprefix('/stream/'))
        headers = {'Accept-Encoding': 'identity'}
        if req.headers.get('Range'):
            headers['Range'] = req.headers['Range']
        upstream = None
        sent = False
        try:
            upstream = self._open(track_id, headers)
            if upstream.status_code in (401, 403, 404, 410):
                upstream.close()
                upstream = self._open(track_id, headers, refresh=True)
            req.send_response(upstream.status_code)
            for name in self.PASS_HEADERS:
                if name in upstream.headers:
                    req.send_header(name, upstream.headers[name])
            req.send_header('Access-Control-Allow-Origin', '*')
            req.end_headers()
            sent = True
            for chunk in upstream.iter_content(64 * 1024):
                req.wfile.write(chunk)
        except OSError:
            pass  # плеер оборвал запрос: перемотка или смена трека
        except Exception:
            log.exception('Аудио-прокси: %s', track_id)
            if not sent:
                try:
                    req.send_error(502)
                except OSError:
                    pass
        finally:
            if upstream is not None:
                upstream.close()


class Api:
    """Методы этого класса доступны из интерфейса как window.pywebview.api.*"""

    def __init__(self):
        self._client = None
        self._window = None
        self._tracks = {}
        self._liked = set()
        self._lyrics = {}
        self._wave = None
        self._hwnd = None
        self._titlebar = ()
        self._taskbar = None
        self._proxy = StreamProxy(lambda track_id: self._best_download(track_id).get_direct_link())

    # --- вход -------------------------------------------------------------

    def status(self):
        token = load_config().get('token')
        if not token:
            return {'authorized': False}
        try:
            self._client = Client(token, report_unknown_fields=False).init()
        except UnauthorizedError:
            return {'authorized': False, 'error': 'Сессия истекла, войдите ещё раз'}
        except YandexMusicError as e:
            log.exception('Ошибка подключения')
            return {'authorized': False, 'error': f'Нет связи с Яндекс Музыкой: {e}'}
        me = self._client.me
        account = me.account
        return {
            'authorized': True,
            'name': account.display_name or account.login or 'аккаунт',
            'plus': bool(me.plus and me.plus.has_plus),
        }

    def login(self):
        """Открывает окно входа Яндекса и ждёт, пока в адресе появится токен."""
        done = threading.Event()
        found = {}

        def check(text):
            token = TOKEN_RE.search(str(text or ''))
            if token and not done.is_set():
                found['token'] = token.group(1)
                done.set()

        def on_response(response):
            check(response.headers.get('Location') or response.headers.get('location'))

        win = webview.create_window(
            LOGIN_TITLE, OAUTH_URL, width=520, height=720, background_color='#282C34'
        )
        win.events.shown += lambda: paint_titlebar(find_window(LOGIN_TITLE))
        win.events.response_received += on_response
        win.events.closed += done.set

        waited = 0.0
        while not done.wait(0.1) and waited < LOGIN_TIMEOUT:
            waited += 0.1
            try:
                check(win.get_current_url())
            except Exception:
                pass

        if 'token' not in found:
            return {'authorized': False, 'error': 'Вход отменён'}
        try:
            win.destroy()
        except Exception:
            pass
        return self._save_token(found['token'])

    def set_token(self, text):
        token = extract_token(text)
        if not token:
            return {'authorized': False, 'error': 'Не похоже на токен'}
        return self._save_token(token)

    def _save_token(self, token):
        config = load_config()
        config['token'] = token
        save_config(config)
        return self.status()

    def logout(self):
        config = load_config()
        config.pop('token', None)
        save_config(config)
        self._client = None
        self._wave = None
        self._tracks.clear()
        self._liked.clear()
        self._lyrics.clear()
        return {'authorized': False}

    # --- библиотека -------------------------------------------------------

    def get_library(self):
        likes = self._client.users_likes_tracks()
        self._liked = {bare_id(t) for t in likes.tracks_ids} if likes else set()
        playlists = [
            {'id': 'liked', 'title': 'Мне нравится', 'count': len(self._liked), 'icon': 'heart'},
            {'id': 'wave', 'title': 'Моя волна', 'count': None, 'icon': 'wave'},
        ]
        for p in self._client.users_playlists_list():
            playlists.append({'id': str(p.kind), 'title': p.title, 'count': p.track_count, 'icon': 'list'})
        return playlists

    def get_tracks(self, source):
        client = self._client
        if source == 'liked':
            likes = client.users_likes_tracks()
            tracks = likes.fetch_tracks() if likes else []
        else:
            playlist = client.users_playlists(int(source))
            shorts = playlist.tracks or []
            tracks = [s.track for s in shorts if s.track]
            if len(tracks) < len(shorts):
                tracks = client.tracks([s.track_id for s in shorts])
        return [self._pack(t) for t in tracks]

    def get_stream(self, track_id):
        best = self._best_download(track_id)
        return {
            'url': self._proxy.register(track_id, best.get_direct_link()),
            'codec': best.codec,
            'bitrate': best.bitrate_in_kbps,
            'preview': bool(best.preview),
        }

    def _best_download(self, track_id):
        infos = self._track(track_id).get_download_info()
        if not infos:
            raise RuntimeError('Трек недоступен для прослушивания')
        mp3 = [i for i in infos if i.codec == 'mp3'] or infos
        return max(mp3, key=lambda i: i.bitrate_in_kbps)

    def get_lyrics(self, track_id):
        """Текст песни: из Яндекса, а если он не отдал — из открытой базы LRCLIB. None — текста нет."""
        if track_id in self._lyrics:
            return self._lyrics[track_id]
        track = self._track(track_id)
        result = self._yandex_lyrics(track)
        if result is None:
            try:
                result = lrclib_lyrics(track)
            except (requests.RequestException, ValueError) as e:
                # не кэшируем и не выдаём за «текста нет»: в следующий раз попробуем снова
                log.warning('LRCLIB: %s', e)
                raise RuntimeError('LRCLIB сейчас не отвечает, попробуйте чуть позже') from e
        self._lyrics[track_id] = result
        return result

    def _yandex_lyrics(self, track):
        info = track.lyrics_info
        if info is not None and not (info.has_available_sync_lyrics or info.has_available_text_lyrics):
            return None
        synced = bool(info and info.has_available_sync_lyrics)
        try:
            lyrics = track.get_lyrics(format_='LRC' if synced else 'TEXT')
            text = lyrics.fetch_lyrics() if lyrics else ''
        except YandexMusicError:
            return None
        if not text.strip():
            return None
        source = lyrics.major.pretty_name if lyrics.major else 'Яндекс Музыка'
        return lyrics_result(text, synced, list(lyrics.writers or []), source)

    # --- плейлисты --------------------------------------------------------

    def playlist_add(self, kind, track_id):
        """Добавляет трек в начало плейлиста (как приложение Яндекса). Повторно не добавляет."""
        playlist = self._client.users_playlists(int(kind))
        number, _, album = str(track_id).partition(':')
        if any(bare_id(s.track_id) == number for s in playlist.tracks or []):
            return {'added': False, 'count': playlist.track_count}
        if not album:
            track = self._track(track_id)
            album = track.albums[0].id if track.albums else None
        if not album:
            raise RuntimeError('У трека нет альбома — Яндекс не даёт добавить его в плейлист')
        updated = self._client.users_playlists_insert_track(
            int(kind), number, album, at=0, revision=playlist.revision
        )
        return {'added': True, 'count': updated.track_count if updated else (playlist.track_count or 0) + 1}

    def playlist_remove(self, kind, track_id):
        playlist = self._client.users_playlists(int(kind))
        key = bare_id(track_id)
        for index, short in enumerate(playlist.tracks or []):
            if bare_id(short.track_id) == key:
                updated = self._client.users_playlists_delete_track(
                    int(kind), index, index + 1, revision=playlist.revision
                )
                return {'removed': True, 'count': updated.track_count if updated else max(0, index)}
        return {'removed': False, 'count': playlist.track_count}

    def playlist_create(self, title):
        playlist = self._client.users_playlists_create(title, visibility='private')
        return {'id': str(playlist.kind), 'title': playlist.title, 'count': 0, 'icon': 'list'}

    def toggle_like(self, track_id):
        key = bare_id(track_id)
        if key in self._liked:
            self._client.users_likes_tracks_remove(track_id)
            self._liked.discard(key)
        else:
            self._client.users_likes_tracks_add(track_id)
            self._liked.add(key)
        return key in self._liked

    # --- Моя волна --------------------------------------------------------

    def get_wave_settings(self):
        """Занятия и настройки волны (характер, настроение, язык) с сидами для сессии."""
        contexts, groups = [], []
        try:
            settings = self._client.rotor_wave_settings(MY_WAVE)
        except YandexMusicError:
            log.exception('Настройки волны')
            settings = None
        if settings:
            for block in settings.blocks or []:
                if block.type != 'contexts':
                    continue
                for station in block.items or []:
                    seed = f'{station.id.type}:{station.id.tag}' if station.id else None
                    if seed and seed != MY_WAVE:
                        contexts.append({'seed': seed, 'name': station.name})
            restrictions = settings.setting_restrictions
            for key, title in SETTING_GROUPS:
                enum = getattr(restrictions, key, None) if restrictions else None
                values = [
                    {'seed': v.serialized_seed or f'{SETTING_PREFIX[key]}:{v.value}', 'name': v.name}
                    for v in (enum.possible_values if enum else None) or []
                    if not v.unspecified
                ]
                if values:
                    groups.append({'key': key, 'title': title, 'values': values})
        if not groups:
            groups = [
                {'key': key, 'title': title, 'values': [
                    {'seed': f'{SETTING_PREFIX[key]}:{value}', 'name': name}
                    for value, name in FALLBACK_SETTINGS[key]
                ]}
                for key, title in SETTING_GROUPS
            ]
        return {'contexts': contexts, 'groups': groups}

    def wave_start(self, seeds):
        """Новая сессия волны. seeds: ['user:onyourwave', 'settingMoodEnergy:calm'], ['track:123'], ['artist:45']…"""
        seeds = [s for s in seeds or [] if s] or [MY_WAVE]
        session = self._client.rotor_session_new(seeds, include_tracks_in_response=True)
        if not session or not session.radio_session_id:
            raise RuntimeError('Яндекс не запустил волну')
        self._wave = {'id': session.radio_session_id, 'batch': session.batch_id, 'seeds': seeds}
        self._quietly(self._client.rotor_session_feedback_radio_started, session.radio_session_id, session.batch_id)
        return [self._pack(item.track) for item in session.sequence or [] if item.track]

    def wave_playlist(self, kind):
        """Моя волна по плейлисту. Формат сида не документирован — пробуем известные варианты."""
        uid = self._client.me.account.uid
        playlist = self._client.users_playlists(int(kind))
        candidates = [f'playlist:{uid}_{kind}', f'playlist:{uid}:{kind}']
        if playlist.playlist_uuid:
            candidates.append(f'playlist:{playlist.playlist_uuid}')
        error = None
        for seed in candidates:
            try:
                tracks = self.wave_start([seed])
            except (YandexMusicError, RuntimeError) as e:
                error = e
                continue
            if tracks:
                return {'seeds': [seed], 'tracks': tracks}
        raise RuntimeError(f'Яндекс не запустил волну по плейлисту{f": {error}" if error else ""}')

    def wave_more(self, queue):
        """Следующая порция треков текущей волны. queue — уже полученные треки, чтобы не повторялись."""
        wave = self._wave
        if not wave:
            raise RuntimeError('Волна не запущена')
        queue = [str(t) for t in queue or []][-100:]
        result = self._client.rotor_session_tracks(wave['id'], queue=queue)
        if result is None or result.unknown_session:
            session = self._client.rotor_session_new(wave['seeds'], queue=queue, include_tracks_in_response=True)
            wave.update(id=session.radio_session_id, batch=session.batch_id)
            sequence = session.sequence
        else:
            wave['batch'] = result.batch_id or wave['batch']
            sequence = result.sequence
        return [self._pack(item.track) for item in sequence or [] if item.track]

    def wave_feedback(self, event, track_id, played=0):
        """Обратная связь волне: started / finished / skip — по ней Яндекс подстраивает рекомендации."""
        wave = self._wave
        if not wave:
            return False
        client = self._client
        if event == 'started':
            client.rotor_session_feedback_track_started(wave['id'], track_id, wave['batch'])
        elif event == 'finished':
            client.rotor_session_feedback_track_finished(wave['id'], track_id, float(played), wave['batch'])
        elif event == 'skip':
            client.rotor_session_feedback_skip(wave['id'], track_id, float(played), wave['batch'])
        return True

    # --- служебное --------------------------------------------------------

    def get_settings(self):
        """Настройки интерфейса (тема, эквалайзер, громкость…) из config.json."""
        return load_config().get('ui', {})

    def save_settings(self, settings):
        config = load_config()
        config['ui'] = settings
        save_config(config)
        return True

    def set_title(self, text):
        if self._window:
            self._window.set_title(text or APP_TITLE)

    def set_playing(self, playing):
        """Меняет кнопку «играть / пауза» на превью в панели задач."""
        if self._taskbar:
            self._taskbar.set_playing(playing)

    def set_titlebar(self, caption, text, border, dark=True):
        self._titlebar = (caption, text, border, dark)
        self._hwnd = self._hwnd or find_window(APP_TITLE)
        paint_titlebar(self._hwnd, *self._titlebar)

    def _track(self, track_id):
        return self._tracks.get(track_id) or self._client.tracks([track_id])[0]

    @staticmethod
    def _quietly(func, *args):
        try:
            func(*args)
        except Exception:
            log.exception('Фоновый запрос %s', getattr(func, '__name__', func))

    def _pack(self, track):
        track_id = str(track.track_id)
        self._tracks[track_id] = track
        title = track.title or 'Без названия'
        if track.version:
            title += f' ({track.version})'
        artists = [{'id': a.id, 'name': a.name} for a in track.artists or [] if a.id and a.name]
        return {
            'id': track_id,
            'title': title,
            'artists': ', '.join(track.artists_name()) or 'Неизвестный исполнитель',
            'artistList': artists,
            'duration': (track.duration_ms or 0) // 1000,
            'cover': cover_url(track.cover_uri),
            'available': track.available is not False,
            'liked': bare_id(track_id) in self._liked,
        }


def main():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(
        filename=DATA_DIR / 'player.log',
        level=logging.INFO,
        format='%(asctime)s %(levelname)s %(name)s: %(message)s',
        encoding='utf-8',
    )
    if not FROZEN:
        # Запуск из исходников: своя кнопка в панели задач, а не общая с Python.
        try:
            ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID('OneDarkPlayer')
        except Exception:
            pass
    api = Api()
    window = webview.create_window(
        APP_TITLE,
        str(RES_DIR / 'ui' / 'index.html'),
        js_api=api,
        width=1100,
        height=700,
        min_size=(720, 480),
        background_color='#282C34',
    )
    api._window = window

    def on_taskbar_click(action):
        # клик приходит в потоке окна; JS вызываем из отдельного, иначе окно ждёт само себя
        threading.Thread(
            target=window.run_js, args=(f"window.taskbarAction && taskbarAction('{action}')",), daemon=True
        ).start()

    def on_shown():
        # окно ищем по заголовку сразу при показе: потом заголовок меняется на название трека
        api._hwnd = api._hwnd or find_window(APP_TITLE)
        paint_titlebar(api._hwnd, *api._titlebar)
        try:
            api._taskbar = TaskbarButtons(api._hwnd, RES_DIR / 'assets' / 'taskbar', on_taskbar_click)
        except Exception:
            log.exception('Кнопки на превью в панели задач')

    window.events.shown += on_shown
    webview.start(
        private_mode=False,
        storage_path=str(DATA_DIR / 'webview'),
        icon=str(RES_DIR / 'icon.ico'),
        http_port=pick_port(),
    )


if __name__ == '__main__':
    main()
