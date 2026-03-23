# ✅ Deployment Checklist

Follow these steps in order to deploy your app to the internet!

## 📋 Before You Start

- [ ] You have a GitHub account (create at https://github.com)
- [ ] You have a Vercel account (sign up at https://vercel.com with GitHub)
- [ ] You have a Render account (sign up at https://render.com with GitHub)
- [ ] Git is installed on your computer

---

## 🚀 Deployment Steps

### **Step 1: Push to GitHub** (10 minutes)

Open terminal in project folder:

```bash
cd C:\Users\al86389\CascadeProjects\chaat-n-bhaji-ordering
```

Initialize Git (if not done):
```bash
git init
git add .
git commit -m "Initial commit - Chaat N Bhaji app"
```

Create repository on GitHub:
1. Go to https://github.com/new
2. Name: `chaat-n-bhaji-ordering`
3. Click "Create repository"

Push code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/chaat-n-bhaji-ordering.git
git branch -M main
git push -u origin main
```

- [ ] Code is on GitHub

---

### **Step 2: Deploy Backend to Render** (10 minutes)

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name**: `chaat-n-bhaji-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Click "Create Web Service"
6. Wait 3-5 minutes
7. **Copy your backend URL**: `https://your-backend.onrender.com`

- [ ] Backend deployed
- [ ] Backend URL copied: ___________________________

---

### **Step 3: Deploy Frontend to Vercel** (5 minutes)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework**: Vite (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com/api` (use YOUR backend URL!)
5. Click "Deploy"
6. Wait 2-3 minutes
7. **Copy your frontend URL**: `https://your-app.vercel.app`

- [ ] Frontend deployed
- [ ] Frontend URL copied: ___________________________

---

### **Step 4: Update Backend CORS** (5 minutes)

1. Open `server/server.js`
2. Find line 21 (the comment about Vercel URL)
3. Add your Vercel URL:
   ```javascript
   'https://your-app.vercel.app',  // Replace with YOUR actual URL
   ```
4. Save file
5. Push update:
   ```bash
   git add server/server.js
   git commit -m "Add production URL to CORS"
   git push
   ```
6. Render will auto-deploy (wait 3 minutes)

- [ ] CORS updated
- [ ] Changes pushed to GitHub

---

### **Step 5: Test Your Deployment** (5 minutes)

Visit your Vercel URL: `https://your-app.vercel.app`

Test these:
- [ ] Menu loads
- [ ] Can add items to cart
- [ ] Can enter table number and name
- [ ] Can place order (might take 30-60 seconds first time - backend waking up)
- [ ] Admin panel works: `https://your-app.vercel.app/admin`
- [ ] Can login with password: `admin123`
- [ ] Order appears in admin panel
- [ ] QR code page works: `https://your-app.vercel.app/qr`

---

### **Step 6: Share with Users!** (2 minutes)

Your app is now live! Share these URLs:

**For Customers:**
```
https://your-app.vercel.app
```

**QR Code:**
1. Visit: `https://your-app.vercel.app/qr`
2. Download QR code
3. Print and place on tables
4. Customers scan and order!

**For You (Admin):**
```
https://your-app.vercel.app/admin
Password: admin123
```

- [ ] QR code downloaded
- [ ] QR code printed
- [ ] URL shared with team

---

## 🎉 Congratulations!

Your food ordering app is now live on the internet!

**Anyone can access it from:**
- ✅ Any WiFi network
- ✅ Mobile data
- ✅ Anywhere in the world
- ✅ Any device

---

## 📝 Important URLs

Write down your URLs here:

**Frontend (Vercel):**
```
https://_________________________________.vercel.app
```

**Backend (Render):**
```
https://_________________________________.onrender.com
```

**Admin Panel:**
```
https://_________________________________.vercel.app/admin
```

**QR Code Page:**
```
https://_________________________________.vercel.app/qr
```

---

## 🔄 Making Updates Later

When you want to update your app:

```bash
# Make your changes in code
git add .
git commit -m "Description of changes"
git push
```

Both Vercel and Render will auto-deploy your changes!

---

## ⚠️ Important Notes

1. **Free Tier Limitations:**
   - Backend sleeps after 15 minutes of inactivity
   - First request after sleep takes 30-60 seconds
   - This is normal on free tier

2. **Change Admin Password:**
   - Edit `src/pages/Admin.jsx` line 16
   - Change `admin123` to something secure
   - Push changes to deploy

3. **Monitor Your App:**
   - Vercel Dashboard: https://vercel.com/dashboard
   - Render Dashboard: https://dashboard.render.com

---

## 🆘 Troubleshooting

**Orders not appearing?**
- Check VITE_API_URL in Vercel environment variables
- Should be: `https://your-backend.onrender.com/api`

**CORS errors?**
- Make sure you added Vercel URL to server/server.js
- Push changes to GitHub

**Backend slow?**
- First request after sleep is slow (30-60 seconds)
- Normal on free tier
- Upgrade to $7/month for always-on

---

## ✅ Final Checklist

- [ ] Code on GitHub
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] CORS configured
- [ ] Everything tested
- [ ] QR code downloaded
- [ ] URLs saved
- [ ] Ready to take orders!

**Your app is live! Start taking orders!** 🎉
