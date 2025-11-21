# Railway Deployment Setup

## ⚠️ Important: Set Root Directory

Railway needs to know that your backend code is in the `backend/` folder.

### Step 1: Set Root Directory in Railway Dashboard

1. Go to your Railway project dashboard: https://railway.app
2. Click on your service
3. Go to **Settings** tab
4. Scroll down to **Root Directory**
5. Set it to: `backend`
6. Click **Save**
7. Railway will automatically redeploy

This is the **easiest and most reliable method**. Railway will then:
- Detect `backend/package.json` (Node.js project)
- Run `npm install` automatically
- Run `npm start` to start the server

### Alternative: Manual Build/Start Commands

If setting root directory doesn't work, you can manually set:

1. Go to **Settings** → **Deploy**
2. Set **Build Command**: `cd backend && npm install`
3. Set **Start Command**: `cd backend && npm start`
4. Save and redeploy

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

