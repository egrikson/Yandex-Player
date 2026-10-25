@echo off
chcp 65001 >nul
cd /d "%~dp0"

if not exist ".venv\Scripts\pythonw.exe" (
    echo Первый запуск: ставлю зависимости, это займёт минуту...
    python -m venv .venv || goto :fail
    ".venv\Scripts\python.exe" -m pip install --disable-pip-version-check -q -r requirements.txt || goto :fail
)

start "" ".venv\Scripts\pythonw.exe" "%~dp0app.py"
exit /b 0

:fail
echo.
echo Не получилось подготовить окружение. Нужен Python 3.10+ с python.org.
pause
exit /b 1
