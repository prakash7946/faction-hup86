@echo off
title Install Requirements ??? april-86 Store
cd /d "%~dp0"

echo ===================================================
echo     Installing Dependencies from requirements.txt
echo ===================================================
echo.

:: 1. Check if virtualenv exists
if exist ".venv\Scripts\python.exe" (
    echo [1/3] Using virtual environment (.venv)...
    set "PY_BIN=.venv\Scripts\python.exe"
    goto :INSTALL
)

:: 2. Check for system Python
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [1/3] System Python found. Creating virtual environment (.venv)...
    python -m venv .venv
    if exist ".venv\Scripts\python.exe" (
        set "PY_BIN=.venv\Scripts\python.exe"
    ) else (
        set "PY_BIN=python"
    )
    goto :INSTALL
)

echo [ERROR] Python was not found on your system!
echo Please download and install Python from https://www.python.org/
echo Make sure to check "Add Python to PATH" during installation.
pause
exit /b 1

:INSTALL
echo [2/3] Upgrading pip...
%PY_BIN% -m pip install --upgrade pip --quiet

echo [3/3] Downloading & Installing packages from requirements.txt...
%PY_BIN% -m pip install -r requirements.txt

echo.
echo ===================================================
echo    SUCCESS: All requirements installed cleanly!
echo ===================================================
echo.
echo You can now start your store by running start_store.bat
echo.
pause
