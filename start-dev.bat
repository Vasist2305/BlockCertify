@echo off
echo ========================================
echo   BlockCertify Development Server
echo ========================================
echo.

echo Checking MongoDB...
mongosh --eval "db.version()" > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] MongoDB is not running!
    echo Please start MongoDB first:
    echo   - Windows: net start MongoDB
    echo   - Or run: mongod
    echo.
    pause
    exit /b 1
)
echo [OK] MongoDB is running
echo.

echo Starting Backend Server...
start "BlockCertify Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "BlockCertify Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to open browser...
pause > nul

start http://localhost:5173

echo.
echo To stop servers, close the terminal windows
echo or press Ctrl+C in each window
echo.
