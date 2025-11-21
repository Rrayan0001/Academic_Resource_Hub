# Railway Deployment Fix - CRITICAL STEPS

## ⚠️ YOU MUST DO THIS IN RAILWAY DASHBOARD

Railway is analyzing the root directory and can't find how to build. **You MUST set the Root Directory in Railway settings.**

### Step-by-Step Fix:

1. **Go to Railway Dashboard**: https://railway.app
2. **Click on your project** → **Click on your service** (the one failing)
3. **Click on "Settings" tab** (gear icon on the right)
4. **Scroll down to "Root Directory"** section
5. **Click "Edit"** or click in the input field
6. **Type exactly**: `backend`
7. **Click "Save"** or press Enter
8. **Railway will automatically redeploy**

### Why This Is Required:

Railway sees this structure in your repo:
```
/
├── backend/     ← Your Node.js app is here
├── frontend/    ← This is for Vercel
├── railway.json
└── ...
```

Without setting Root Directory, Railway doesn't know which folder contains your app. Setting it to `backend` tells Railway:
- ✅ Look for `package.json` in `backend/`
- ✅ Run `npm install` in `backend/`
- ✅ Use `backend/nixpacks.toml` for build config
- ✅ Start with `npm start` from `backend/`

### After Setting Root Directory:

Railway will:
1. Detect Node.js from `backend/package.json`
2. Use `backend/nixpacks.toml` for build configuration
3. Install dependencies with `npm install`
4. Start server with `npm start`
5. Show "API server ready" in logs

### Environment Variables:

Make sure these are set in Railway (Settings → Variables):
- `DATABASE_URL` - Your Neon PostgreSQL connection string
- `JWT_SECRET` - Your JWT secret key  
- `CLIENT_ORIGIN` - `https://academic-resource-hub.vercel.app`

### If Root Directory Setting Doesn't Appear:

1. Make sure you're in the **Settings** tab of your **service** (not project)
2. Look for "Root Directory" or "Working Directory"
3. If you still don't see it, try:
   - Go to **Settings** → **Deploy**
   - Set **Build Command**: `cd backend && npm install`
   - Set **Start Command**: `cd backend && npm start`

**The Root Directory method is the most reliable and recommended approach.**

