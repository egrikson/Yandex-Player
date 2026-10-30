'use strict';

/* ---------- иконки ---------- */

const SPEAKER = '<path class="ico-fill" d="M4 9.5h3.2L12 5.6v12.8l-4.8-3.9H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z"/>';
const ICONS = {
  play: '<path class="ico-fill" d="M8 5.2v13.6a.8.8 0 0 0 1.2.7l10.6-6.8a.8.8 0 0 0 0-1.4L9.2 4.5A.8.8 0 0 0 8 5.2z"/>',
  pause: '<rect class="ico-fill" x="6" y="5" width="4" height="14" rx="1"/><rect class="ico-fill" x="14" y="5" width="4" height="14" rx="1"/>',
  prev: '<path class="ico-fill" d="M18 6.2v11.6a.7.7 0 0 1-1.1.6L9 12.6a.7.7 0 0 1 0-1.2l7.9-5.8a.7.7 0 0 1 1.1.6z"/><path class="ico-stroke" d="M6 6v12"/>',
  next: '<path class="ico-fill" d="M6 6.2v11.6a.7.7 0 0 0 1.1.6L15 12.6a.7.7 0 0 0 0-1.2L7.1 5.6A.7.7 0 0 0 6 6.2z"/><path class="ico-stroke" d="M18 6v12"/>',
  shuffle: '<path class="ico-stroke" d="M3 7h3c2.2 0 3.4 1.1 4.6 3l2.8 4c1.2 1.9 2.4 3 4.6 3h3M18 14l3 3-3 3M3 17h3c1.5 0 2.5-.5 3.4-1.4M14.6 8.4C15.5 7.5 16.5 7 18 7h3M18 4l3 3-3 3"/>',
  repeat: '<path class="ico-stroke" d="M17 3l3 3-3 3M4 12v-1a5 5 0 0 1 5-5h11M7 21l-3-3 3-3M20 12v1a5 5 0 0 1-5 5H4"/>',
  volume: SPEAKER + '<path class="ico-stroke" d="M15.5 9a4 4 0 0 1 0 6M18.5 6a8 8 0 0 1 0 12"/>',
  volumeLow: SPEAKER + '<path class="ico-stroke" d="M15.5 9a4 4 0 0 1 0 6"/>',
  mute: SPEAKER + '<path class="ico-stroke" d="M16 9.5l5 5M21 9.5l-5 5"/>',
  heart: '<path class="ico-stroke" d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z"/>',
  wave: '<path class="ico-stroke" d="M2.5 12c1.6-3.5 3.2-3.5 4.8 0s3.2 3.5 4.7 0 3.2-3.5 4.7 0 3.2 3.5 4.8 0"/>',
  list: '<path class="ico-stroke" d="M4 6h16M4 12h16M4 18h10"/>',
  queue: '<path class="ico-stroke" d="M4 6h13M4 11h13M4 16h7"/><path class="ico-fill" d="M15 14.2v6.1a.5.5 0 0 0 .8.4l4.6-3a.5.5 0 0 0 0-.9l-4.6-3a.5.5 0 0 0-.8.4z"/>',
  mic: '<rect class="ico-stroke" x="9" y="3" width="6" height="11" rx="3"/><path class="ico-stroke" d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  sliders: '<path class="ico-stroke" d="M6 4v7M6 15v5M12 4v2M12 10v10M18 4v9M18 17v3"/><circle class="ico-stroke" cx="6" cy="13" r="2"/><circle class="ico-stroke" cx="12" cy="8" r="2"/><circle class="ico-stroke" cx="18" cy="15" r="2"/>',
  swap: '<path class="ico-stroke" d="M4 8h15M15 4l4 4-4 4M20 16H5M9 12l-4 4 4 4"/>',
  close: '<path class="ico-stroke" d="M6 6l12 12M18 6L6 18"/>',
  search: '<circle class="ico-stroke" cx="11" cy="11" r="6.5"/><path class="ico-stroke" d="M20 20l-4.2-4.2"/>',
  refresh: '<path class="ico-stroke" d="M20 12a8 8 0 1 1-2.4-5.7M20 4v5h-5"/>',
  logout: '<path class="ico-stroke" d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/>',
  chevron: '<path class="ico-stroke" d="M7 10l5 5 5-5"/>',
  back: '<path class="ico-stroke" d="M19 12H5M11 18l-6-6 6-6"/>',
  user: '<circle class="ico-stroke" cx="12" cy="8" r="4"/><path class="ico-stroke" d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  note: '<path class="ico-stroke" d="M9 18V5.5l10-2V16"/><circle class="ico-stroke" cx="6.5" cy="18" r="2.5"/><circle class="ico-stroke" cx="16.5" cy="16" r="2.5"/>',
  keyboard: '<rect class="ico-stroke" x="2.5" y="6" width="19" height="12" rx="2"/><path class="ico-stroke" d="M6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M8 14h8"/>',
  palette: '<path class="ico-stroke" d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.5-.2-.8-.5-1.2-.3-.4-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5C21 6.4 17 3 12 3z"/>'
         + '<circle class="ico-fill" cx="7.5" cy="11" r="1.2"/><circle class="ico-fill" cx="10" cy="7.3" r="1.2"/><circle class="ico-fill" cx="14.5" cy="7.3" r="1.2"/>',
  check: '<path class="ico-stroke" d="M5 12.5l4.5 4.5L19 7.5"/>',
  plus: '<path class="ico-stroke" d="M12 5v14M5 12h14"/>',
  listAdd: '<path class="ico-stroke" d="M4 6h12M4 11h12M4 16h7M18 14v6M15 17h6"/>',
  trash: '<path class="ico-stroke" d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>',
  blank: '',
  logo: '<path class="ico-stroke" style="stroke:var(--purple);stroke-width:1.6" d="M7 6l-4.5 6L7 18M17 6l4.5 6-4.5 6"/>'
      + '<path class="ico-fill" style="fill:var(--blue)" d="M9.8 8.4v7.2a.6.6 0 0 0 .9.5l5.6-3.6a.6.6 0 0 0 0-1l-5.6-3.6a.6.6 0 0 0-.9.5z"/>',
};
const svg = (name, cls = '') => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${ICONS[name]}</svg>`;
const setIcon = (el, name) => { el.innerHTML = svg(name); };
const EQ_ANIM = '<span class="eq"><i></i><i></i><i></i></span>';

/* ---------- утилиты ---------- */

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const bareId = id => String(id).split(':')[0];
const bigCover = (url, size) => (url ? url.replace('200x200', size) : null);
const alpha = (hex, a) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

function fmt(sec) {
  sec = Math.max(0, Math.floor(sec || 0));
  const h = Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, s = String(sec % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

function plural(n, one, few, many) {
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return one;
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few;
  return many;
}

// Настройки живут в config.json через бэкенд: localStorage привязан к порту интерфейса и может теряться.
const store = {
  data: {},
  timer: 0,
  get(key, fallback) {
    return Object.hasOwn(this.data, key) ? this.data[key] : fallback;
  },
  set(key, value) {
    this.data[key] = value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => call('save_settings', this.data).catch(() => {}), 400);
  },
};

function hydratePrefs() {
  Object.assign(state, {
    shuffle: store.get('shuffle', false),
    repeat: store.get('repeat', 'off'),
    volume: store.get('volume', 80),
    waveSettings: store.get('waveSettings', {}),
    waveTuneOpen: store.get('waveTuneOpen', false),
    sideTab: store.get('sideTab', 'queue'),
    sideLeft: store.get('sideLeft', false),
  });
  eq.gains = savedGains();
  eq.on = store.get('eqOn', true);
}

async function call(name, ...args) {
  try {
    return await window.pywebview.api[name](...args);
  } catch (e) {
    throw new Error(e?.message || String(e));
  }
}

function toast(type, text) {
  const box = $('toasts');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = text;
  box.append(el);
  while (box.children.length > 4) box.firstElementChild.remove();
  setTimeout(() => {
    el.classList.add('leave');
    setTimeout(() => el.remove(), 300);
  }, type === 'error' ? 5000 : 3500);
}

/* ---------- состояние ---------- */

const state = {
  playlists: [],
  cache: new Map(),      // id источника -> треки
  view: null,            // открытый в списке источник
  visible: [],           // треки списка с учётом фильтра
  filter: '',
  queue: [],             // очередь воспроизведения
  order: [],             // порядок индексов очереди (для перемешивания)
  pos: -1,
  source: null,          // откуда играет очередь
  current: null,
  shuffle: store.get('shuffle', false),
  repeat: store.get('repeat', 'off'),
  volume: store.get('volume', 80),
  muted: false,
  plus: true,
  preview: false,
  errors: 0,
  viewSeq: 0,
  playSeq: 0,

  // Моя волна
  wave: null,            // { kind: 'my' | 'track' | 'artist', title, seeds }
  waveSeq: 0,
  waveLoading: false,
  waveOptions: null,     // занятия и настройки с сервера
  waveSettings: store.get('waveSettings', {}),
  waveTuneOpen: store.get('waveTuneOpen', false),
  waveTrack: null,       // трек волны, о котором ещё не отправлен итог (дослушан / пропущен)
  moreWave: null,

  // развёрнутый вид
  stageOpen: false,
  sideTab: store.get('sideTab', 'queue'),
  sideLeft: store.get('sideLeft', false),
  lyrics: null,
  lyricsFor: null,
  lyricsLine: -1,
  lyricsHoldUntil: 0,
  lyricsCache: new Map(),

  // вкладки: id — 'liked', номер плейлиста, 'wave' или 'artist:<id>'; preview — вкладка-предпросмотр (курсивом)
  tabs: [],
  artists: new Map(),    // id -> { id, name, info, total, page, loading, started, error }
  artistNames: new Map(),
  savedTabs: '',
};

const audio = new Audio();
audio.preload = 'auto';
audio.crossOrigin = 'anonymous'; // поток идёт через локальный прокси с CORS — нужно для эквалайзера

/* ---------- вход ---------- */

let booted = false;

async function boot() {
  if (booted || !window.pywebview?.api?.status) return;
  booted = true;
  store.data = (await call('get_settings').catch(() => null)) || {};
  hydratePrefs();
  bindUi();
  applyTheme(store.get('theme', 'onedark'));
  const st = await call('status').catch(e => ({ authorized: false, error: e.message }));
  st.authorized ? enter(st) : showLogin(st.error);
}

function showLogin(error) {
  $('splash').hidden = true;
  $('app').hidden = true;
  $('login').hidden = false;
  setLoginError(error);
}

function setLoginError(text) {
  $('loginError').hidden = !text;
  $('loginError').textContent = text || '';
}

async function doLogin(method, ...args) {
  const btn = $('loginBtn');
  btn.disabled = true;
  if (method === 'login') btn.textContent = 'Ждём входа в окне Яндекса…';
  setLoginError('');
  try {
    const st = await call(method, ...args);
    st.authorized ? enter(st) : setLoginError(st.error);
  } catch (e) {
    setLoginError(e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Войти через Яндекс';
  }
}

async function enter(st) {
  $('splash').hidden = true;
  $('login').hidden = true;
  $('app').hidden = false;
  $('userName').textContent = st.name;
  $('statusDot').classList.add('ok');
  state.plus = st.plus;
  updateWarn();

  $('library').innerHTML = '<div class="tree-skeleton">// загрузка…</div>';
  $('playlists').innerHTML = '';
  try {
    state.playlists = await call('get_library');
  } catch (e) {
    $('library').innerHTML = '<div class="tree-skeleton">// не загрузилось</div>';
    toast('error', `Не удалось загрузить библиотеку: ${e.message}`);
    return;
  }
  restoreTabs();
}

/** Открытые в прошлый раз вкладки: плейлисты, которых больше нет, отбрасываем. */
function restoreTabs() {
  const saved = store.get('tabs', null);
  const known = id => isArtist(id) || state.playlists.some(p => p.id === id);
  state.tabs = (Array.isArray(saved) ? saved : [])
    .filter(t => t && known(t.id))
    .map(t => {
      if (isArtist(t.id) && t.name) state.artistNames.set(t.id.slice(7), t.name);
      return { id: t.id, preview: !!t.preview };
    });
  const last = store.get('view', 'liked');
  if (state.tabs.some(t => t.id === last)) activateTab(last);
  else if (state.tabs.length) activateTab(state.tabs[0].id);
  else openView(state.playlists.some(p => p.id === last) ? last : 'liked', false, true);
}

async function logout() {
  if (!confirm('Выйти из аккаунта Яндекса?')) return;
  stopPlayback();
  closeStage();
  state.cache.clear();
  state.lyricsCache.clear();
  Object.assign(state, { queue: [], order: [], current: null, source: null, wave: null, waveOptions: null, tabs: [], view: null });
  state.artists.clear();
  renderTabs();
  await call('logout').catch(() => {});
  showLogin();
}

/* ---------- дерево и список ---------- */

const playlistById = id => state.playlists.find(p => p.id === id);
const isSystem = p => p.id === 'liked' || p.id === 'wave';
const isArtist = id => String(id).startsWith('artist:');
const sourceTitle = id => {
  if (id === 'wave') return state.wave?.title || 'Моя волна';
  if (isArtist(id)) return state.artistNames.get(id.slice(7)) || 'исполнитель';
  return playlistById(id)?.title || '';
};
const artistLinks = t => (t.artistList?.length
  ? t.artistList.map(a => `<span class="a-link" data-artist="${esc(a.id)}">${esc(a.name)}</span>`).join(', ')
  : esc(t.artists));

function renderTree() {
  const item = p => `
    <button class="tree-item${p.id === state.view ? ' active' : ''}${p.id === state.source ? ' playing' : ''}"
            data-id="${esc(p.id)}" title="${esc(p.title)}">
      ${svg(p.icon, 'i-' + p.icon)}<span class="name">${esc(p.title)}</span>
      ${p.count != null ? `<span class="count">${p.count}</span>` : ''}
    </button>`;
  const own = state.playlists.filter(p => !isSystem(p));
  $('library').innerHTML = state.playlists.filter(isSystem).map(item).join('');
  $('playlists').innerHTML = own.length ? own.map(item).join('') : '<div class="tree-skeleton">// пока нет</div>';
}

/** Открывает плейлист во вкладке: pin — сразу закреплённой, иначе предпросмотром. */
async function openView(id, force = false, pin = false) {
  const p = playlistById(id);
  if (!p) return;
  const seq = ++state.viewSeq;
  state.view = id;
  clearFilter();
  $('refreshBtn').classList.remove('spin');
  $('waveBar').hidden = id !== 'wave';
  ensureTab(id, pin);
  renderTabs();
  renderTree();

  if (id === 'wave') {
    renderWaveBar();
    if (!state.waveOptions) loadWaveOptions();
    if (force || (!state.cache.has('wave') && !state.waveLoading)) {
      startWave(state.wave || myWave());
    } else if (state.waveLoading) {
      listMessage('запускаю волну…');
    } else {
      renderList();
    }
    return;
  }

  let tracks = force ? null : state.cache.get(id);
  if (!tracks) {
    listMessage(`загружаю «${p.title}»…`);
    $('refreshBtn').classList.add('spin');
    try {
      tracks = await call('get_tracks', id);
    } catch (e) {
      if (seq === state.viewSeq) {
        $('refreshBtn').classList.remove('spin');
        listMessage(`не удалось загрузить: ${e.message}`, true);
      }
      return;
    }
    state.cache.set(id, tracks);
    if (p.count !== null) {
      p.count = tracks.length;
      renderTree();
    }
  }
  if (seq !== state.viewSeq) return;
  $('refreshBtn').classList.remove('spin');
  renderList();
  $('list').scrollTop = 0;
}

function listMessage(text, error = false) {
  $('list').innerHTML = `<div class="comment${error ? ' error' : ''}">// ${esc(text)}</div>`;
  $('statusSource').textContent = '';
}

