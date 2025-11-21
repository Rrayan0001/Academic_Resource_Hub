# Vercel Deployment Setup

## ⚠️ IMPORTANT: Set Root Directory in Vercel Dashboard

**You MUST set the Root Directory in Vercel settings for this to work.**

### Step-by-Step Instructions:

1. Go to your Vercel project dashboard: https://vercel.com
2. Click on your project: **Academic Resource Hub**
3. Go to **Settings** tab (gear icon)
4. Scroll down to **General** section
5. Find **Root Directory**
6. Click **Edit** (pencil icon)
7. Enter: `frontend`
8. Click **Save**

**This is REQUIRED** - Vercel needs to know that your frontend code is in the `frontend/` folder.

After setting this:
- Vercel will automatically detect `frontend/package.json`
- It will run `npm install` in the `frontend/` directory
- It will run `npm run build` in the `frontend/` directory
- It will use `frontend/dist` as the output directory

The `vercel.json` file will work once the root directory is set to `frontend`.

## Environment Variables

Make sure to set this in Vercel:

1. Go to **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-public-url.up.railway.app`
   - **Environment**: Production, Preview, Development (select all)
3. Click **Save**

**Important**: Replace `your-railway-public-url.up.railway.app` with your actual Railway public URL (not the `.internal` one).

## After Configuration

1. Vercel will automatically redeploy
2. Check the build logs to ensure it's building from `frontend/`
3. Verify the deployment works at `https://academic-resource-hub.vercel.app`

## Troubleshooting

### Build Fails with "vite: command not found"
- Make sure Root Directory is set to `frontend` in Vercel settings
- Or verify `vercel.json` is in the root directory

### Environment Variables Not Working
- Make sure variable name starts with `VITE_` (required for Vite)
- Rebuild the project after adding environment variables
- Check that variables are set for the correct environment (Production/Preview/Development)

### API Calls Failing
- Verify `VITE_API_URL` is set correctly
- Check that Railway backend is running and accessible
- Verify CORS is configured in Railway backend for your Vercel URL

