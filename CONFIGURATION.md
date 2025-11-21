# Configuration Guide

This guide explains how to configure the frontend and backend for production deployment.

## Backend Configuration (Railway)

### Important Note about Railway URLs

Railway provides two types of URLs:
- **Internal URL**: `academic_resource_hub.railway.internal` - Only accessible within Railway's network
- **Public URL**: `https://academic-resource-hub-production.up.railway.app` - Accessible from the internet

**You must use the PUBLIC URL for the frontend to connect to the backend.**

### Finding Your Railway Public URL

1. Go to your Railway project dashboard
2. Click on your service
3. Look for the "Public Domain" or "Domains" section
4. Copy the public URL (it will look like `https://your-app-name.up.railway.app`)

### Backend Environment Variables

In your Railway project, set these environment variables:

```env
DATABASE_URL=your-neon-postgres-connection-string
JWT_SECRET=your-secret-jwt-key
PORT=5001
CLIENT_ORIGIN=https://academic-resource-hub.vercel.app
```

**Note**: The `CLIENT_ORIGIN` should be your Vercel frontend URL: `https://academic-resource-hub.vercel.app`

## Frontend Configuration (Vercel)

### Environment Variables

In your Vercel project settings, add this environment variable:

```env
VITE_API_URL=https://your-railway-public-url.up.railway.app
```

**Important**: 
- Replace `your-railway-public-url.up.railway.app` with your actual Railway public URL
- Do NOT use the `.internal` URL - it won't work from Vercel
- The URL should start with `https://`

### Setting Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-public-url.up.railway.app`
   - **Environment**: Production, Preview, Development (select all)
4. Save and redeploy

## Testing the Connection

### 1. Test Backend Health Endpoint

```bash
curl https://your-railway-public-url.up.railway.app/api/health
```

Should return:
```json
{"status":"ok","timestamp":1234567890}
```

### 2. Test Frontend Connection

1. Visit `https://academic-resource-hub.vercel.app`
2. Open browser DevTools (F12) → Network tab
3. Try to log in
4. Check if API calls are going to your Railway backend URL

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. **Check CLIENT_ORIGIN in Railway**: Make sure it's set to `https://academic-resource-hub.vercel.app` (exact match, no trailing slash)
2. **Check backend logs**: Railway logs will show CORS errors
3. **Verify URL format**: Both URLs should use `https://` (not `http://`)

### API Not Found / 404 Errors

1. **Verify VITE_API_URL**: Check that it's set correctly in Vercel
2. **Check Railway URL**: Make sure you're using the public URL, not `.internal`
3. **Rebuild frontend**: After changing `VITE_API_URL`, you must rebuild the frontend

### Connection Refused

1. **Check Railway service**: Make sure your backend is running and deployed
2. **Check Railway public URL**: Verify the URL is correct in Railway dashboard
3. **Check firewall**: Railway should allow public access by default

## Quick Checklist

- [ ] Railway backend is deployed and running
- [ ] Railway public URL is copied (not `.internal`)
- [ ] `CLIENT_ORIGIN` in Railway is set to `https://academic-resource-hub.vercel.app`
- [ ] `VITE_API_URL` in Vercel is set to your Railway public URL
- [ ] Frontend has been rebuilt after setting `VITE_API_URL`
- [ ] Backend health endpoint works: `/api/health`
- [ ] Frontend can make API calls to backend