function rowHtml(t, i) {
  const cur = state.current?.id === t.id;
  const cls = ['row'];
  if (!t.available) cls.push('off');
  if (cur) cls.push('current');
  if (cur && !audio.paused) cls.push('playing');
  const tip = `${t.title} — ${t.artists}${t.available ? '' : ' (недоступен)'}`;
  return `<div class="${cls.join(' ')}" data-i="${i}" title="${esc(tip)}">`
    + `<span class="gutter">${cur ? EQ_ANIM : i + 1}</span>`
    + `<button class="icon-btn like${t.liked ? ' on' : ''}" data-act="like" title="Мне нравится">${svg('heart')}</button>`
    + `<span class="r-title">${esc(t.title)}</span>`
    + `<span class="r-artist">${artistLinks(t)}</span>`
    + `<span class="r-dur">${fmt(t.duration)}</span>`
    + '</div>';
}

function renderList() {
  if (!state.view) return renderEmpty();
  if (isArtist(state.view)) return renderArtist();
  const all = state.cache.get(state.view) || [];
  const q = state.filter.trim().toLowerCase();
  state.visible = q ? all.filter(t => `${t.title} ${t.artists}`.toLowerCase().includes(q)) : all;
  if (!all.length) return listMessage('здесь пусто');
  if (!state.visible.length) return listMessage(`ничего не найдено по «${state.filter.trim()}»`);
  $('list').innerHTML = state.visible.map(rowHtml).join('');
  updateStatusSource();
}

function updateStatusSource() {
  const all = state.cache.get(state.view) || [];
  const n = state.visible.length;
  const total = currentArtist()?.total ?? all.length;
  const count = state.filter.trim() || total > all.length
    ? `${n} из ${total}`
    : `${n} ${plural(n, 'трек', 'трека', 'треков')}`;
  $('statusSource').textContent = `${sourceTitle(state.view)} · ${count}`;
}

const rowOf = t => {
  const i = t ? state.visible.indexOf(t) : -1;
  return i < 0 ? null : $('list').querySelector(`.row[data-i="${i}"]`);
};

function markCurrent() {
  const old = $('list').querySelector('.row.current');
  if (old) {
    old.classList.remove('current', 'playing');
    old.querySelector('.gutter').textContent = +old.dataset.i + 1;
  }
  const row = state.current && rowOf(state.visible.find(t => t.id === state.current.id));
  if (row) {
    row.classList.add('current');
    row.classList.toggle('playing', !audio.paused);
    row.querySelector('.gutter').innerHTML = EQ_ANIM;
  }
}

function revealCurrent() {
  if (!state.source || !state.current) return;
  const go = state.view === state.source ? Promise.resolve() : openSource(state.source);
  go.then(() => {
    const row = rowOf(state.visible.find(t => t.id === state.current.id));
    row?.scrollIntoView({ block: 'center' });
  });
}

function openSource(id) {
  return isArtist(id) ? openArtist({ id: id.slice(7), name: state.artistNames.get(id.slice(7)) }) : openView(id);
}

/* ---------- вкладки ---------- */

function clearFilter() {
  if (!state.filter) return;
  state.filter = '';
  $('filter').value = '';
}

function tabInfo(id) {
  if (isArtist(id)) return { title: state.artistNames.get(id.slice(7)) || 'исполнитель', icon: 'user', cls: 'i-user' };
  const p = playlistById(id);
  return p ? { title: p.title, icon: p.icon, cls: `i-${p.icon}` } : null;
}

/** Делает вкладку открытой. Предпросмотр заменяет прежний предпросмотр, новые встают справа от активной. */
function ensureTab(id, pin = false) {
  let tab = state.tabs.find(t => t.id === id);
  if (tab) {
    if (pin) tab.preview = false;
    return tab;
  }
  tab = { id, preview: !pin };
  const preview = state.tabs.findIndex(t => t.preview);
  if (preview >= 0 && !pin) {
    state.tabs[preview] = tab;
  } else {
    const at = state.tabs.findIndex(t => t.id === state.view);
    state.tabs.splice(at < 0 ? state.tabs.length : at + 1, 0, tab);
  }
  return tab;
}

function pinTab(id) {
  const tab = state.tabs.find(t => t.id === id);
  if (tab?.preview) {
    tab.preview = false;
    renderTabs();
  }
}

function activateTab(id) {
  if (isArtist(id)) return openArtist({ id: id.slice(7) });
  return openView(id);
}

function closeTab(id) {
  const i = state.tabs.findIndex(t => t.id === id);
  if (i < 0) return;
  state.tabs.splice(i, 1);
  if (isArtist(id)) {
    state.artists.delete(id.slice(7));
    state.cache.delete(id);
  }
  if (state.view !== id) return renderTabs();
  const neighbour = state.tabs[i] || state.tabs[i - 1];
  if (neighbour) activateTab(neighbour.id);
  else showEmpty();
}

function closeTabs(keep) {
  const closing = state.tabs.filter(t => !keep(t)).map(t => t.id);
  for (const id of closing) closeTab(id);
}

function moveTab(id, targetId, after) {
  const from = state.tabs.findIndex(t => t.id === id);
  if (from < 0 || id === targetId) return;
  const [tab] = state.tabs.splice(from, 1);
  const to = state.tabs.findIndex(t => t.id === targetId);
  state.tabs.splice(to < 0 ? state.tabs.length : to + (after ? 1 : 0), 0, tab);
  renderTabs();
}

function cycleTab(step) {
  if (!state.tabs.length) return;
  const i = state.tabs.findIndex(t => t.id === state.view);
  activateTab(state.tabs[(i + step + state.tabs.length) % state.tabs.length].id);
}

