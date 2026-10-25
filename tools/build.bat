@echo off
chcp 65001 >nul
cd /d "%~dp0.."

if not exist ".venv\Scripts\python.exe" (
    python -m venv .venv || goto :fail
)
".venv\Scripts\python.exe" -m pip install --disable-pip-version-check -q -r requirements.txt pyinstaller pillow || goto :fail
".venv\Scripts\python.exe" tools\make_icon.py || goto :fail

".venv\Scripts\python.exe" -m PyInstaller --noconfirm --clean --onefile --windowed ^
    --name "One Dark Player" ^
    --icon "%CD%\icon.ico" ^
    --version-file "%CD%\tools\version_info.txt" ^
    --add-data "%CD%\ui;ui" ^
    --add-data "%CD%\icon.ico;." ^
    --add-data "%CD%\assets;assets" ^
    --distpath "%CD%\build\dist" --workpath "%CD%\build" --specpath "%CD%\build" ^
    app.py || goto :fail

rem Запущенный exe нельзя удалить, но можно переименовать — так сборка не мешает слушать музыку.
del /q "One Dark Player.old*.exe" 2>nul
if exist "One Dark Player.exe" del /q "One Dark Player.exe" 2>nul
if exist "One Dark Player.exe" ren "One Dark Player.exe" "One Dark Player.old-%RANDOM%.exe"
move /y "build\dist\One Dark Player.exe" . >nul || goto :fail

rmdir /s /q build
echo.
echo Готово: One Dark Player.exe
exit /b 0

:fail
echo.
echo Сборка не удалась.
pause
exit /b 1
