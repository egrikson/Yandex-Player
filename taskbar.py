"""Кнопки «назад / играть / вперёд» на превью окна в панели задач Windows (ITaskbarList3).

pywebview такого не умеет, поэтому работаем с Windows напрямую через ctypes:
- подменяем оконную процедуру, чтобы ловить клики (WM_COMMAND + THBN_CLICKED);
- сами кнопки ставим из отдельного потока в режиме STA: поток окна у pywebview
  живёт в MTA, а ITaskbarList3 оттуда не создаётся («интерфейс не поддерживается»).
"""

import ctypes
import logging
import queue
import threading
import uuid
import winreg
from ctypes import wintypes

log = logging.getLogger('player.taskbar')

user32 = ctypes.windll.user32
ole32 = ctypes.windll.ole32

LRESULT = ctypes.c_ssize_t
WNDPROC = ctypes.WINFUNCTYPE(LRESULT, wintypes.HWND, wintypes.UINT, wintypes.WPARAM, wintypes.LPARAM)

user32.SetWindowLongPtrW.restype = ctypes.c_void_p
user32.SetWindowLongPtrW.argtypes = [wintypes.HWND, ctypes.c_int, ctypes.c_void_p]
user32.CallWindowProcW.restype = LRESULT
user32.CallWindowProcW.argtypes = [ctypes.c_void_p, wintypes.HWND, wintypes.UINT, wintypes.WPARAM, wintypes.LPARAM]
user32.LoadImageW.restype = wintypes.HANDLE
user32.LoadImageW.argtypes = [wintypes.HINSTANCE, wintypes.LPCWSTR, wintypes.UINT, ctypes.c_int, ctypes.c_int, wintypes.UINT]
user32.RegisterWindowMessageW.restype = wintypes.UINT
user32.RegisterWindowMessageW.argtypes = [wintypes.LPCWSTR]
ole32.CoCreateInstance.restype = ctypes.c_long  # код ошибки разбираем сами: пробуем несколько интерфейсов
ole32.CoInitializeEx.restype = ctypes.c_long

GWLP_WNDPROC = -4
WM_COMMAND = 0x0111
THBN_CLICKED = 0x1800
THB_ICON, THB_TOOLTIP, THB_FLAGS = 0x2, 0x4, 0x8
THBF_ENABLED = 0
IMAGE_ICON, LR_LOADFROMFILE = 1, 0x10
SM_CXSMICON = 49
CLSCTX_INPROC_SERVER = 1
COINIT_APARTMENTTHREADED = 0x2

# номера методов в таблице ITaskbarList3
HR_INIT, THUMB_BAR_ADD_BUTTONS, THUMB_BAR_UPDATE_BUTTONS = 3, 15, 16

PREV, PLAY, NEXT = 1, 2, 3
ACTIONS = {PREV: 'prev', PLAY: 'play', NEXT: 'next'}


class GUID(ctypes.Structure):
    _fields_ = [('Data1', wintypes.DWORD), ('Data2', wintypes.WORD), ('Data3', wintypes.WORD),
                ('Data4', ctypes.c_ubyte * 8)]

    @classmethod
    def parse(cls, text):
        u = uuid.UUID(text)
        return cls(u.time_low, u.time_mid, u.time_hi_version, (ctypes.c_ubyte * 8)(*u.bytes[8:]))


CLSID_TASKBAR_LIST = GUID.parse('56FDF344-FD6D-11d0-958A-006097C9A090')
# ITaskbarList4 наследует ITaskbarList3 с той же таблицей методов. На некоторых сборках
# Windows 11 объект отвечает «интерфейс не поддерживается» на ITaskbarList3, но отдаёт ITaskbarList4.
TASKBAR_IIDS = [GUID.parse('EA1AFB91-9E28-4B86-90E9-9E9F8A5EEE6F'),  # ITaskbarList3
                GUID.parse('C43DC798-95D1-4BEA-9030-BB99E2983A1A')]  # ITaskbarList4
E_NOINTERFACE = 0x80004002


class THUMBBUTTON(ctypes.Structure):
    _fields_ = [('dwMask', wintypes.DWORD), ('iId', wintypes.UINT), ('iBitmap', wintypes.UINT),
                ('hIcon', wintypes.HICON), ('szTip', wintypes.WCHAR * 260), ('dwFlags', wintypes.DWORD)]


def light_taskbar():
    """Светлая ли панель задач (тогда нужны тёмные значки)."""
    try:
        key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r'Software\Microsoft\Windows\CurrentVersion\Themes\Personalize')
        with key:
            return bool(winreg.QueryValueEx(key, 'SystemUsesLightTheme')[0])
    except OSError:
        return False


