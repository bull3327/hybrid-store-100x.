
@echo off
echo ==========================================
echo    Initializing Git Repository...
echo ==========================================

git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/download/win
    echo After installing, close and reopen this terminal (or restart VS Code).
    pause
    exit /b
)

echo.
echo [1/5] Initializing git...
git init

echo.
echo [2/5] Adding files (this may take a moment)...
git add .

echo.
echo [3/5] Committing initial version...
git commit -m "Initial commit: Hybrid Store Launch"

echo.
echo ==========================================
echo    Success! Git repository initialized.
echo ==========================================
echo.
echo Next steps:
echo 1. Go to GitHub.com and create a new repository called 'hybrid-store'.
echo 2. Copy the URL (e.g., https://github.com/StartUpFounder/hybrid-store.git).
echo 3. Run these commands manually:
echo.
echo    git branch -M main
echo    git remote add origin [YOUR_REPO_URL]
echo    git push -u origin main
echo.
pause
