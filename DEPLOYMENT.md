# Deployment Guide

This guide explains how to deploy the frontend and backend separately.

## Backend Deployment

### Step 1: Prepare Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```env
DATABASE_URL=your-neon-connection-string
JWT_SECRET=your-jwt-secret
PORT=5001
CLIENT_ORIGIN=https://your-frontend-url.com
```

### Step 2: Deploy Backend

**Option A: Railway**
1. Connect your GitHub repository
2. Select the `backend` folder as the root
3. Add environment variables
4. Deploy

**Option B: Render**
1. Create a new Web Service
2. Connect your repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

**Option C: Heroku**
```bash
cd backend
heroku create your-app-name
heroku config:set DATABASE_URL=your-neon-url
heroku config:set JWT_SECRET=your-secret
heroku config:set CLIENT_ORIGIN=https://your-frontend-url.com
git subtree push --prefix backend heroku main
```

### Step 3: Get Backend URL

After deployment, note your backend URL (e.g., `https://your-backend.railway.app`)

## Frontend Deployment

### Step 1: Prepare Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create `.env` file:
```env
VITE_API_URL=https://your-backend-url.com
```

3. Build the frontend:
```bash
npm run build
```

### Step 2: Deploy Frontend

**Option A: Vercel**
1. Connect your GitHub repository
2. Set root directory to `frontend`
3. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.com`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

**Option B: Netlify**
1. Connect your GitHub repository
2. Set base directory to `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.com`
6. Deploy

**Option C: GitHub Pages**
1. Navigate to frontend directory: `cd frontend`
2. Install `gh-pages`: `npm install --save-dev gh-pages`
3. Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
4. Set `VITE_API_URL` in GitHub Secrets
5. Deploy: `npm run deploy`

## Environment Variables Summary

### Backend (.env in backend/)
- `DATABASE_URL` - Neon PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT tokens
- `PORT` - Server port (default: 5001)
- `CLIENT_ORIGIN` - Frontend URL for CORS

### Frontend (.env in frontend/)
- `VITE_API_URL` - Backend API URL

## Testing Deployment

1. Test backend health endpoint:
```bash
curl https://your-backend-url.com/api/health
```

2. Test frontend:
   - Visit your frontend URL
   - Try logging in
   - Verify API calls work

## Troubleshooting

### CORS Issues
- Make sure `CLIENT_ORIGIN` in backend matches your frontend URL exactly
- Include protocol (https://) and no trailing slash

### API Not Found
- Verify `VITE_API_URL` is set correctly in frontend
- Check that backend is running and accessible
- Ensure backend routes start with `/api`

### Environment Variables Not Working
- For Vite, variables must start with `VITE_`
- Rebuild frontend after changing environment variables
- Check that variables are set in your hosting platform