function renderTabs() {
  const strip = $('tabStrip');
  strip.innerHTML = state.tabs.map(tab => {
    const info = tabInfo(tab.id);
    if (!info) return '';
    const source = tab.id === state.source && state.current;
    const cls = ['tab'];
    if (tab.id === state.view) cls.push('active');
    if (tab.preview) cls.push('preview');
    if (source) cls.push('source');
    if (source && !audio.paused) cls.push('playing');
    const tip = tab.preview ? `${info.title} — предпросмотр, двойной клик закрепит` : info.title;
    return `<div class="${cls.join(' ')}" draggable="true" role="tab" data-tab="${esc(tab.id)}" title="${esc(tip)}">`
      + `<span class="tab-icon">${source ? EQ_ANIM : svg(info.icon, info.cls)}</span>`
      + `<span class="tab-title">${esc(info.title)}</span>`
      + `<button class="tab-close" data-act="close" title="Закрыть (Ctrl W)" draggable="false">${svg('close')}</button>`
      + '</div>';
  }).join('');
  strip.querySelector('.tab.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });

  // кнопки справа относятся к активной вкладке
  const p = playlistById(state.view);
  $('tabWave').hidden = !p || isSystem(p);
  $('refreshBtn').hidden = !state.view;
  saveTabs();
}

function saveTabs() {
  const tabs = state.tabs.map(t => ({
    id: t.id,
    preview: t.preview,
    ...(isArtist(t.id) ? { name: state.artistNames.get(t.id.slice(7)) } : {}),
  }));
  const snapshot = JSON.stringify([tabs, state.view]);
  if (snapshot === state.savedTabs) return;
  state.savedTabs = snapshot;
  store.set('tabs', tabs);
  if (state.view) store.set('view', state.view);
}

function showEmpty() {
  ++state.viewSeq;
  state.view = null;
  state.visible = [];
  $('waveBar').hidden = true;
  renderTabs();
  renderTree();
  renderEmpty();
}

function renderEmpty() {
  state.visible = [];
  $('list').innerHTML = [
    'вкладок нет — откройте плейлист слева или нажмите +',
    '',
    'клик по плейлисту — предпросмотр, двойной клик — закрепить вкладку',
    'Ctrl Tab — следующая вкладка, Ctrl 1…9 — вкладка по номеру',
    'Ctrl W или средняя кнопка мыши — закрыть вкладку',
  ].map(line => `<div class="comment">// ${esc(line)}</div>`).join('');
  $('statusSource').textContent = '';
}

function tabMenu(e, id) {
  e.preventDefault();
  const tab = state.tabs.find(t => t.id === id);
  const index = state.tabs.indexOf(tab);
  const items = [];
  if (tab.preview) items.push({ icon: 'check', label: 'Закрепить вкладку', run: () => pinTab(id) }, '-');
  items.push(
    { icon: 'close', label: 'Закрыть', run: () => closeTab(id) },
    { icon: 'blank', label: 'Закрыть другие', run: () => closeTabs(t => t.id === id) },
    { icon: 'blank', label: 'Закрыть вкладки справа', run: () => closeTabs(t => state.tabs.indexOf(t) <= index) },
    { icon: 'blank', label: 'Закрыть все', run: () => closeTabs(() => false) },
  );
  showMenu(e.clientX, e.clientY, items, e.target.closest('.tab'));
}

function addTabMenu() {
  const open = new Set(state.tabs.map(t => t.id));
  const item = p => ({ icon: p.icon, label: p.title, check: open.has(p.id), run: () => openView(p.id, false, true) });
  const own = state.playlists.filter(p => !isSystem(p));
  const items = [{ title: 'открыть во вкладке' }, ...state.playlists.filter(isSystem).map(item)];
  if (own.length) items.push('-', ...own.map(item));
  const r = $('tabAdd').getBoundingClientRect();
  showMenu(r.left, r.bottom + 4, items, null);
}

/* ---------- вкладка исполнителя ---------- */

const currentArtist = () => (isArtist(state.view) ? state.artists.get(state.view.slice(7)) : null);

async function openArtist(a, force = false, pin = false) {
  if (!a?.id) return;
  const id = String(a.id);
  const key = `artist:${id}`;
  if (state.stageOpen) closeStage();
  hideMenu();
  if (a.name) state.artistNames.set(id, a.name);
  let ar = state.artists.get(id);
  if (force || !ar) {
    ar = { id, name: state.artistNames.get(id) || 'исполнитель', info: null, total: null, page: 0, loading: true, started: false, error: null };
    state.artists.set(id, ar);
    state.cache.delete(key);
  }
  ++state.viewSeq;
  state.view = key;
  clearFilter();
  $('waveBar').hidden = true;
  $('refreshBtn').classList.remove('spin');
  ensureTab(key, pin);
  renderTabs();
  renderTree();
  if (ar.started) return renderList(); // уже загружено или грузится

  ar.started = true;
  renderList();
  $('list').scrollTop = 0;
  try {
    const [info, page] = await Promise.all([call('get_artist', id), call('get_artist_tracks', id, 0)]);
    Object.assign(ar, { info, name: info.name, total: page.total, page: 0 });
    state.artistNames.set(id, info.name);
    state.cache.set(key, page.tracks);
  } catch (e) {
    ar.error = e.message;
  }
  ar.loading = false;
  if (state.artists.get(id) !== ar) return; // вкладку успели закрыть или обновить
  renderTabs();
  if (state.view === key) renderList();
}

function artistHeaderHtml(ar) {
  const info = ar.info;
  const avatar = info?.cover
    ? `<div class="artist-avatar has-art" style="background-image:url('${esc(info.cover)}')">${svg('user')}</div>`
    : `<div class="artist-avatar">${svg('user')}</div>`;
  const stats = [];
  if (info?.listeners != null) {
    stats.push(`<b>${info.listeners.toLocaleString('ru-RU')}</b> ${plural(info.listeners, 'слушатель', 'слушателя', 'слушателей')} за месяц`);
  }
  if (info?.tracks != null) stats.push(`<b>${info.tracks}</b> ${plural(info.tracks, 'трек', 'трека', 'треков')}`);
  const similar = info?.similar?.length
    ? `<div class="artist-similar"><span class="similar-label">// похожие</span>${info.similar.map(s =>
      `<button class="chip" data-act="artist-open" data-artist="${esc(s.id)}" data-name="${esc(s.name)}">`
      + `<span class="chip-avatar"${s.cover ? ` style="background-image:url('${esc(s.cover)}')"` : ''}></span>${esc(s.name)}</button>`).join('')}</div>`
    : '';
  return `<section class="artist-head">${avatar}<div class="artist-meta">`
    + '<div class="artist-kind">// исполнитель</div>'
    + `<h2 class="artist-name" title="${esc(ar.name)}">${esc(ar.name)}</h2>`
    + (stats.length ? `<div class="artist-stats">${stats.join(' · ')}</div>` : '')
    + (info?.genres?.length ? `<div class="artist-genres">// ${esc(info.genres.join(' · '))}</div>` : '')
    + '<div class="artist-actions">'
    + `<button class="btn small primary" data-act="artist-play"${ar.loading ? ' disabled' : ''}>${svg('play')}Слушать</button>`
    + `<button class="chip" data-act="artist-wave">${svg('wave')}Моя волна по исполнителю</button>`
    + `</div></div></section>${similar}`;
}

function renderArtist() {
  const ar = currentArtist();
  if (!ar) return renderEmpty();
  const all = state.cache.get(state.view) || [];
  const q = state.filter.trim().toLowerCase();
  state.visible = q ? all.filter(t => `${t.title} ${t.artists}`.toLowerCase().includes(q)) : all;
  let html = artistHeaderHtml(ar);
  if (ar.error) {
    html += `<div class="comment error">// не удалось загрузить: ${esc(ar.error)}</div>`;
  } else if (ar.loading && !all.length) {
    html += '<div class="comment">// загружаю треки…</div>';
  } else if (!all.length) {
    html += '<div class="comment">// у исполнителя нет треков</div>';
  } else if (!state.visible.length) {
    html += `<div class="comment">// ничего не найдено по «${esc(state.filter.trim())}»</div>`;
  } else {
    html += `<div class="list-label">// треки по популярности · ${ar.total ?? all.length}</div>`;
    html += state.visible.map(rowHtml).join('');
    const left = (ar.total || 0) - all.length;
    if (left > 0 && !q) {
      html += `<button class="more-row" data-act="artist-more">// ещё ${left} ${plural(left, 'трек', 'трека', 'треков')} — загрузить</button>`;
    }
  }
  $('list').innerHTML = html;
  updateStatusSource();
}

async function loadMoreArtist(button) {
  const ar = currentArtist();
  if (!ar || ar.loading) return;
  const key = `artist:${ar.id}`;
  const list = state.cache.get(key) || [];
  ar.loading = true;
  if (button) {
    button.disabled = true;
    button.textContent = '// загружаю…';
  }
  try {
    const page = await call('get_artist_tracks', ar.id, ar.page + 1);
    ar.page += 1;
    ar.total = page.total;
    const have = new Set(list.map(t => t.id));
    list.push(...page.tracks.filter(t => !have.has(t.id)));
    if (!page.tracks.length) ar.total = list.length; // Яндекс отдал меньше, чем обещал
  } catch (e) {
    toast('error', `Не удалось загрузить треки: ${e.message}`);
  }
  ar.loading = false;
  if (currentArtist() === ar) {
    const top = $('list').scrollTop;
    renderList();
    $('list').scrollTop = top;
  }
}

function playArtist() {
  const i = state.visible.findIndex(t => t.available);
  if (i >= 0) playFrom(state.visible, i, state.view);
}

/* ---------- воспроизведение ---------- */

function shuffled(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildOrder(start) {
  const rest = [...state.queue.keys()];
  if (state.shuffle) {
    rest.splice(start, 1);
    state.order = [start, ...shuffled(rest)];
    state.pos = 0;
  } else {
    state.order = rest;
    state.pos = start;
  }
}

function playFrom(list, index, source) {
  state.queue = list.slice();
  state.source = source;
  state.errors = 0;
  buildOrder(index);
  const tab = state.tabs.find(t => t.id === source);
  if (tab) tab.preview = false; // включили музыку из предпросмотра — значит, вкладка нужна
  renderTree();
  playPos(state.pos);
  renderTabs();
}

async function playPos(pos) {
  const seq = ++state.playSeq;
  const t = state.queue[state.order[pos]];
  if (!t) return;
  if (state.waveTrack) reportWave('skip');
  state.pos = pos;
  state.current = t;
  showNow(t);
  if (!t.available) return skipAfterError(seq, `«${t.title}» недоступен`);

  let stream;
  try {
    stream = await call('get_stream', t.id);
  } catch (e) {
    if (seq === state.playSeq) skipAfterError(seq, `«${t.title}»: ${e.message}`);
    return;
  }
  if (seq !== state.playSeq) return;
  audio.src = stream.url;
  audio.play().catch(e => {
    if (e.name !== 'AbortError' && seq === state.playSeq) toast('error', `Не играет: ${e.message}`);
  });
  $('statusCodec').textContent = `${stream.codec} · ${stream.bitrate} kbps`;
  state.preview = stream.preview;
  updateWarn();
  if (state.source === 'wave') {
    state.waveTrack = { id: t.id };
    call('wave_feedback', 'started', t.id, 0).catch(() => {});
    if (state.order.length - state.pos <= 2) loadMoreWave();
  }
}

function reportWave(event) {
  const w = state.waveTrack;
  state.waveTrack = null;
  if (w) call('wave_feedback', event, w.id, Math.round(audio.currentTime || 0)).catch(() => {});
}

function skipAfterError(seq, message) {
  toast('error', message);
  if (++state.errors >= 5) {
    toast('warn', 'Несколько ошибок подряд — остановился');
    stopPlayback();
    return;
  }
  setTimeout(() => { if (seq === state.playSeq) next(); }, 700);
}

function stopPlayback() {
  if (state.waveTrack) reportWave('skip');
  state.playSeq++;
  audio.pause();
  audio.removeAttribute('src');
  audio.load();
  setPlayingUi(false);
}

async function next(auto = false) {
  if (!state.queue.length) return;
  if (auto && state.repeat === 'one') {
    audio.currentTime = 0;
    audio.play().catch(() => {});
    return;
  }
  if (state.pos + 1 >= state.order.length && state.source === 'wave') await loadMoreWave();
  if (state.pos + 1 < state.order.length) return playPos(state.pos + 1);
  if (state.repeat === 'all') {
    if (state.shuffle) shuffled(state.order);
    return playPos(0);
  }
  if (auto) {
    audio.currentTime = 0;
    setPlayingUi(false);
  }
}

function prev() {
  if (!state.queue.length) return;
  if (audio.currentTime > 3 || state.pos <= 0) {
    audio.currentTime = 0;
    return;
  }
  playPos(state.pos - 1);
}

function togglePlay() {
  if (!state.current) {
    const i = state.visible.findIndex(t => t.available);
    if (i >= 0) playFrom(state.visible, i, state.view);
    return;
  }
  if (!audio.getAttribute('src')) return playPos(state.pos);
  audio.paused ? audio.play().catch(() => {}) : audio.pause();
}

function showNow(t) {
  $('nowTitle').textContent = t.title;
  $('nowArtist').textContent = t.artists;
  const cover = $('nowCover');
  cover.style.backgroundImage = t.cover ? `url("${t.cover}")` : '';
  cover.classList.toggle('has-art', !!t.cover);
  $('nowLike').hidden = false;
  $('nowLike').classList.toggle('on', t.liked);
  $('timeCur').textContent = '0:00';
  $('timeDur').textContent = fmt(t.duration);
  $('progressFill').style.width = '0%';
  markCurrent();
  if (state.stageOpen) {
    renderStage();
    renderSide();
  }
  call('set_title', `${t.title} — ${t.artists}`).catch(() => {});

  if ('mediaSession' in navigator) {
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: t.title,
        artist: t.artists,
        album: sourceTitle(state.source),
        artwork: t.cover ? [{ src: bigCover(t.cover, '400x400'), sizes: '400x400', type: 'image/jpeg' }] : [],
      });
    } catch { /* нет поддержки */ }
  }
}

