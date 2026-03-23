# Admin Access Guide - Chaat N Bhaji

## 🔐 Admin Panel Security

The admin panel is now **password-protected** and **hidden from customers**.

### Accessing Admin Panel

1. **Direct URL Access Only**
   - Navigate to: `http://localhost:3000/admin`
   - Or in production: `https://yourdomain.com/admin`
   - **Note**: There is NO visible link on the customer menu page

2. **Login Credentials**
   - **Default Password**: `admin123`
   - ⚠️ **IMPORTANT**: Change this password before going live!

3. **Login Process**
   - Enter the admin password
   - Click "Login" button
   - Access granted to order management dashboard

### Changing Admin Password

**File**: `src/pages/Admin.jsx` (Line 16)

```javascript
// Change this to your secure password
const ADMIN_PASSWORD = 'admin123';
```

**Steps**:
1. Open `src/pages/Admin.jsx`
2. Find line 16: `const ADMIN_PASSWORD = 'admin123';`
3. Replace `'admin123'` with your secure password
4. Save the file
5. The app will auto-reload with the new password

**Password Recommendations**:
- Use at least 12 characters
- Mix uppercase, lowercase, numbers, and symbols
- Don't share the password
- Example: `'Chaat@2026#Secure!'`

### Admin Panel Features

Once logged in, you can:

✅ **View All Orders** - See orders from all tables in real-time
✅ **Filter by Status** - Quick filters for Pending, Accepted, Preparing, Served
✅ **Update Order Status** - Move orders through the workflow
✅ **Auto-Refresh** - Orders refresh every 10 seconds automatically
✅ **Logout** - Secure logout button in the header

### Order Workflow

```
Pending → Accepted → Preparing → Served
```

1. **Pending**: New order just received
   - Click "Accept Order" to acknowledge

2. **Accepted**: Order has been acknowledged
   - Click "Start Preparing" when you begin cooking

3. **Preparing**: Food is being prepared
   - Click "Mark as Served" when delivered to table

4. **Served**: Order completed
   - No further action needed

### Security Best Practices

1. ✅ **Change Default Password** immediately
2. ✅ **Don't share admin URL** with customers
3. ✅ **Logout when done** managing orders
4. ✅ **Use strong password** (12+ characters)
5. ✅ **Keep password private** - only share with trusted staff

### Accessing Admin Panel on Different Devices

**On Your Computer**:
- URL: `http://localhost:3000/admin`

**On Mobile/Tablet (Same Network)**:
- Find your computer's IP address
- URL: `http://YOUR_IP:3000/admin`
- Example: `http://192.168.1.100:3000/admin`

**In Production (After Deployment)**:
- URL: `https://yourdomain.com/admin`

### Troubleshooting

**Problem**: Can't access admin panel
- **Solution**: Make sure you're using the correct URL `/admin`
- Check that the server is running

**Problem**: Password not working
- **Solution**: Check `src/pages/Admin.jsx` for the correct password
- Ensure no extra spaces in the password

**Problem**: Logged out automatically
- **Solution**: This is normal - you need to login again
- The session doesn't persist on page refresh (for security)

### Customer vs Admin View

**Customers See**:
- ✅ Menu page with food items
- ✅ Shopping cart
- ✅ QR code link (top right)
- ❌ NO admin panel link
- ❌ NO way to access admin without URL

**Admins See** (after login):
- ✅ All customer orders
- ✅ Order status management
- ✅ Filter and search options
- ✅ Logout button
- ✅ Refresh button

## 📱 Quick Reference

| Action | URL | Password Required |
|--------|-----|-------------------|
| Customer Menu | `/` | No |
| QR Code | `/qr` | No |
| Admin Panel | `/admin` | Yes (admin123) |

---

**Remember**: Always logout when finished managing orders!
