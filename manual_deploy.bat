
@echo off
echo ===================================================
echo   DIRECT DEPLOYMENT TO VERCEL
echo ===================================================
echo.
echo We are going to upload your site directly.
echo.
echo 1. A browser window might open. Log in to Vercel if asked.
echo 2. When asked questions below (like "Set up and deploy?"),
echo    just press ENTER to say "Yes" to everything.
echo.
echo Starting...
echo.

cmd /c "npx -y vercel"

echo.
echo Deployment Complete (hopefully!)
pause