// кнопки на превью окна в панели задач Windows
window.taskbarAction = action => {
  ({ prev, play: togglePlay, next: () => next() })[action]?.();
};

function setPlayingUi(playing) {
  setIcon($('playBtn'), playing ? 'pause' : 'play');
  call('set_playing', playing).catch(() => {});
  $('list').querySelector('.row.current')?.classList.toggle('playing', playing);
  $('tabStrip').querySelector('.tab.source')?.classList.toggle('playing', playing);
  if ('mediaSession' in navigator) navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
  if (state.view === 'wave') renderWavePlay();
}

function updateWarn() {
  const warn = $('statusWarn');
  warn.hidden = state.plus && !state.preview;
  warn.textContent = 'без Плюса — играют 30-секундные отрывки';
}

/* ---------- Моя волна ---------- */

function mySeeds() {
  const { context, ...settings } = state.waveSettings;
  return [context || 'user:onyourwave', ...Object.values(settings).filter(Boolean)];
}

const myWave = () => ({ kind: 'my', title: 'Моя волна', seeds: mySeeds() });

async function loadWaveOptions() {
  try {
    state.waveOptions = await call('get_wave_settings');
  } catch (e) {
    state.waveOptions = { contexts: [], groups: [] };
    toast('warn', `Не удалось загрузить настройки волны: ${e.message}`);
  }
  // убираем сохранённые значения, которых сервер больше не предлагает
  const known = new Set([
    ...state.waveOptions.contexts.map(c => c.seed),
    ...state.waveOptions.groups.flatMap(g => g.values.map(v => v.seed)),
  ]);
  for (const [key, seed] of Object.entries(state.waveSettings)) if (!known.has(seed)) delete state.waveSettings[key];
  renderWaveBar();
}

async function startWave(wave, autoplay = false) {
  const seq = ++state.waveSeq;
  state.wave = wave;
  state.waveLoading = true;
  state.cache.delete('wave');
  renderWaveBar();
  if (state.view === 'wave') {
    listMessage('запускаю волну…');
    $('refreshBtn').classList.add('spin');
  }
  let tracks;
  try {
    if (wave.playlist && !wave.seeds) {
      const res = await call('wave_playlist', wave.playlist);
      wave.seeds = res.seeds; // для «обновить» и повторного запуска
      tracks = res.tracks;
    } else {
      tracks = await call('wave_start', wave.seeds);
    }
  } catch (e) {
    if (seq !== state.waveSeq) return;
    state.waveLoading = false;
    $('refreshBtn').classList.remove('spin');
    toast('error', `Волна: ${e.message}`);
    if (state.view === 'wave') listMessage(`не удалось запустить волну: ${e.message}`, true);
    return;
  }
  if (seq !== state.waveSeq) return;
  state.waveLoading = false;
  state.cache.set('wave', tracks);
  if (state.view === 'wave') {
    $('refreshBtn').classList.remove('spin');
    renderList();
    $('list').scrollTop = 0;
  }
  // как в Яндексе: новая волна сразу заменяет играющую
  if (autoplay || state.source === 'wave') {
    const i = tracks.findIndex(t => t.available);
    if (i >= 0) playFrom(tracks, i, 'wave');
  }
  renderWaveBar();
}

function loadMoreWave() {
  if (state.moreWave) return state.moreWave;
  const seq = state.waveSeq;
  state.moreWave = call('wave_more', state.queue.map(t => t.id))
    .then(more => {
      if (seq !== state.waveSeq || state.source !== 'wave') return;
      const have = new Set(state.queue.map(t => t.id));
      const fresh = more.filter(t => !have.has(t.id));
      const start = state.queue.length;
      state.queue.push(...fresh);
      state.order.push(...fresh.map((_, k) => start + k));
      const cached = state.cache.get('wave');
      if (cached) {
        const inCache = new Set(cached.map(t => t.id));
        cached.push(...fresh.filter(t => !inCache.has(t.id)));
        if (state.view === 'wave') renderList();
      }
      if (state.stageOpen && state.sideTab === 'queue') renderQueue();
    })
    .catch(e => toast('error', `Волна: ${e.message}`))
    .finally(() => { state.moreWave = null; });
  return state.moreWave;
}

function waveByTrack(t) {
  if (!t) return;
  startWave({ kind: 'track', title: `Волна по треку «${t.title}»`, seeds: [`track:${bareId(t.id)}`] }, true);
  if (state.view !== 'wave') openView('wave');
}

function waveByArtist(artist) {
  if (!artist) return;
  startWave({ kind: 'artist', title: `Волна по исполнителю ${artist.name}`, seeds: [`artist:${artist.id}`] }, true);
  if (state.view !== 'wave') openView('wave');
}

function waveByPlaylist(p) {
  if (!p || isSystem(p)) return;
  startWave({ kind: 'playlist', title: `Волна по плейлисту «${p.title}»`, playlist: p.id, seeds: null }, true);
  if (state.view !== 'wave') openView('wave');
}

function renderWaveBar() {
  if (state.view !== 'wave') return;
  const wave = state.wave || myWave();
  const mine = wave.kind === 'my';
  $('waveTitle').textContent = wave.title;
  $('waveReset').hidden = mine;
  $('waveTune').hidden = !mine;
  $('waveTune').classList.toggle('active', state.waveTuneOpen);

  const names = [];
  const opts = state.waveOptions;
  if (mine && opts) {
    const all = [...opts.contexts, ...opts.groups.flatMap(g => g.values)];
    for (const seed of Object.values(state.waveSettings)) {
      const found = all.find(v => v.seed === seed);
      if (found) names.push(found.name);
    }
  }
  $('waveSummary').textContent = names.length ? `// ${names.join(' · ')}` : '';

  const box = $('waveSettings');
  box.hidden = !mine || !state.waveTuneOpen;
  if (!box.hidden) {
    if (!opts) {
      box.innerHTML = '<div class="wave-label">// загружаю настройки…</div>';
    } else {
      const row = (label, key, values) => `
        <div class="wave-row">
          <span class="wave-label">${esc(label)}</span>
          <div class="wave-chips">${values.map(v => `<button class="chip${state.waveSettings[key] === v.seed ? ' active' : ''}"
            data-key="${esc(key)}" data-seed="${esc(v.seed)}">${esc(v.name)}</button>`).join('')}</div>
        </div>`;
      box.innerHTML = (opts.contexts.length ? row('занятие', 'context', opts.contexts) : '')
        + opts.groups.map(g => row(g.title.toLowerCase(), g.key, g.values)).join('');
    }
  }
  renderWavePlay();
}

function renderWavePlay() {
  const btn = $('wavePlay');
  const playing = state.source === 'wave' && !audio.paused;
  btn.innerHTML = `${svg(playing ? 'pause' : 'play')}${playing ? 'Пауза' : 'Слушать'}`;
  btn.disabled = state.waveLoading;
}

function onWaveChip(chip) {
  const { key, seed } = chip.dataset;
  if (state.waveSettings[key] === seed) delete state.waveSettings[key];
  else state.waveSettings[key] = seed;
  store.set('waveSettings', state.waveSettings);
  startWave(myWave());
}

function onWavePlay() {
  if (state.source === 'wave' && state.current) return togglePlay();
  const tracks = state.cache.get('wave') || [];
  const i = tracks.findIndex(t => t.available);
  if (i >= 0) playFrom(tracks, i, 'wave');
}

/* ---------- развёрнутый вид: обложка, очередь, текст ---------- */

