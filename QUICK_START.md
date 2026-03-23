# 🚀 Quick Start Guide - Chaat N Bhaji

## 📱 Access URLs

### **On Your Laptop:**
- **Customer Menu**: http://localhost:3000
- **QR Code Page**: http://localhost:3000/qr
- **Admin Panel**: http://localhost:3000/admin (Password: `admin123`)

### **On Mobile (Same WiFi):**
- **Customer Menu**: http://192.168.0.105:3000
- **Admin Panel**: http://192.168.0.105:3000/admin

## 🔐 Admin Panel Access

### **Method 1: Direct URL**
Type directly in browser:
```
http://localhost:3000/admin
```
Password: `admin123`

### **Method 2: From QR Code Page**
1. Go to: http://localhost:3000/qr
2. Scroll down
3. Click "🔐 Admin Panel Access" link at bottom
4. Enter password: `admin123`

### **Method 3: Bookmark It**
- Bookmark: http://localhost:3000/admin
- Click bookmark when needed
- Enter password

## 📱 Mobile Access Troubleshooting

### **If QR Code Keeps Loading:**

**Step 1: Check WiFi**
- Both laptop and phone on SAME WiFi network
- Not mobile data

**Step 2: Test Direct URL**
- On mobile browser, type: `http://192.168.0.105:3000`
- If this works, QR code should too

**Step 3: Regenerate QR Code**
1. Go to: http://localhost:3000/qr
2. Click "📱 Mobile Network" button
3. QR code updates automatically
4. Scan again

**Step 4: Check Firewall (Windows)**
Run in PowerShell as Administrator:
```powershell
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Node Server" -Direction Inbound -LocalPort 5000 -Protocol TCP -Action Allow
```

**Step 5: Restart Servers**
In terminal, press `Ctrl+C` to stop, then run:
```bash
npm run dev:all
```

## 🎯 Quick Test Checklist

### **Laptop Test:**
- [ ] Open: http://localhost:3000
- [ ] See menu items
- [ ] Add item to cart
- [ ] Can place test order

### **Admin Test:**
- [ ] Open: http://localhost:3000/admin
- [ ] Enter password: `admin123`
- [ ] See admin dashboard
- [ ] Test order appears

### **Mobile Test:**
- [ ] Phone on same WiFi
- [ ] Open: http://192.168.0.105:3000
- [ ] Menu loads
- [ ] Can add items to cart
- [ ] Can place order

### **QR Code Test:**
- [ ] Go to: http://localhost:3000/qr
- [ ] Click "📱 Mobile Network"
- [ ] Scan QR code with phone
- [ ] Menu opens on phone

## 🔧 Common Issues & Solutions

### Issue: "Site can't be reached" on mobile

**Solution:**
1. Check WiFi connection (same network)
2. Try alternative URL: http://30.239.84.112:3000
3. Configure firewall (see Step 4 above)
4. Restart router and servers

### Issue: Can't find admin panel

**Solution:**
- Admin link is HIDDEN from customers (security)
- Access directly: http://localhost:3000/admin
- Or use link on QR code page

### Issue: QR code shows localhost

**Solution:**
1. Go to: http://localhost:3000/qr
2. Click "📱 Mobile Network" button
3. QR code updates to network IP
4. Download and print

### Issue: Orders not appearing in admin

**Solution:**
1. Check backend server is running (port 5000)
2. Check browser console for errors (F12)
3. Restart servers: `npm run dev:all`

### Issue: Password not working

**Solution:**
- Default password: `admin123`
- Check for typos
- Password is case-sensitive
- No spaces before/after

## 📊 Server Status Check

### **Check if servers are running:**

**Frontend (Vite):**
- Should show: `Local: http://localhost:3000`
- Should show: `Network: http://192.168.0.105:3000`

**Backend (Express):**
- Should show: `🚀 Server running on http://localhost:5000`

### **If servers not running:**
```bash
cd C:\Users\al86389\CascadeProjects\chaat-n-bhaji-ordering
npm run dev:all
```

## 🎨 Features Overview

### **Customer Features:**
- Browse menu by category
- Add items to cart
- Adjust quantities
- Enter table number and name
- Place order (goes to admin)
- Send order via WhatsApp

### **Admin Features:**
- View all orders
- Filter by status
- Update order status:
  - Pending → Accepted → Preparing → Served
- Auto-refresh every 10 seconds
- Logout button

## 💡 Pro Tips

1. **Bookmark Admin**: Save http://localhost:3000/admin as bookmark
2. **Print QR Code**: Download from /qr page and print for tables
3. **Test First**: Always test on mobile before customers use
4. **Keep Running**: Keep laptop running while customers order
5. **Same WiFi**: Ensure all devices on same network

## 🆘 Need Help?

1. Check this guide first
2. Check MOBILE_ACCESS.md for mobile issues
3. Check ADMIN_GUIDE.md for admin help
4. Check browser console (F12) for errors

---

**Everything working?** Great! You're ready to take orders! 🎉
