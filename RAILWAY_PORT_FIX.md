# Railway Port Configuration Fix

## 🔍 Issue Found

Your Railway domain shows:
- Domain: `academicresourcehub-production.up.railway.app`
- Port: `8080` (as shown in Railway Networking)

But your backend might be configured for a different port.

## ✅ Solution: Configure Railway Port

Railway automatically sets the `PORT` environment variable. Your backend should use it.

### Check Your Backend Code

Your `backend/index.js` should have:
```javascript
const PORT = process.env.PORT || 5001;
```

This means:
- Railway will set `PORT` automatically (usually 8080 or similar)
- Your backend will use that port
- ✅ This should work correctly

### If Backend Still Not Working

1. **Check Railway Logs:**
   - Go to Railway → Your service → **Logs** tab
   - Look for: `✅ API server ready on http://localhost:PORT`
   - Note what PORT it's using

2. **Verify Environment Variables:**
   - Railway → Variables tab
   - Make sure `PORT` is NOT manually set (let Railway set it)
   - Or set `PORT=8080` to match Railway's routing

3. **Test the Domain:**
   ```bash
   curl https://academicresourcehub-production.up.railway.app/api/health
   ```

## 🎯 Quick Fix

### Option 1: Let Railway Set PORT (Recommended)

1. In Railway → Variables tab
2. **Remove** any manual `PORT` variable (if it exists)
3. Railway will automatically set `PORT` to match the routing (8080)
4. Redeploy

### Option 2: Set PORT Explicitly

1. In Railway → Variables tab
2. Add/Update:
   - **Name**: `PORT`
   - **Value**: `8080`
3. Redeploy

## ✅ After Fix

Test your Railway URL:
```bash
curl https://academicresourcehub-production.up.railway.app/api/health
```

Should return:
```json
{"status":"ok","timestamp":...}
```

Then update Vercel `VITE_API_URL` to:
```
https://academicresourcehub-production.up.railway.app
```

## 📋 Checklist

- [ ] Railway domain exists: `academicresourcehub-production.up.railway.app`
- [ ] Railway shows port: `8080`
- [ ] Backend code uses `process.env.PORT`
- [ ] Railway service is deployed and running
- [ ] Test Railway URL works: `/api/health` returns OK
- [ ] Vercel `VITE_API_URL` is set correctly
- [ ] Vercel is redeployed