function openStage(tab) {
  if (tab) {
    state.sideTab = tab;
    store.set('sideTab', tab);
  }
  state.stageOpen = true;
  $('stage').hidden = false;
  $('stage').classList.toggle('side-left', state.sideLeft);
  renderStage();
  renderSide();
  updateToolButtons();
}

function closeStage() {
  state.stageOpen = false;
  $('stage').hidden = true;
  updateToolButtons();
}

function toggleStageTab(tab) {
  if (state.stageOpen && state.sideTab === tab) closeStage();
  else openStage(tab);
}

function renderStage() {
  const t = state.current;
  const art = t ? bigCover(t.cover, '800x800') : null;
  $('stageCover').style.backgroundImage = art ? `url("${art}")` : '';
  $('stageCover').classList.toggle('has-art', !!art);
  $('stageBg').style.backgroundImage = art ? `url("${bigCover(t.cover, '200x200')}")` : '';
  $('stageTitle').textContent = t ? t.title : 'ничего не играет';
  $('stageArtist').innerHTML = t ? artistLinks(t) : 'выберите трек в списке';
  $('stageSource').textContent = t && state.source ? `// ${sourceTitle(state.source)}` : '';
  $('stageWaveTrack').hidden = !t;
  const artist = t?.artistList?.[0];
  $('stageWaveArtist').hidden = !artist;
  if (artist) {
    $('stageWaveArtist').lastChild.textContent = `волна по «${artist.name}»`;
    $('stageWaveArtist').title = `Моя волна по исполнителю ${artist.name}`;
  }
}

function renderSide() {
  document.querySelectorAll('.side-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === state.sideTab));
  $('sideQueue').hidden = state.sideTab !== 'queue';
  $('sideLyrics').hidden = state.sideTab !== 'lyrics';
  if (state.sideTab === 'queue') renderQueue();
  else loadLyrics();
}

function queueItem(t, pos, current = false) {
  const cover = t.cover
    ? `<img class="q-cover" src="${esc(t.cover)}" alt="" loading="lazy">`
    : `<span class="q-cover">${svg('note')}</span>`;
  return `<div class="q-item${current ? ' current' : ''}${t.available ? '' : ' off'}" data-pos="${pos}">`
    + `${cover}<span class="q-text"><span class="q-title">${esc(t.title)}</span>`
    + `<span class="q-artist">${esc(t.artists)}</span></span><span class="q-dur">${fmt(t.duration)}</span></div>`;
}

function renderQueue() {
  const box = $('sideQueue');
  if (!state.current || state.pos < 0) {
    box.innerHTML = '<div class="side-note">// очередь пуста — включите трек</div>';
    return;
  }
  const limit = Math.min(state.order.length, state.pos + 1 + 200);
  let html = '<div class="side-label">// сейчас играет</div>' + queueItem(state.current, state.pos, true);
  const left = state.order.length - state.pos - 1;
  html += `<div class="side-label">// далее · ${left}</div>`;
  for (let p = state.pos + 1; p < limit; p++) html += queueItem(state.queue[state.order[p]], p);
  if (limit < state.order.length) html += `<div class="side-note">// и ещё ${state.order.length - limit}</div>`;
  if (!left && state.source !== 'wave') html += '<div class="side-note">// это последний трек</div>';
  if (state.source === 'wave') html += '<div class="side-note">// волна подгружает треки сама</div>';
  box.innerHTML = html;
}

async function loadLyrics() {
  const box = $('sideLyrics');
  const t = state.current;
  if (!t) {
    box.className = 'side-body lyrics';
    box.innerHTML = '<div class="side-note">// включите трек, чтобы увидеть текст</div>';
    return;
  }
  if (state.lyricsFor === t.id) return; // уже показан
  state.lyricsFor = t.id;
  state.lyrics = null;
  state.lyricsLine = -1;
  box.className = 'side-body lyrics';
  box.scrollTop = 0;

  let data = state.lyricsCache.get(t.id);
  if (data === undefined) {
    box.innerHTML = '<div class="side-note">// ищу текст…</div>';
    try {
      data = await call('get_lyrics', t.id);
    } catch (e) {
      if (state.lyricsFor === t.id) {
        box.innerHTML = `<div class="side-note">// текст не загрузился: ${esc(e.message)}</div>`;
        state.lyricsFor = null; // попробуем ещё раз при следующем открытии
      }
      return;
    }
    state.lyricsCache.set(t.id, data);
  }
  if (state.lyricsFor !== t.id) return;
  renderLyrics(data);
}

function renderLyrics(data) {
  const box = $('sideLyrics');
  state.lyrics = data;
  state.lyricsLine = -1;
  if (data?.instrumental) {
    box.innerHTML = '<div class="side-note">// инструментальный трек — без слов</div>';
    return;
  }
  if (!data || !data.lines.length) {
    box.innerHTML = '<div class="side-note">// текст не нашёлся ни в Яндексе, ни в LRCLIB</div>';
    return;
  }
  const foot = [
    data.writers.length ? `// авторы: ${esc(data.writers.join(', '))}` : '',
    data.source ? `// источник: ${esc(data.source)}` : '',
  ].filter(Boolean).join('<br>');
  box.classList.toggle('synced', data.synced);
  box.innerHTML = (data.synced
    ? data.lines.map((l, i) => `<p class="ly-line" data-i="${i}">${esc(l.text) || '♪'}</p>`).join('')
    : data.lines.map(l => `<p class="ly-plain">${esc(l.text)}</p>`).join(''))
    + (foot ? `<div class="ly-foot">${foot}</div>` : '');
  syncLyrics(audio.currentTime, true);
}

function syncLyrics(time, instant = false) {
  const ly = state.lyrics;
  if (!ly?.synced || !state.stageOpen || state.sideTab !== 'lyrics' || state.lyricsFor !== state.current?.id) return;
  const lines = ly.lines;
  let i = state.lyricsLine;
  if (i >= 0 && lines[i].t > time + 0.2) i = -1; // перемотали назад
  while (i + 1 < lines.length && lines[i + 1].t <= time + 0.2) i++;
  if (i === state.lyricsLine && !instant) return;
  state.lyricsLine = i;
  const els = $('sideLyrics').querySelectorAll('.ly-line');
  els.forEach((el, k) => {
    el.classList.toggle('now', k === i);
    el.classList.toggle('past', k < i);
  });
  if (i >= 0 && performance.now() > state.lyricsHoldUntil) {
    els[i].scrollIntoView({ block: 'center', behavior: instant ? 'auto' : 'smooth' });
  }
}

function updateToolButtons() {
  $('lyricsBtn').classList.toggle('lit', state.stageOpen && state.sideTab === 'lyrics');
  $('queueBtn').classList.toggle('lit', state.stageOpen && state.sideTab === 'queue');
  $('nowOpen').title = state.stageOpen ? 'Свернуть' : 'Развернуть обложку';
}

/* ---------- эквалайзер ---------- */

const EQ_BANDS = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const EQ_MAX = 12;
const EQ_PRESETS = {
  'Ровно': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'Больше баса': [6, 5, 4, 2, 0, 0, 0, 0, 0, 0],
  'Меньше баса': [-6, -5, -3, -1, 0, 0, 0, 0, 0, 0],
  'Вокал': [-2, -2, -1, 1, 3, 4, 3, 1, 0, -1],
  'Яркость': [0, 0, 0, 0, 0, 1, 2, 4, 5, 6],
  'Громкость': [5, 4, 2, 0, -1, -1, 0, 2, 4, 5],
  'Электроника': [5, 4, 1, 0, -2, 1, 1, 2, 4, 5],
  'Рок': [4, 3, 2, 0, -1, -1, 1, 2, 3, 4],
  'Акустика': [3, 2, 1, 1, 2, 2, 2, 3, 2, 1],
  'Тихо ночью': [-4, -3, -1, 0, 1, 1, 0, -1, -2, -3],
};
const FLAT = EQ_BANDS.map(() => 0);
const CURVE_FREQS = Float32Array.from({ length: 240 }, (_, i) => 20 * 1000 ** (i / 239));

function savedGains() {
  const g = store.get('eqGains', null);
  return Array.isArray(g) && g.length === EQ_BANDS.length && g.every(Number.isFinite) ? g : FLAT.slice();
}

const eq = {
  gains: savedGains(),
  on: store.get('eqOn', true),
  open: false,
  looping: false,
  ctx: null, pre: null, filters: [], master: null, analyser: null, spectrum: null,
  design: null, mag: null, phase: null,
};

const eqActive = () => eq.on && eq.gains.some(g => g !== 0);
const activeGains = () => (eq.on ? eq.gains : FLAT);
const presetName = () => Object.keys(EQ_PRESETS).find(n => EQ_PRESETS[n].every((v, i) => v === eq.gains[i])) || 'Свой';

function makeBand(ctx, freq, i) {
  const band = ctx.createBiquadFilter();
  band.type = i === 0 ? 'lowshelf' : i === EQ_BANDS.length - 1 ? 'highshelf' : 'peaking';
  band.frequency.value = freq;
  band.Q.value = 1.1;
  return band;
}

/** Цепочка Web Audio создаётся по первому действию пользователя — иначе браузер её заглушит. */
function ensureAudio() {
  if (eq.ctx) {
    if (eq.ctx.state === 'suspended') eq.ctx.resume().catch(() => {});
    return;
  }
  try {
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audio);
    const pre = ctx.createGain();
    const filters = EQ_BANDS.map((f, i) => makeBand(ctx, f, i));
    const master = ctx.createGain();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 4096;
    analyser.smoothingTimeConstant = 0.8;
    [source, pre, ...filters, master, analyser, ctx.destination].reduce((a, b) => a.connect(b));
    Object.assign(eq, { ctx, pre, filters, master, analyser, spectrum: new Uint8Array(analyser.frequencyBinCount) });
    applyEq();
    applyVolume();
  } catch (e) {
    console.warn('Эквалайзер недоступен', e);
  }
}

function applyEq() {
  const gains = activeGains();
  if (eq.ctx) {
    const now = eq.ctx.currentTime;
    eq.filters.forEach((f, i) => f.gain.setTargetAtTime(gains[i], now, 0.03));
    // запас по громкости, чтобы подъём частот не давал хрип
    const headroom = Math.max(0, ...gains) * 0.6;
    eq.pre.gain.setTargetAtTime(10 ** (-headroom / 20), now, 0.03);
  }
  store.set('eqGains', eq.gains);
  store.set('eqOn', eq.on);
  $('eqBtn').classList.toggle('on', eqActive());
  $('statusEq').textContent = eqActive() ? `EQ · ${presetName()}` : '';
  $('eqPanel').classList.toggle('off', !eq.on);
  $('eqOn').checked = eq.on;
  paintBands();
  drawEq();
}

