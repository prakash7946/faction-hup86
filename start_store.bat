@echo off
title Elegance Dress Store Launcher
cd /d "%~dp0"

echo ===================================================
echo        Elegance Dress Store - 1-Click Launcher
echo ===================================================
echo.

:: Check for uv package runner
where uv >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting server with uv...
    start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5000/login"
    cd backend
    uv run --with "flask,flask-cors,python-dotenv,gunicorn" python app.py
    exit /b 0
)

:: Check for virtual environment first
if exist ".venv\Scripts\python.exe" (
    set "PY_CMD=%~dp0.venv\Scripts\python.exe"
    cd backend
    goto :RUN
)

:: Check for standard system python
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    set "PY_CMD=python"
    cd backend
    goto :CHECK_DEPS
)

:: Fallback: Open login.html directly in browser
echo Python server not detected. Opening login page directly in your browser...
start "" "%~dp0frontend\login.html"
exit /b 0

:CHECK_DEPS
echo Checking dependencies...
%PY_CMD% -m pip install -r requirements.txt --quiet >nul 2>nul

:RUN
echo Starting Flask Server...
echo Store will automatically open in your default browser at http://localhost:5000
echo (Keep this window open while using the store)
echo.

:: Open default browser after 2 seconds delay in background
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5000"

:: Start Flask app
%PY_CMD% app.py

pause