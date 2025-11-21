# Railway Deployment Setup

## ⚠️ CRITICAL: Set Root Directory in Railway Dashboard

**You MUST set the Root Directory in Railway settings for this to work.**

### Step-by-Step Instructions:

1. Go to your Railway project dashboard: https://railway.app
2. Click on your service (the one that's failing)
3. Go to **Settings** tab
4. Scroll down to **Root Directory** section
5. Click **Edit** or the input field
6. Enter: `backend`
7. Click **Save** or press Enter
8. Railway will automatically redeploy

**This is REQUIRED** - Railway needs to know that your backend code is in the `backend/` folder.

After setting this:
- Railway will automatically detect `backend/package.json` (Node.js project)
- It will run `npm install` in the `backend/` directory
- It will run `npm start` to start the server
- Nixpacks will properly detect Node.js and build the app

### Alternative: Manual Build/Start Commands

If setting root directory doesn't work, you can manually set:

1. Go to **Settings** → **Deploy**
2. Set **Build Command**: `cd backend && npm install`
3. Set **Start Command**: `cd backend && npm start`
4. Save and redeploy

**But the Root Directory method is recommended and more reliable.**

## Environment Variables

Make sure to set these in Railway:

```env
DATABASE_URL=your-neon-postgres-connection-string
JWT_SECRET=your-secret-jwt-key
PORT=5001
CLIENT_ORIGIN=https://academic-resource-hub.vercel.app
```

## Verify Deployment

After deployment, check:
1. Railway logs show "API server ready"
2. Health endpoint works: `https://your-railway-url.up.railway.app/api/health`
3. CORS is configured correctly for your Vercel frontend