function setBand(i, value) {
  eq.gains[i] = Math.max(-EQ_MAX, Math.min(EQ_MAX, Math.round(value * 2) / 2));
  eq.on = true;
  applyEq();
}

function renderEqPanel() {
  const hz = f => (f >= 1000 ? `${f / 1000}k` : String(f));
  $('eqBands').innerHTML = EQ_BANDS.map((f, i) => `
    <div class="band" data-i="${i}">
      <span class="band-val"></span>
      <div class="band-track" tabindex="0" role="slider" aria-label="${hz(f)} Гц"
           aria-valuemin="-${EQ_MAX}" aria-valuemax="${EQ_MAX}" title="${hz(f)} Гц — двойной клик сбрасывает">
        <div class="band-fill"></div><div class="band-thumb"></div>
      </div>
      <span class="band-hz">${hz(f)}</span>
    </div>`).join('');
  $('eqPresets').innerHTML = Object.keys(EQ_PRESETS)
    .map(n => `<button class="chip" data-preset="${esc(n)}">${esc(n)}</button>`).join('');
  applyEq();
}

function paintBands() {
  document.querySelectorAll('.band').forEach((el, i) => {
    const v = eq.gains[i];
    const pos = ((EQ_MAX - v) / (2 * EQ_MAX)) * 100;
    el.querySelector('.band-thumb').style.top = `${pos}%`;
    const fill = el.querySelector('.band-fill');
    fill.style.top = `${Math.min(pos, 50)}%`;
    fill.style.bottom = `${100 - Math.max(pos, 50)}%`;
    el.querySelector('.band-val').textContent = v > 0 ? `+${v}` : String(v);
    el.querySelector('.band-track').setAttribute('aria-valuenow', v);
  });
  const name = presetName();
  document.querySelectorAll('#eqPresets .chip').forEach(c => c.classList.toggle('active', eq.on && c.dataset.preset === name));
}

function toggleEq(open = !eq.open) {
  eq.open = open;
  $('eqPanel').hidden = !open;
  $('eqBtn').classList.toggle('open', open);
  if (open) {
    if (!$('eqBands').children.length) renderEqPanel();
    drawEq();
    startEqLoop();
  }
}

function startEqLoop() {
  if (!eq.open || eq.looping) return;
  eq.looping = true;
  const loop = () => {
    drawEq();
    if (eq.open && !audio.paused) requestAnimationFrame(loop);
    else eq.looping = false;
  };
  requestAnimationFrame(loop);
}

function eqResponse() {
  if (!eq.design) {
    const ctx = new OfflineAudioContext(1, 128, 48000);
    eq.design = EQ_BANDS.map((f, i) => makeBand(ctx, f, i));
    eq.mag = new Float32Array(CURVE_FREQS.length);
    eq.phase = new Float32Array(CURVE_FREQS.length);
  }
  const gains = activeGains();
  const total = new Float32Array(CURVE_FREQS.length);
  eq.design.forEach((band, i) => {
    band.gain.value = gains[i];
    band.getFrequencyResponse(CURVE_FREQS, eq.mag, eq.phase);
    for (let k = 0; k < total.length; k++) total[k] += 20 * Math.log10(eq.mag[k]);
  });
  return total;
}

let palette = null;

function drawEq() {
  const c = $('eqCanvas');
  if (!eq.open || !c.clientWidth) return;
  if (!palette) {
    const css = getComputedStyle(document.documentElement);
    palette = Object.fromEntries(['line', 'gutter', 'comment', 'blue'].map(k => [k, css.getPropertyValue(`--${k}`).trim()]));
  }
  const dpr = window.devicePixelRatio || 1;
  const w = c.clientWidth, h = c.clientHeight;
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
  }
  const g = c.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, w, h);
  const X = f => (Math.log(f / 20) / Math.log(1000)) * w;
  const Y = db => h / 2 - (db / (EQ_MAX + 3)) * (h / 2);

  // сетка: уровни и полосы
  g.lineWidth = 1;
  g.strokeStyle = palette.line;
  for (const db of [-12, -6, 6, 12]) {
    g.beginPath(); g.moveTo(0, Math.round(Y(db)) + 0.5); g.lineTo(w, Math.round(Y(db)) + 0.5); g.stroke();
  }
  for (const f of EQ_BANDS) {
    g.beginPath(); g.moveTo(Math.round(X(f)) + 0.5, 0); g.lineTo(Math.round(X(f)) + 0.5, h); g.stroke();
  }
  g.strokeStyle = palette.gutter;
  g.setLineDash([3, 3]);
  g.beginPath(); g.moveTo(0, Math.round(Y(0)) + 0.5); g.lineTo(w, Math.round(Y(0)) + 0.5); g.stroke();
  g.setLineDash([]);
  g.fillStyle = palette.comment;
  g.font = '10px Consolas, monospace';
  g.fillText('+12', 4, Y(12) + 3);
  g.fillText('0 дБ', 4, Y(0) - 4);
  g.fillText('−12', 4, Y(-12) + 3);

  // живой спектр после эквалайзера
  if (eq.analyser && !audio.paused) {
    eq.analyser.getByteFrequencyData(eq.spectrum);
    const nyquist = eq.ctx.sampleRate / 2;
    g.fillStyle = alpha(palette.blue, 0.14);
    for (let x = 0; x < w; x += 3) {
      const f = 20 * 1000 ** (x / w);
      const bin = Math.min(eq.spectrum.length - 1, Math.round((f / nyquist) * eq.spectrum.length));
      const bh = (eq.spectrum[bin] / 255) * h * 0.92;
      g.fillRect(x, h - bh, 2, bh);
    }
  }

  // итоговая частотная характеристика
  const resp = eqResponse();
  g.beginPath();
  resp.forEach((db, k) => (k ? g.lineTo(X(CURVE_FREQS[k]), Y(db)) : g.moveTo(X(CURVE_FREQS[k]), Y(db))));
  g.strokeStyle = eq.on ? palette.blue : palette.comment;
  g.lineWidth = 2;
  g.stroke();
  if (eq.on) {
    g.lineTo(w, Y(0));
    g.lineTo(0, Y(0));
    g.closePath();
    g.fillStyle = alpha(palette.blue, 0.1);
    g.fill();
  }
}

/* ---------- контекстное меню ---------- */

let menuTarget = null;

/** items: '-' — разделитель, { title } — подпись, { icon | html, label, run, check, danger } — пункт. */
function showMenu(x, y, items, target, above = false) {
  hideMenu();
  const menu = $('menu');
  menu.innerHTML = items.map((it, i) => {
    if (it === '-') return '<div class="menu-sep"></div>';
    if (it.title) return `<div class="menu-title">${esc(it.title)}</div>`;
    return `<button class="menu-item${it.danger ? ' danger' : ''}" data-i="${i}">`
      + `${it.html || svg(it.icon || 'blank')}<span>${esc(it.label)}</span>${it.check ? svg('check', 'check') : ''}</button>`;
  }).join('');
  menu.onclick = e => {
    const btn = e.target.closest('.menu-item');
    if (!btn) return;
    hideMenu();
    items[+btn.dataset.i].run();
  };
  menu.hidden = false;
  const r = menu.getBoundingClientRect();
  const top = above ? y - r.height - 6 : y;
  menu.style.left = `${Math.max(8, Math.min(x, innerWidth - r.width - 8))}px`;
  menu.style.top = `${Math.max(8, Math.min(top, innerHeight - r.height - 8))}px`;
  menuTarget = target;
  target?.classList.add('menu-target');
}

function hideMenu() {
  $('menu').hidden = true;
  menuTarget?.classList.remove('menu-target');
  menuTarget = null;
}

function trackMenu(e, t, target, play) {
  e.preventDefault();
  const items = [];
  if (play && t.available) items.push({ icon: 'play', label: 'Играть', run: play }, '-');
  for (const a of (t.artistList || []).slice(0, 3)) {
    items.push({ icon: 'user', label: `Открыть исполнителя: ${a.name}`, run: () => openArtist(a) });
  }
  items.push({ icon: 'wave', label: 'Моя волна по треку', run: () => waveByTrack(t) });
  for (const a of (t.artistList || []).slice(0, 3)) {
    items.push({ icon: 'wave', label: `Моя волна по исполнителю: ${a.name}`, run: () => waveByArtist(a) });
  }
  items.push(
    '-',
    { icon: 'heart', label: t.liked ? 'Убрать из «Мне нравится»' : 'Мне нравится', run: () => toggleLike(t) },
    { icon: 'listAdd', label: 'Добавить в плейлист…', run: () => playlistMenu(e.clientX, e.clientY, t) },
  );
  const p = playlistById(state.view);
  if (target?.classList.contains('row') && p && !isSystem(p)) {
    items.push({ icon: 'trash', label: `Удалить из «${p.title}»`, danger: true, run: () => removeFromPlaylist(t, p) });
  }
  showMenu(e.clientX, e.clientY, items, target);
}

function playlistMenu(x, y, t) {
  const own = state.playlists.filter(p => !isSystem(p));
  const items = [{ title: 'добавить в плейлист' }];
  for (const p of own) items.push({ icon: 'list', label: p.title, run: () => addToPlaylist(t, p) });
  if (own.length) items.push('-');
  items.push({ icon: 'plus', label: 'Новый плейлист…', run: () => createPlaylistWith(t) });
  showMenu(x, y, items, null);
}

function treeMenu(e, item) {
  e.preventDefault();
  const p = playlistById(item.dataset.id);
  if (!p) return;
  const items = [{ icon: p.icon, label: 'Открыть во вкладке', run: () => openView(p.id, false, true) }];
  if (p.id === 'wave') {
    items.push({ icon: 'play', label: 'Слушать Мою волну', run: () => { startWave(myWave(), true); openView('wave'); } });
  }
  if (!isSystem(p)) items.push({ icon: 'wave', label: 'Моя волна по плейлисту', run: () => waveByPlaylist(p) });
  items.push('-', { icon: 'plus', label: 'Новый плейлист…', run: () => createPlaylistWith(null) });
  showMenu(e.clientX, e.clientY, items, item);
}

/* ---------- плейлисты ---------- */

async function addToPlaylist(t, p) {
  try {
    const res = await call('playlist_add', p.id, t.id);
    if (!res.added) return toast('info', `«${t.title}» уже есть в «${p.title}»`);
    p.count = res.count ?? (p.count || 0) + 1;
    renderTree();
    if (state.view === p.id) openView(p.id, true);
    else state.cache.delete(p.id);
    toast('info', `Добавлено в «${p.title}»`);
  } catch (e) {
    toast('error', `Не удалось добавить в «${p.title}»: ${e.message}`);
  }
}

