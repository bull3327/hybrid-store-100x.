
@echo off
echo ===================================================
echo   AUTO-DEPLOYING HYBRID STORE
echo ===================================================

echo 1. Updating Database...
call npx prisma db seed

echo 2. Pushing to Vercel (Production)...
call npx vercel --prod --yes

echo.
echo DONE!
pause
