# Railway DNS Domain Not Resolving - Fix Guide

## 🔍 Problem

Error: `DNS_PROBE_FINISHED_NXDOMAIN`

The domain `academicresourcehub-production.up.railway.app` exists in Railway but DNS is not resolving.

## ✅ Solutions

### Solution 1: Verify Domain is Active in Railway

1. Go to **Railway** → Your service → **Settings** → **Networking** tab
2. Check the **Public Networking** section
3. Make sure the domain shows:
   - ✅ Domain is listed
   - ✅ Status is "Active" or "Enabled"
   - ✅ Not "Pending" or "Inactive"

### Solution 2: Regenerate Domain (If Needed)

If the domain shows as inactive:

1. In Railway → **Networking** tab
2. Click the **"Delete"** icon (trash can) on the existing domain
3. Click **"Generate Domain"** or the **"+"** button
4. Railway will create a new domain
5. Copy the new domain name
6. Update Vercel `VITE_API_URL` with the new domain

### Solution 3: Wait for DNS Propagation

DNS can take **5-15 minutes** to propagate globally.

**Check if it's working:**
```bash
# Test in terminal
curl https://academicresourcehub-production.up.railway.app/api/health

# Or test in browser
https://academicresourcehub-production.up.railway.app/api/health
```

### Solution 4: Check Railway Service Status

1. Go to Railway → Your service
2. Make sure status shows **"Deployed"** (green)
3. Check **Logs** tab - should show "API server ready"
4. If service is stopped, click **"Deploy"**

### Solution 5: Use Railway's Default Domain

Railway might have generated a different domain format:

1. Go to Railway → **Networking** tab
2. Look for any domain listed (might be different format)
3. Common formats:
   - `your-service-name.up.railway.app`
   - `random-hash.up.railway.app`
   - `project-name-production.up.railway.app`

## 🎯 Quick Fix Steps

### Step 1: Check Railway Networking

1. Railway → Your service → **Settings** → **Networking**
2. Verify domain exists and is active
3. If not active, delete and regenerate

### Step 2: Wait 5-10 Minutes

DNS propagation can take time. Wait a few minutes and try again.

### Step 3: Test Different Ways

**Option A: Test in Terminal**
```bash
curl https://academicresourcehub-production.up.railway.app/api/health
```

**Option B: Test in Browser**
- Open: `https://academicresourcehub-production.up.railway.app/api/health`
- Should show: `{"status":"ok",...}`

**Option C: Test with IP (if Railway provides it)**
- Some Railway services show an IP address
- You can test with IP directly (though not recommended for production)

### Step 4: Verify Service is Running

1. Railway → **Logs** tab
2. Should see: `✅ API server ready on http://localhost:8080`
3. If logs are empty, service might not be running

## 🆘 If Nothing Works

### Alternative: Use Railway's Service URL

1. Go to Railway → Your service
2. Look for **"Service URL"** or **"Public URL"** in the overview
3. Railway might show a different URL format
4. Use that URL instead

### Check Railway Documentation

Railway domains might need:
- Service to be running ✅ (you have this)
- Public networking enabled ✅ (you have this)
- DNS propagation time (wait 5-15 minutes)

## 📋 Checklist

- [ ] Railway service is "Deployed" (green status)
- [ ] Railway logs show "API server ready"
- [ ] Domain exists in Railway Networking tab
- [ ] Domain status is "Active" (not pending)
- [ ] Waited 5-15 minutes for DNS propagation
- [ ] Tested domain in browser/curl
- [ ] Checked for alternative Railway domain format

## 💡 Most Likely Solution

**Wait 5-15 minutes** - DNS propagation is usually the issue. Railway domains can take time to become globally accessible.

If after 15 minutes it still doesn't work:
1. Delete the domain in Railway Networking
2. Generate a new domain
3. Update Vercel `VITE_API_URL` with the new domain
4. Wait another 5-10 minutes