async function removeFromPlaylist(t, p) {
  try {
    const res = await call('playlist_remove', p.id, t.id);
    if (!res.removed) return toast('warn', `«${t.title}» уже нет в «${p.title}»`);
    const list = state.cache.get(p.id);
    const i = list ? list.findIndex(x => bareId(x.id) === bareId(t.id)) : -1;
    if (i >= 0) list.splice(i, 1);
    p.count = res.count ?? Math.max(0, (p.count || 1) - 1);
    renderTree();
    if (state.view === p.id) renderList();
    toast('info', `Удалено из «${p.title}»`);
  } catch (e) {
    toast('error', `Не удалось удалить из «${p.title}»: ${e.message}`);
  }
}

async function createPlaylistWith(t) {
  const title = prompt('Название нового плейлиста', '')?.trim();
  if (!title) return;
  try {
    const p = await call('playlist_create', title);
    state.playlists.push(p);
    renderTree();
    if (t) await addToPlaylist(t, p);
    else toast('info', `Плейлист «${p.title}» создан`);
  } catch (e) {
    toast('error', `Не удалось создать плейлист: ${e.message}`);
  }
}

/* ---------- темы ---------- */

function applyTheme(id) {
  const theme = applyThemeVars(id);
  const key = document.documentElement.dataset.theme;
  if (store.get('theme') !== key) store.set('theme', key);
  // копия для themes.js — чтобы при следующем запуске сразу показать нужные цвета
  try { localStorage.setItem('odp.theme', JSON.stringify(key)); } catch { /* не страшно */ }
  palette = null;
  drawEq();
  $('themeName').textContent = theme.name;
  call('set_titlebar', theme.vars['bg-panel'], theme.vars.fg, theme.vars['bg-deep'], theme.dark).catch(() => {});
}

function themeMenu() {
  const current = document.documentElement.dataset.theme;
  const items = [{ title: 'тема оформления' }, ...Object.entries(THEMES).map(([id, t]) => ({
    html: `<span class="swatch" style="--sw-bg:${t.vars.bg};--sw-accent:${t.vars.accent}"></span>`,
    label: t.name,
    check: id === current,
    run: () => applyTheme(id),
  }))];
  const r = $('themeBtn').getBoundingClientRect();
  showMenu(r.right - 200, r.top, items, null, true);
}

/* ---------- лайки ---------- */

async function toggleLike(t) {
  if (!t) return;
  const was = t.liked;
  setLiked(t, !was);
  try {
    setLiked(t, await call('toggle_like', t.id));
  } catch (e) {
    setLiked(t, was);
    toast('error', `Не удалось изменить «Мне нравится»: ${e.message}`);
    return;
  }
  if (t.liked === was) return;
  const p = playlistById('liked');
  const liked = state.cache.get('liked');
  if (t.liked && liked && !liked.some(x => bareId(x.id) === bareId(t.id))) liked.unshift(t);
  if (p) {
    p.count += t.liked ? 1 : -1;
    renderTree();
  }
  if (state.view === 'liked') renderList();
}

function setLiked(t, liked) {
  const key = bareId(t.id);
  for (const list of [...state.cache.values(), state.queue]) {
    for (const x of list) if (bareId(x.id) === key) x.liked = liked;
  }
  t.liked = liked;
  rowOf(t)?.querySelector('.like').classList.toggle('on', liked);
  if (state.current && bareId(state.current.id) === key) $('nowLike').classList.toggle('on', liked);
}

/* ---------- прогресс и громкость ---------- */

let dragging = false;
let ticking = false;

const duration = () => (Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : state.current?.duration || 0);

function paintProgress(time) {
  const d = duration();
  $('progressFill').style.width = d ? `${Math.min(100, (time / d) * 100)}%` : '0%';
  $('timeCur').textContent = fmt(time);
}

function tick() {
  if (!dragging) paintProgress(audio.currentTime);
  syncLyrics(audio.currentTime);
  if (audio.paused) {
    ticking = false;
    return;
  }
  requestAnimationFrame(tick);
}

function ratioAt(e) {
  const r = $('progress').getBoundingClientRect();
  return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
}

function seekBy(delta) {
  if (!audio.getAttribute('src')) return;
  audio.currentTime = Math.min(Math.max(0, audio.currentTime + delta), duration());
}

function applyVolume() {
  const v = state.muted ? 0 : state.volume;
  const gain = (v / 100) ** 2;
  if (eq.master) {
    eq.master.gain.setTargetAtTime(gain, eq.ctx.currentTime, 0.02);
    audio.volume = 1;
  } else {
    audio.volume = gain;
  }
  $('volume').value = v;
  $('volume').style.setProperty('--pct', `${v}%`);
  setIcon($('muteBtn'), v === 0 ? 'mute' : v < 50 ? 'volumeLow' : 'volume');
}

function setVolume(v) {
  state.volume = Math.min(100, Math.max(0, Math.round(v)));
  state.muted = false;
  store.set('volume', state.volume);
  applyVolume();
}

function applyModes() {
  $('shuffleBtn').classList.toggle('on', state.shuffle);
  const rep = $('repeatBtn');
  rep.classList.toggle('on', state.repeat !== 'off');
  if (state.repeat === 'one') rep.dataset.badge = '1';
  else delete rep.dataset.badge;
  rep.title = { off: 'Повтор выключен (R)', all: 'Повтор очереди (R)', one: 'Повтор трека (R)' }[state.repeat];
}

function toggleShuffle() {
  state.shuffle = !state.shuffle;
  store.set('shuffle', state.shuffle);
  if (state.queue.length) buildOrder(state.order[state.pos]);
  applyModes();
  if (state.stageOpen && state.sideTab === 'queue') renderQueue();
}

function cycleRepeat() {
  state.repeat = { off: 'all', all: 'one', one: 'off' }[state.repeat] || 'off';
  store.set('repeat', state.repeat);
  applyModes();
}

/* ---------- привязка интерфейса ---------- */

