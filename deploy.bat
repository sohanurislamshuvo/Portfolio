@echo off
echo 🚀 Building Portfolio for Production...
echo.

REM Build the application from the frontend folder
pushd frontend
call npm run build
set BUILD_ERROR=%ERRORLEVEL%
popd

if %BUILD_ERROR% NEQ 0 (
    echo ❌ Build failed! Please check for errors.
    pause
    exit /b 1
)

echo.
echo ✅ Build completed successfully!
echo.
echo 📁 Production files are ready in the 'frontend\\dist' folder
echo.
echo 📋 Next steps:
echo    1. Upload all files from 'frontend\\dist' folder to your web hosting
echo    2. Ensure .htaccess file is uploaded (might be hidden)
echo    3. Visit your domain to see your portfolio live!
echo.
echo 🔐 Admin Panel Access:
echo    URL: https://yourdomain.com/hey-admin
echo    Username: shuvo
echo    Password: 404 not found shuvo is no more
echo.
echo 🎉 Ready for deployment!
pause
