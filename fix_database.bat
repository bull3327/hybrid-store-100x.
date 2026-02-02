
@echo off
echo ===================================================
echo     FIXING HYBRID STORE DATABASE
echo ===================================================
echo.
echo 1. Stopping any lingering Node processes...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo 2. Navigating to project folder...
cd /d "c:\Users\user\.gemini\antigravity\scratch\hybrid-store-100x"

echo.
echo 3. Regenerating Database Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo [ERROR] Could not generate client.
    echo Please RESTART YOUR COMPUTER or simply CLOSE VS CODE completely and try again.
    pause
    exit /b
)

echo.
echo 4. Seeding Products...
call npx prisma db seed
if %errorlevel% neq 0 (
    echo [ERROR] Could not seed database.
    pause
    exit /b
)

echo.
echo ===================================================
echo     SUCCESS! DATABASE IS READY.
echo ===================================================
echo.
echo You can now start your server by typing:
echo npm run dev
echo.
pause
