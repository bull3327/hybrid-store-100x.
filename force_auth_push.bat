
@echo off
echo ===================================================
echo     PUSHING CODE (FORCE UPDATE)
echo ===================================================
echo.
echo This will overwrite the GitHub repository with your local code.
echo.

git remote remove origin >nul 2>&1
git remote add origin https://bull3327@github.com/bull3327/hybrid-store.git

echo [1/2] Committing any remaining changes...
git add .
git commit -m "Final Launch Version"

echo.
echo [2/2] Pushing to GitHub (Force)...
echo -----------------------------------------------------------
echo If a window pops up, sign in!
echo If asked for password, use Personal Access Token.
echo -----------------------------------------------------------
echo.

git push --force origin main

echo.
echo Done.
pause