class TaskbarButtons:
    """Вешает кнопки на превью окна hwnd; клики отдаёт в on_click('prev' | 'play' | 'next').

    on_click вызывается в потоке окна — он не должен блокировать (пусть уходит в отдельный поток).
    """

    def __init__(self, hwnd, icon_dir, on_click):
        self.hwnd = hwnd
        self.on_click = on_click
        self.playing = False
        self.added = False
        self.taskbar = None
        folder = icon_dir / ('black' if light_taskbar() else 'white')
        size = user32.GetSystemMetrics(SM_CXSMICON) or 16
        self.icons = {
            name: user32.LoadImageW(None, str(folder / f'{name}.ico'), IMAGE_ICON, size, size, LR_LOADFROMFILE)
            for name in ('prev', 'play', 'pause', 'next')
        }
        self._jobs = queue.Queue()
        threading.Thread(target=self._worker, name='taskbar-sta', daemon=True).start()
        self._jobs.put(self._add)

        # Проводник присылает это сообщение, когда (пере)создаёт кнопку окна — например, после перезапуска
        self.created_msg = user32.RegisterWindowMessageW('TaskbarButtonCreated')
        self._proc = WNDPROC(self._wndproc)  # держим ссылку, иначе колбэк уберёт сборщик мусора
        self._old = user32.SetWindowLongPtrW(hwnd, GWLP_WNDPROC, ctypes.cast(self._proc, ctypes.c_void_p))
        if not self._old:
            raise OSError('Не удалось подключиться к окну')

    def set_playing(self, playing):
        self.playing = bool(playing)
        self._jobs.put(self._update_play)

    # --- поток окна: только приём сообщений -----------------------------------

    def _wndproc(self, hwnd, msg, wparam, lparam):
        try:
            if msg == WM_COMMAND and (wparam >> 16) & 0xFFFF == THBN_CLICKED:
                action = ACTIONS.get(wparam & 0xFFFF)
                if action:
                    self.on_click(action)
                return 0
            if msg == self.created_msg and self.added:
                self._jobs.put(self._readd)  # кнопку пересоздали — ставим кнопки заново
        except Exception:
            log.exception('Кнопки на превью')
        return user32.CallWindowProcW(self._old, hwnd, msg, wparam, lparam)

    # --- поток STA: всё общение с ITaskbarList3 -------------------------------

    def _worker(self):
        ole32.CoInitializeEx(None, COINIT_APARTMENTTHREADED)
        while True:
            job = self._jobs.get()
            try:
                job()
            except Exception:
                log.exception('Кнопки на превью')

    def _add(self):
        self._call(THUMB_BAR_ADD_BUTTONS, [self._button(b) for b in (PREV, PLAY, NEXT)])
        self.added = True

    def _readd(self):
        self.taskbar = None
        self._add()

    def _update_play(self):
        if self.added:
            self._call(THUMB_BAR_UPDATE_BUTTONS, [self._button(PLAY)])

    def _button(self, button_id):
        icon, tip = {
            PREV: ('prev', 'Предыдущий'),
            PLAY: ('pause', 'Пауза') if self.playing else ('play', 'Играть'),
            NEXT: ('next', 'Следующий'),
        }[button_id]
        button = THUMBBUTTON()
        button.dwMask = THB_ICON | THB_TOOLTIP | THB_FLAGS
        button.iId = button_id
        button.hIcon = self.icons[icon]
        button.szTip = tip
        button.dwFlags = THBF_ENABLED
        return button

    def _call(self, index, buttons):
        if self.taskbar is None:
            self._create()
        array = (THUMBBUTTON * len(buttons))(*buttons)
        method = ctypes.WINFUNCTYPE(
            ctypes.HRESULT, ctypes.c_void_p, wintypes.HWND, wintypes.UINT, ctypes.POINTER(THUMBBUTTON)
        )(self._method(index))
        method(self.taskbar, self.hwnd, len(buttons), array)

    def _create(self):
        ptr = ctypes.c_void_p()
        for iid in TASKBAR_IIDS:
            hr = ole32.CoCreateInstance(ctypes.byref(CLSID_TASKBAR_LIST), None, CLSCTX_INPROC_SERVER,
                                        ctypes.byref(iid), ctypes.byref(ptr))
            if hr == 0 or hr & 0xFFFFFFFF != E_NOINTERFACE:
                break
        if hr != 0:
            raise ctypes.WinError(hr)
        self.taskbar = ptr.value
        ctypes.WINFUNCTYPE(ctypes.HRESULT, ctypes.c_void_p)(self._method(HR_INIT))(self.taskbar)

    def _method(self, index):
        vtable = ctypes.cast(self.taskbar, ctypes.POINTER(ctypes.c_void_p))[0]
        return ctypes.cast(vtable, ctypes.POINTER(ctypes.c_void_p))[index]