function bindUi() {
  document.querySelectorAll('[data-icon]').forEach(el => el.insertAdjacentHTML('afterbegin', svg(el.dataset.icon)));

  // Web Audio можно запустить только из действия пользователя
  document.addEventListener('pointerdown', ensureAudio, true);
  document.addEventListener('keydown', ensureAudio, true);

  $('loginBtn').addEventListener('click', () => doLogin('login'));
  $('tokenForm').addEventListener('submit', e => {
    e.preventDefault();
    doLogin('set_token', $('tokenInput').value);
  });
  $('logoutBtn').addEventListener('click', logout);

  const tree = document.querySelector('.tree-scroll');
  tree.addEventListener('click', e => {
    const item = e.target.closest('.tree-item');
    if (item && item.dataset.id !== state.view) openView(item.dataset.id);
  });
  tree.addEventListener('dblclick', e => {
    const item = e.target.closest('.tree-item');
    if (item) pinTab(item.dataset.id);
  });
  tree.addEventListener('contextmenu', e => {
    const item = e.target.closest('.tree-item');
    if (item) treeMenu(e, item);
  });

  // кнопки справа от вкладок — для активной вкладки
  $('refreshBtn').addEventListener('click', () => {
    if (isArtist(state.view)) openArtist({ id: state.view.slice(7) }, true);
    else if (state.view) openView(state.view, true);
  });
  $('tabWave').addEventListener('click', () => waveByPlaylist(playlistById(state.view)));
  $('tabAdd').addEventListener('click', addTabMenu);

  // вкладки
  const strip = $('tabStrip');
  const tabOf = e => e.target.closest('.tab')?.dataset.tab;
  strip.addEventListener('click', e => {
    const id = tabOf(e);
    if (!id) return;
    if (e.target.closest('[data-act="close"]')) return closeTab(id);
    if (id !== state.view) activateTab(id);
  });
  strip.addEventListener('dblclick', e => {
    const id = tabOf(e);
    if (id && !e.target.closest('[data-act="close"]')) pinTab(id);
  });
  strip.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); }); // без автопрокрутки
  strip.addEventListener('auxclick', e => {
    const id = tabOf(e);
    if (id && e.button === 1) closeTab(id);
  });
  strip.addEventListener('contextmenu', e => {
    const id = tabOf(e);
    if (id) tabMenu(e, id);
  });
  strip.addEventListener('wheel', e => {
    if (!e.deltaY) return;
    e.preventDefault();
    strip.scrollLeft += e.deltaY;
  }, { passive: false });

  // перетаскивание вкладок
  let dragged = null;
  const clearDrop = () => strip.querySelectorAll('.drop-before, .drop-after').forEach(t => t.classList.remove('drop-before', 'drop-after'));
  const dropSide = (e, tab) => {
    const r = tab.getBoundingClientRect();
    return e.clientX > r.left + r.width / 2;
  };
  strip.addEventListener('dragstart', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    dragged = tab.dataset.tab;
    tab.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragged);
  });
  strip.addEventListener('dragover', e => {
    const tab = e.target.closest('.tab');
    if (!dragged || !tab || tab.dataset.tab === dragged) return;
    e.preventDefault();
    clearDrop();
    tab.classList.add(dropSide(e, tab) ? 'drop-after' : 'drop-before');
  });
  strip.addEventListener('drop', e => {
    const tab = e.target.closest('.tab');
    e.preventDefault();
    clearDrop();
    if (dragged && tab) moveTab(dragged, tab.dataset.tab, dropSide(e, tab));
    dragged = null;
  });
  strip.addEventListener('dragend', () => {
    clearDrop();
    strip.querySelector('.dragging')?.classList.remove('dragging');
    dragged = null;
  });
  $('stageArtist').addEventListener('click', e => {
    const link = e.target.closest('.a-link');
    if (link) openArtist({ id: link.dataset.artist, name: link.textContent });
  });
  $('themeBtn').addEventListener('click', themeMenu);

  const list = $('list');
  list.addEventListener('click', e => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'artist-more') return loadMoreArtist(e.target.closest('.more-row'));
    if (act === 'artist-play') return playArtist();
    if (act === 'artist-wave') {
      const ar = currentArtist();
      return ar && waveByArtist({ id: ar.id, name: ar.name });
    }
    if (act === 'artist-open') {
      const chip = e.target.closest('[data-act]');
      return openArtist({ id: chip.dataset.artist, name: chip.dataset.name });
    }
    const link = e.target.closest('.a-link');
    if (link) return openArtist({ id: link.dataset.artist, name: link.textContent });
    const row = e.target.closest('.row');
    if (!row) return;
    const i = +row.dataset.i;
    const t = state.visible[i];
    if (e.target.closest('[data-act="like"]')) return toggleLike(t);
    if (!t.available) return;
    if (state.current?.id === t.id && state.source === state.view) return togglePlay();
    playFrom(state.visible, i, state.view);
  });
  list.addEventListener('contextmenu', e => {
    const row = e.target.closest('.row');
    if (!row) return;
    const i = +row.dataset.i;
    const view = state.view;
    const visible = state.visible;
    trackMenu(e, visible[i], row, () => playFrom(visible, i, view));
  });

  let filterTimer;
  $('filter').addEventListener('input', e => {
    clearTimeout(filterTimer);
    filterTimer = setTimeout(() => {
      state.filter = e.target.value;
      renderList();
    }, 80);
  });

  // Моя волна
  $('waveTune').addEventListener('click', () => {
    state.waveTuneOpen = !state.waveTuneOpen;
    store.set('waveTuneOpen', state.waveTuneOpen);
    renderWaveBar();
  });
  $('waveSettings').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) onWaveChip(chip);
  });
  $('waveReset').addEventListener('click', () => startWave(myWave()));
  $('wavePlay').addEventListener('click', onWavePlay);

  // плеер
  $('playBtn').addEventListener('click', togglePlay);
  $('prevBtn').addEventListener('click', prev);
  $('nextBtn').addEventListener('click', () => next());
  $('shuffleBtn').addEventListener('click', toggleShuffle);
  $('repeatBtn').addEventListener('click', cycleRepeat);
  $('nowLike').addEventListener('click', () => toggleLike(state.current));
  $('nowOpen').addEventListener('click', () => (state.stageOpen ? closeStage() : openStage()));
  $('lyricsBtn').addEventListener('click', () => toggleStageTab('lyrics'));
  $('queueBtn').addEventListener('click', () => toggleStageTab('queue'));
  $('eqBtn').addEventListener('click', () => toggleEq());

  // развёрнутый вид
  document.querySelector('.side-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.side-tab');
    if (tab) openStage(tab.dataset.tab);
  });
  $('stageCloseBtn').addEventListener('click', closeStage);
  $('stageBack').addEventListener('click', closeStage);
  $('swapSideBtn').addEventListener('click', () => {
    state.sideLeft = !state.sideLeft;
    store.set('sideLeft', state.sideLeft);
    $('stage').classList.toggle('side-left', state.sideLeft);
  });
  $('stageSource').addEventListener('click', () => {
    closeStage();
    revealCurrent();
  });
  $('stageWaveTrack').addEventListener('click', () => waveByTrack(state.current));
  $('stageWaveArtist').addEventListener('click', () => waveByArtist(state.current?.artistList?.[0]));
  $('sideQueue').addEventListener('click', e => {
    const item = e.target.closest('.q-item');
    if (!item || item.classList.contains('off')) return;
    if (item.classList.contains('current')) togglePlay();
    else playPos(+item.dataset.pos);
  });
  $('sideQueue').addEventListener('contextmenu', e => {
    const item = e.target.closest('.q-item');
    if (!item) return;
    const pos = +item.dataset.pos;
    trackMenu(e, state.queue[state.order[pos]], item, () => playPos(pos));
  });
  const lyrics = $('sideLyrics');
  lyrics.addEventListener('wheel', () => { state.lyricsHoldUntil = performance.now() + 4000; }, { passive: true });
  lyrics.addEventListener('click', e => {
    const line = e.target.closest('.ly-line');
    if (!line || !state.lyrics?.synced || !audio.getAttribute('src')) return;
    state.lyricsHoldUntil = 0;
    audio.currentTime = state.lyrics.lines[+line.dataset.i].t;
    if (audio.paused) audio.play().catch(() => {});
  });

  // эквалайзер
  $('eqClose').addEventListener('click', () => toggleEq(false));
  $('eqOn').addEventListener('change', e => {
    eq.on = e.target.checked;
    applyEq();
  });
  $('eqReset').addEventListener('click', () => {
    eq.gains = FLAT.slice();
    applyEq();
  });
  $('eqPresets').addEventListener('click', e => {
    const chip = e.target.closest('[data-preset]');
    if (!chip) return;
    eq.gains = EQ_PRESETS[chip.dataset.preset].slice();
    eq.on = true;
    applyEq();
  });
  let band = null;
  const bandValue = (e, track) => {
    const r = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    return EQ_MAX - ratio * 2 * EQ_MAX;
  };
  $('eqBands').addEventListener('pointerdown', e => {
    const track = e.target.closest('.band-track');
    if (!track) return;
    band = { i: +track.parentElement.dataset.i, track };
    track.setPointerCapture(e.pointerId);
    setBand(band.i, bandValue(e, track));
  });
  $('eqBands').addEventListener('pointermove', e => { if (band) setBand(band.i, bandValue(e, band.track)); });
  $('eqBands').addEventListener('pointerup', () => { band = null; });
  $('eqBands').addEventListener('pointercancel', () => { band = null; });
  $('eqBands').addEventListener('dblclick', e => {
    const track = e.target.closest('.band-track');
    if (track) setBand(+track.parentElement.dataset.i, 0);
  });
  $('eqBands').addEventListener('wheel', e => {
    const track = e.target.closest('.band-track');
    if (!track) return;
    e.preventDefault();
    const i = +track.parentElement.dataset.i;
    setBand(i, eq.gains[i] + (e.deltaY < 0 ? 1 : -1));
  }, { passive: false });

  // закрытие всплывающего по клику мимо
  document.addEventListener('pointerdown', e => {
    if (!$('menu').hidden && !e.target.closest('#menu')) hideMenu();
    if (eq.open && !e.target.closest('#eqPanel, #eqBtn')) toggleEq(false);
  });
  window.addEventListener('blur', hideMenu);
  window.addEventListener('resize', () => {
    hideMenu();
    drawEq();
  });
  list.addEventListener('scroll', hideMenu, { passive: true });

  // прогресс
  const bar = $('progress');
  bar.addEventListener('pointerdown', e => {
    if (!audio.getAttribute('src')) return;
    dragging = true;
    bar.classList.add('drag');
    bar.setPointerCapture(e.pointerId);
    paintProgress(ratioAt(e) * duration());
  });
  bar.addEventListener('pointermove', e => { if (dragging) paintProgress(ratioAt(e) * duration()); });
  bar.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false;
    bar.classList.remove('drag');
    audio.currentTime = ratioAt(e) * duration();
  });
  bar.addEventListener('pointercancel', () => { dragging = false; bar.classList.remove('drag'); });

  $('volume').addEventListener('input', e => setVolume(+e.target.value));
  $('muteBtn').addEventListener('click', () => {
    if (state.muted || state.volume === 0) {
      if (state.volume === 0) state.volume = 50;
      state.muted = false;
    } else {
      state.muted = true;
    }
    applyVolume();
  });

  // аудио
  audio.addEventListener('play', () => {
    if (eq.ctx?.state === 'suspended') eq.ctx.resume().catch(() => {});
    setPlayingUi(true);
    startEqLoop();
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  });
  audio.addEventListener('playing', () => { state.errors = 0; });
  audio.addEventListener('pause', () => setPlayingUi(false));
  audio.addEventListener('ended', () => {
    if (state.waveTrack) reportWave('finished');
    next(true);
  });
  // плавно всё рисует tick() через requestAnimationFrame; timeupdate страхует, когда кадры не идут (пауза, свёрнутое окно)
  audio.addEventListener('timeupdate', () => {
    if (!dragging) paintProgress(audio.currentTime);
    syncLyrics(audio.currentTime);
  });
  audio.addEventListener('durationchange', () => { $('timeDur').textContent = fmt(duration()); });
  audio.addEventListener('error', () => {
    if (!audio.getAttribute('src') || !state.current) return;
    skipAfterError(state.playSeq, `Не удалось воспроизвести «${state.current.title}»`);
  });

  if ('mediaSession' in navigator) {
    const handlers = {
      play: () => audio.play(),
      pause: () => audio.pause(),
      previoustrack: prev,
      nexttrack: () => next(),
      seekto: d => { audio.currentTime = d.seekTime; },
    };
    for (const [action, fn] of Object.entries(handlers)) {
      try { navigator.mediaSession.setActionHandler(action, fn); } catch { /* не поддерживается */ }
    }
  }

  document.addEventListener('keydown', onKey);
  setIcon($('playBtn'), 'play');
  applyVolume();
  applyModes();
  applyEq();
}

function onKey(e) {
  if ($('app').hidden) return;
  if (e.key === 'Escape') {
    if (!$('menu').hidden) return hideMenu();
    if (eq.open) return toggleEq(false);
    if (e.target.id === 'filter') {
      e.target.value = '';
      state.filter = '';
      e.target.blur();
      return renderList();
    }
    if (state.stageOpen) return closeStage();
    return;
  }
  if (e.ctrlKey && e.code === 'KeyW') {
    e.preventDefault();
    if (state.view) closeTab(state.view);
    return;
  }
  if (e.ctrlKey && e.code === 'Tab') {
    e.preventDefault();
    cycleTab(e.shiftKey ? -1 : 1);
    return;
  }
  const digit = /^Digit([1-9])$/.exec(e.code);
  if (e.ctrlKey && digit && !e.shiftKey && !e.altKey) {
    e.preventDefault();
    const n = Number(digit[1]);
    const tab = n === 9 ? state.tabs[state.tabs.length - 1] : state.tabs[n - 1]; // Ctrl 9 — последняя, как в браузерах
    if (tab) activateTab(tab.id);
    return;
  }
  if (e.ctrlKey && e.code === 'KeyF') {
    e.preventDefault();
    closeStage();
    $('filter').focus();
    $('filter').select();
    return;
  }
  if (e.target.matches('input')) return;
  if (e.target.classList.contains('band-track')) {
    const i = +e.target.parentElement.dataset.i;
    const step = { ArrowUp: 0.5, ArrowDown: -0.5, PageUp: 3, PageDown: -3 }[e.code];
    if (step) {
      e.preventDefault();
      setBand(i, eq.gains[i] + step);
    } else if (e.code === 'Home' || e.code === 'Digit0') {
      setBand(i, 0);
    }
    return;
  }
  if (e.target.matches('button') && (e.code === 'Space' || e.code === 'Enter')) return;

  const actions = {
    Space: togglePlay,
    ArrowLeft: () => (e.ctrlKey ? prev() : seekBy(-5)),
    ArrowRight: () => (e.ctrlKey ? next() : seekBy(5)),
    ArrowUp: () => setVolume(state.volume + 5),
    ArrowDown: () => setVolume(state.volume - 5),
    KeyL: () => toggleLike(state.current),
    KeyS: toggleShuffle,
    KeyR: cycleRepeat,
    KeyT: () => toggleStageTab('lyrics'),
    KeyQ: () => toggleStageTab('queue'),
    KeyE: () => toggleEq(),
  };
  const fn = actions[e.code];
  if (fn && !e.altKey && !e.metaKey && (!e.ctrlKey || e.code.startsWith('Arrow'))) {
    e.preventDefault();
    fn();
  }
}

/* ---------- запуск ---------- */

if (new URLSearchParams(location.search).has('mock')) {
  const s = document.createElement('script');
  s.src = 'mock.js';
  s.onload = boot;
  document.head.append(s);
} else {
  window.addEventListener('pywebviewready', boot);
  boot();
}
