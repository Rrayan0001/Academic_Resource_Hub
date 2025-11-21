# CORS Fix - Production Deployment

## ✅ What I Fixed

1. ✅ Backend CORS is already configured correctly
2. ✅ Added better CORS logging for debugging
3. ✅ Added explicit methods and headers to CORS config

## 🎯 What YOU Need to Do

### Step 1: Set Environment Variable in Railway

Your backend URL: `https://academicresourcehub-production.up.railway.app`

1. Go to **Railway** → Your service → **Variables** tab
2. Make sure `CLIENT_ORIGIN` is set to:
   ```
   https://academic-resource-hub.vercel.app
   ```
3. **Important**: No trailing slash!
   - ✅ `https://academic-resource-hub.vercel.app`
   - ❌ `https://academic-resource-hub.vercel.app/`

### Step 2: Set Environment Variable in Vercel

Your frontend URL: `https://academic-resource-hub.vercel.app`

1. Go to **Vercel** → Your project → **Settings** → **Environment Variables**
2. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://academicresourcehub-production.up.railway.app`
   - **Environments**: Select all (Production, Preview, Development)
3. Click **Save**

### Step 3: Redeploy Both

**Railway:**
- After setting `CLIENT_ORIGIN`, Railway will auto-redeploy
- Or manually trigger redeploy from Deployments tab

**Vercel:**
- After setting `VITE_API_URL`, go to **Deployments** tab
- Click **"Redeploy"** on the latest deployment
- Or push a new commit to trigger redeploy

## 🔍 Verify It's Working

### Test Backend CORS

```bash
curl -H "Origin: https://academic-resource-hub.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://academicresourcehub-production.up.railway.app/api/auth/login \
     -v
```

Should return:
```
< HTTP/1.1 204 No Content
< Access-Control-Allow-Origin: https://academic-resource-hub.vercel.app
< Access-Control-Allow-Credentials: true
< Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
```

### Test Frontend

1. Open `https://academic-resource-hub.vercel.app`
2. Open DevTools (F12) → **Console** tab
3. Try to sign up or log in
4. Check **Network** tab - API calls should go to:
   ```
   https://academicresourcehub-production.up.railway.app/api/auth/login
   ```
5. Should see `200 OK` responses (not CORS errors)

## 🐛 Troubleshooting

### Still Getting CORS Errors?

1. **Check Railway logs** - Should see CORS warnings if origin is blocked
2. **Verify CLIENT_ORIGIN in Railway**:
   - Must be exactly: `https://academic-resource-hub.vercel.app`
   - No trailing slash
   - Case-sensitive
3. **Verify VITE_API_URL in Vercel**:
   - Must be: `https://academicresourcehub-production.up.railway.app`
   - No trailing slash
4. **Clear browser cache** - Old JavaScript might be cached
5. **Check Network tab** - See what URL frontend is actually calling

### Frontend Still Calling localhost?

- Make sure `VITE_API_URL` is set in Vercel
- Rebuild frontend after setting variable
- Check browser console for the actual API URL being used

### Backend Not Allowing Origin?

- Check Railway logs for CORS warnings
- Verify `CLIENT_ORIGIN` is set correctly
- Make sure you redeployed after setting the variable

## 📋 Quick Checklist

- [ ] Railway: `CLIENT_ORIGIN` = `https://academic-resource-hub.vercel.app`
- [ ] Vercel: `VITE_API_URL` = `https://academicresourcehub-production.up.railway.app`
- [ ] Railway redeployed
- [ ] Vercel redeployed
- [ ] Tested in browser - no CORS errors
- [ ] API calls working (signup/login)

## 🎉 Summary

**Backend (Railway):**
- Set `CLIENT_ORIGIN` to your Vercel URL
- CORS is already configured to allow it

**Frontend (Vercel):**
- Set `VITE_API_URL` to your Railway URL
- Frontend will use this instead of localhost

After both are set and redeployed, CORS should work perfectly!

