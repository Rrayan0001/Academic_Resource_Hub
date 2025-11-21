# Railway Environment Variables Setup

## ⚠️ CRITICAL: Set Environment Variables in Railway

Your Railway deployment is failing because `DATABASE_URL` is not set.

## 🎯 Quick Fix (2 Minutes)

### Step 1: Get Your Neon Database Connection String

1. Go to **https://console.neon.tech**
2. Click on your project
3. Go to **"Connection Details"** or **"Connection String"**
4. Copy the connection string (looks like):
   ```
   postgresql://user:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### Step 2: Set Environment Variables in Railway

1. Go to **https://railway.app**
2. Click on your **project**
3. Click on your **service** (the backend one)
4. Click on **"Variables"** tab (or **"Environment"** tab)
5. Click **"+ New Variable"** or **"Add Variable"**

Add these variables one by one:

#### Variable 1: DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: Paste your Neon connection string
- Click **"Add"** or **"Save"**

#### Variable 2: JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: Generate a random string (you can use: `openssl rand -base64 32` or any random string)
- Example: `my-super-secret-jwt-key-12345`
- Click **"Add"** or **"Save"**

#### Variable 3: CLIENT_ORIGIN
- **Name**: `CLIENT_ORIGIN`
- **Value**: `https://academic-resource-hub.vercel.app`
- Click **"Add"** or **"Save"**

#### Variable 4: PORT (Optional)
- **Name**: `PORT`
- **Value**: `5001`
- (Railway usually sets this automatically, but you can set it explicitly)

### Step 3: Redeploy

After adding the variables:
- Railway will **automatically redeploy** your service
- Or you can manually trigger a redeploy from the **"Deployments"** tab

## ✅ Required Environment Variables

| Variable | Description | Example |
|---------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@ep-xxx.aws.neon.tech/db?sslmode=require` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-random-secret-key-here` |
| `CLIENT_ORIGIN` | Your Vercel frontend URL | `https://academic-resource-hub.vercel.app` |
| `PORT` | Server port (optional) | `5001` |

## 🔍 How to Verify

After setting variables and redeploying:

1. Check Railway logs - should show:
   ```
   ✅ Database connection established
   ✅ Database tables initialized successfully
   ✅ API server ready on http://localhost:5001
   ```

2. Test your Railway URL:
   ```bash
   curl https://your-railway-url.up.railway.app/api/health
   ```

3. Should return:
   ```json
   {"status":"ok","timestamp":...}
   ```

## 🆘 Troubleshooting

### "DATABASE_URL is not set" Error

- Make sure you added `DATABASE_URL` in Railway **Variables** tab
- Check that the variable name is exactly `DATABASE_URL` (case-sensitive)
- Verify the connection string is complete (starts with `postgresql://`)
- Redeploy after adding variables

### Database Connection Failed

- Verify your Neon connection string is correct
- Check that your Neon database is active
- Make sure the connection string includes `?sslmode=require`

### CORS Errors

- Verify `CLIENT_ORIGIN` is set to your exact Vercel URL
- No trailing slash: `https://academic-resource-hub.vercel.app` ✅
- Not: `https://academic-resource-hub.vercel.app/` ❌

## 📝 Notes

- Environment variables in Railway are **per-service**
- Changes take effect after redeployment
- Variables are encrypted and secure
- Never commit `.env` files to git (they're in `.gitignore`)

