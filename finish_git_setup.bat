
@echo off
echo ===================================================
echo     PUSHING TO GITHUB
echo ===================================================
echo.
echo [1/5] Checking Git version...
git --version
if %errorlevel% neq 0 (
    echo [ERROR] Git is still not found! 
    echo Please make sure you installed Git and RESTARTED this terminal window.
    pause
    exit /b
)

echo.
echo [2/5] Initializing Repository...
git init
git branch -M main

echo.
echo [3/5] Adding Files...
git add .
git commit -m "Hybrid Store Launch: SQLite + Cart + Tracking"

echo.
echo [4/5] Connecting to GitHub...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/bull3327/hybrid-store.git

echo.
echo [5/5] Pushing Code...
git push -u origin main

echo.
echo ===================================================
echo     SUCCESS! CODE IS ON GITHUB.
echo ===================================================
echo Now go to Vercel.com to deploy!
pause
