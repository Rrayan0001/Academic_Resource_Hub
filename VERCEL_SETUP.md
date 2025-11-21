# Vercel Deployment Setup

## Option 1: Set Root Directory in Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard: https://vercel.com
2. Click on your project: **Academic Resource Hub**
3. Go to **Settings** tab
4. Scroll down to **Root Directory**
5. Click **Edit**
6. Set it to: `frontend`
7. Click **Save**

This tells Vercel to treat the `frontend/` folder as the root of your application.

## Option 2: Use vercel.json Configuration

The `vercel.json` file in the root directory tells Vercel:
- Build command: `cd frontend && npm install && npm run build`
- Output directory: `frontend/dist`
- Install command: `cd frontend && npm install`

Vercel should automatically detect and use this configuration.

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

