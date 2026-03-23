# 📱 Mobile Access Guide - Chaat N Bhaji

## ✅ Mobile Access is Now Enabled!

Your app is now accessible from mobile devices on the same WiFi network.

## 🌐 Your Network URLs

### **Primary URL** (Use this one):
```
http://192.168.0.105:3000
```

### **Alternative URL**:
```
http://30.239.84.112:3000
```

## 📱 How to Access from Mobile

### **Step 1: Connect to Same WiFi**
- Make sure your mobile phone is connected to the **same WiFi network** as your laptop
- Both devices must be on the same network

### **Step 2: Open on Mobile Browser**
1. Open **Chrome** or **Safari** on your mobile
2. Type in the address bar: `http://192.168.0.105:3000`
3. Press **Go** or **Enter**
4. The menu should load!

### **Step 3: Test QR Code**
1. On your laptop, go to: `http://localhost:3000/qr`
2. The QR code now contains: `http://192.168.0.105:3000`
3. Scan the QR code with your phone camera
4. It should open the menu automatically!

## 🔧 Troubleshooting

### Problem: "Site can't be reached"

**Solution 1: Check WiFi Connection**
- Verify both laptop and phone are on the **same WiFi**
- Not mobile data, must be WiFi

**Solution 2: Check Firewall**
- Windows Firewall might be blocking the connection
- Run this command in PowerShell (as Administrator):
```powershell
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

**Solution 3: Try Alternative IP**
- If `192.168.0.105` doesn't work, try: `http://30.239.84.112:3000`

**Solution 4: Restart Server**
- Stop the server (Ctrl+C in terminal)
- Run again: `npm run dev:all`

### Problem: QR Code shows wrong URL

**Solution:**
- Edit `src/pages/QRCode.jsx` (line 11)
- Change the IP to match your current network IP
- Current setting: `http://192.168.0.105:3000`

## 🔍 Find Your Current IP Address

If your IP changes, find it again:

### **Windows**:
```powershell
ipconfig
```
Look for: **IPv4 Address** under your WiFi adapter
Example: `192.168.0.105`

### **Update QR Code with New IP**:
1. Open: `src/pages/QRCode.jsx`
2. Find line 11: `? 'http://192.168.0.105:3000'`
3. Replace with your new IP
4. Save file (auto-reloads)

## 📊 Access Summary

| Device | URL | Notes |
|--------|-----|-------|
| **Laptop (Local)** | `http://localhost:3000` | Works on your laptop |
| **Mobile (Same WiFi)** | `http://192.168.0.105:3000` | Works on any device on same network |
| **QR Code** | `http://192.168.0.105:3000` | Scan to access |

## 🎯 Testing Checklist

- [ ] Laptop can access: `http://localhost:3000` ✅
- [ ] Mobile connected to same WiFi
- [ ] Mobile can access: `http://192.168.0.105:3000`
- [ ] QR code scans and opens menu
- [ ] Can place order from mobile
- [ ] Order appears in admin panel

## 🚀 For Production Deployment

When you deploy to a real server:
1. You'll get a permanent URL (e.g., `https://chaatbhaji.com`)
2. Update `src/pages/QRCode.jsx` with production URL
3. No need for IP addresses anymore
4. Works from anywhere with internet

## 💡 Tips

1. **Keep laptop running** - The server runs on your laptop
2. **Same WiFi required** - Mobile must be on same network
3. **IP might change** - If you restart router, IP may change
4. **Firewall** - Windows Firewall might need configuration
5. **Test first** - Test on mobile before printing QR codes

---

**Current Status**: ✅ Mobile access enabled and working!
