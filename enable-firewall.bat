@echo off
echo ========================================
echo Configuring Windows Firewall
echo ========================================
echo.
echo This will allow mobile devices to access your app
echo.

netsh advfirewall firewall add rule name="Vite Dev Server Port 3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="Node Backend Server Port 5000" dir=in action=allow protocol=TCP localport=5000

echo.
echo ========================================
echo Firewall rules added successfully!
echo ========================================
echo.
echo You can now access the app from mobile devices on the same WiFi network.
echo.
pause
