
@echo off
setlocal

echo Searching for Git...
set "GIT_PATH=C:\Program Files\Git\bin\git.exe"

if not exist "%GIT_PATH%" (
    echo Git not found at standard location. trying PATH...
    git --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo [ERROR] Git is strictly NOT found. You must run this command in your own terminal.
        exit /b 1
    )
    set "GIT_PATH=git"
)

echo using Git: "%GIT_PATH%"

"%GIT_PATH%" add .
"%GIT_PATH%" commit -m "Auto-commit: URL Fixes and Affiliate Updates"
"%GIT_PATH%" push origin main

echo Success.
