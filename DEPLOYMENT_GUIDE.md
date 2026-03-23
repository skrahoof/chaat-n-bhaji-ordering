# 🚀 Deployment Guide - Vercel + Render

## Overview
We'll deploy:
- **Frontend** → Vercel (Free, Fast CDN)
- **Backend** → Render (Free tier available)

After deployment, anyone can access from anywhere!

---

## 📋 Prerequisites

1. **GitHub Account** - Create at https://github.com if you don't have
2. **Vercel Account** - Sign up at https://vercel.com (use GitHub login)
3. **Render Account** - Sign up at https://render.com (use GitHub login)

---

## 🎯 Step-by-Step Deployment

### **PART 1: Push Code to GitHub**

#### Step 1: Initialize Git (if not already done)

Open terminal in project folder and run:

```bash
cd C:\Users\al86389\CascadeProjects\chaat-n-bhaji-ordering
git init
git add .
git commit -m "Initial commit - Chaat N Bhaji ordering app"
```

#### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click **"New"** button (green button, top right)
3. Repository name: `chaat-n-bhaji-ordering`
4. Description: `Food ordering system for Chaat N Bhaji`
5. Keep it **Public** (or Private if you prefer)
6. **Don't** initialize with README (we already have code)
7. Click **"Create repository"**

#### Step 3: Push to GitHub

Copy the commands GitHub shows you, or use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/chaat-n-bhaji-ordering.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

✅ **Checkpoint**: Your code should now be on GitHub!

---

### **PART 2: Deploy Backend to Render**

#### Step 1: Prepare Backend for Deployment

The backend is already prepared in the `server` folder.

#### Step 2: Create Render Account

1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with GitHub
4. Authorize Render to access your repositories

#### Step 3: Create New Web Service

1. Click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub repository: `chaat-n-bhaji-ordering`
4. Click **"Connect"**

#### Step 4: Configure Web Service

Fill in these settings:

- **Name**: `chaat-n-bhaji-backend` (or any name you like)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

#### Step 5: Add Environment Variables (Optional)

Click **"Advanced"** → **"Add Environment Variable"**

You can add any environment variables here if needed later.

#### Step 6: Deploy!

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://chaat-n-bhaji-backend.onrender.com`

✅ **Checkpoint**: Copy your backend URL! You'll need it next.

**Important**: Free tier sleeps after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.

---

### **PART 3: Deploy Frontend to Vercel**

#### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Sign up with GitHub
4. Authorize Vercel

#### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: `chaat-n-bhaji-ordering`
3. Click **"Import"**

#### Step 3: Configure Project

- **Framework Preset**: Vite (should auto-detect)
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)

#### Step 4: Add Environment Variable

Click **"Environment Variables"**

Add this variable:

- **Name**: `VITE_API_URL`
- **Value**: `https://your-backend-url.onrender.com/api`
  
Replace with YOUR actual Render backend URL from Part 2!

Example: `https://chaat-n-bhaji-backend.onrender.com/api`

#### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://chaat-n-bhaji-ordering.vercel.app`

✅ **Checkpoint**: Your app is now live!

---

### **PART 4: Update Backend CORS**

Your backend needs to allow requests from your Vercel frontend.

#### Update server.js

Edit `server/server.js` and update the CORS configuration:

```javascript
// Add this near the top with other imports
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-app.vercel.app',  // Replace with your actual Vercel URL
];

// Update CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

Then commit and push:

```bash
git add server/server.js
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy the update!

---

## 🎉 Your App is Live!

### **URLs:**

**Customer Menu (Share this!):**
```
https://your-app.vercel.app
```

**Admin Panel:**
```
https://your-app.vercel.app/admin
```
Password: `admin123`

**QR Code:**
```
https://your-app.vercel.app/qr
```

---

## 📱 Update QR Code

1. Visit: `https://your-app.vercel.app/qr`
2. QR code automatically uses production URL
3. Download and print
4. Share with customers!

Now anyone can scan and order from anywhere! 🎉

---

## 🔧 Post-Deployment Tasks

### 1. Test Everything

- [ ] Visit your Vercel URL
- [ ] Browse menu
- [ ] Add items to cart
- [ ] Place test order
- [ ] Check admin panel
- [ ] Verify order appears
- [ ] Test QR code

### 2. Update Admin Password

Edit `src/pages/Admin.jsx` line 16:
```javascript
const ADMIN_PASSWORD = 'your-secure-password-here';
```

Then:
```bash
git add src/pages/Admin.jsx
git commit -m "Update admin password"
git push
```

Vercel auto-deploys in 1-2 minutes!

### 3. Custom Domain (Optional)

**In Vercel:**
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS instructions

---

## 🔄 Making Updates

After deployment, any changes you make:

```bash
git add .
git commit -m "Description of changes"
git push
```

- **Vercel** auto-deploys frontend in 1-2 minutes
- **Render** auto-deploys backend in 3-5 minutes

---

## 💰 Costs

### **Vercel (Frontend)**
- ✅ **FREE** forever for personal projects
- Unlimited bandwidth
- Global CDN
- Auto SSL

### **Render (Backend)**
- ✅ **FREE** tier available
- 750 hours/month free
- Sleeps after 15 min inactivity
- First request after sleep: 30-60 seconds

**Upgrade Options:**
- Render Starter: $7/month (no sleep, always on)
- For production business, recommended

---

## 🚨 Troubleshooting

### Issue: Orders not appearing

**Solution:**
- Check backend URL in Vercel environment variables
- Make sure it ends with `/api`
- Example: `https://your-backend.onrender.com/api`

### Issue: CORS errors

**Solution:**
- Update CORS in `server/server.js`
- Add your Vercel URL to allowed origins
- Push changes to GitHub

### Issue: Backend slow first request

**Solution:**
- This is normal on free tier (backend sleeps)
- First request wakes it up (30-60 seconds)
- Subsequent requests are fast
- Upgrade to paid tier for always-on

### Issue: Can't access admin

**Solution:**
- URL: `https://your-app.vercel.app/admin`
- Password: `admin123` (or what you changed it to)

---

## 📊 Monitoring

### **Vercel Dashboard**
- View deployments
- Check build logs
- Monitor traffic
- https://vercel.com/dashboard

### **Render Dashboard**
- View backend logs
- Monitor uptime
- Check requests
- https://dashboard.render.com

---

## 🎯 Next Steps

1. ✅ Deploy to Vercel + Render
2. ✅ Test everything works
3. ✅ Update admin password
4. ✅ Download QR code
5. ✅ Print QR codes for tables
6. ✅ Share URL with customers
7. ✅ Start taking orders!

---

## 🆘 Need Help?

**Common Issues:**
- Backend URL wrong → Check Vercel env variables
- CORS errors → Update server/server.js
- Slow first load → Normal on free tier
- Can't login admin → Check password

**Resources:**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- GitHub Docs: https://docs.github.com

---

**Ready to deploy? Follow the steps above!** 🚀

Your app will be accessible from anywhere in the world!
