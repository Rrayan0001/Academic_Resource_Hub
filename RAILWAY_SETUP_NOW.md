# 🎯 Set Railway Root Directory NOW

## You Need To Do This (I Can't Access Your Railway Dashboard)

I cannot access your Railway account, so **YOU** need to make this change in Railway.

---

## 📋 Exact Steps (Copy & Follow)

### 1. Open Railway
Go to: **https://railway.app/dashboard**

### 2. Find Your Service
- Click on your **Academic Resource Hub** project
- Click on the **service** that's showing the build error

### 3. Open Settings
- Look at the **right side** of the screen
- Click the **"Settings"** tab (it has a gear/cog icon)

### 4. Find Root Directory
- Scroll down in Settings
- Look for one of these:
  - **"Root Directory"**
  - **"Service Root"**
  - **"Working Directory"**

### 5. Set the Value
- Click **"Edit"** or click in the input box
- Type exactly: `backend`
- Press **Enter** or click **"Save"**

### 6. Wait for Redeploy
- Railway will **automatically start a new deployment**
- Watch the build logs
- It should succeed this time

---

## 📸 What to Look For

**In Settings, you'll see something like:**

```
Root Directory
┌─────────────────────────────────┐
│                                 │  ← Click here
└─────────────────────────────────┘
Edit button →  [Edit]
```

**Change it to:**

```
Root Directory
┌─────────────────────────────────┐
│ backend                         │  ← Type this
└─────────────────────────────────┘
```

---

## ✅ How to Know It Worked

After you save and Railway redeploys:

**Build logs will show:**
```
✓ Found package.json at /app/backend/package.json
✓ Running npm install
✓ Build succeeded
```

**Deployment logs will show:**
```
✅ API server ready on http://localhost:5001
📡 Health check: http://localhost:5001/api/health
```

---

## 🆘 If You Can't Find "Root Directory"

Some Railway accounts have different UI. If you can't find "Root Directory":

### Alternative Method:

1. In **Settings** tab
2. Find **"Deploy"** section
3. Set these:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`

---

## 🚨 Common Mistakes

❌ **DON'T** type `/backend` (no leading slash)
❌ **DON'T** type `backend/` (no trailing slash)
✅ **DO** type `backend` (exactly like this)

---

## 📞 Still Stuck?

If you genuinely cannot find the setting:

1. Take a screenshot of your Railway Settings page
2. Look for "Service Settings" vs "Project Settings" (you need Service Settings)
3. Make sure you're in the **service** that's failing, not the project overview

---

## Time Required: 30 seconds

This is a simple change that takes less than a minute. I cannot do this for you because I don't have access to your Railway account.

