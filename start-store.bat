@echo off
echo ==========================================
echo    HybridStore 100x - Quick Start
echo ==========================================
echo.
echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Could not install dependencies. 
    echo Please make sure you installed Node.js!
    pause
    exit /b
)

echo.
echo [2/4] Starting Database (Docker)...
docker-compose up -d
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Could not start the database.
    echo Please make sure Docker Desktop is installed and RUNNING!
    pause
    exit /b
)

echo.
echo [3/4] Setting up Database schema...
call npx prisma db push

echo.
echo [4/4] Starting the Storefront!
echo.
echo OPEN YOUR BROWSER TO: http://localhost:3000
echo.
call npm run dev
pause
