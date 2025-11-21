# Local Development Setup

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` directory:
```env
DATABASE_URL=your-neon-postgres-connection-string
JWT_SECRET=your-secret-jwt-key-here
PORT=5001
CLIENT_ORIGIN=http://localhost:4000
```

Start the backend:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

You should see: `API server ready on http://localhost:5001`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` directory (optional for local dev):
```env
VITE_API_URL=http://localhost:5001
```

Start the frontend:
```bash
npm run dev
```

The frontend will run on `http://localhost:4000` (or the port Vite assigns)

## Troubleshooting

### ERR_BLOCKED_BY_CLIENT Error

This error usually means:

1. **Ad Blocker is blocking the request**
   - Disable ad blockers for `localhost`
   - Or add `localhost` to your ad blocker's whitelist
   - Common blockers: uBlock Origin, AdBlock Plus, Privacy Badger

2. **Backend server is not running**
   - Check if backend is running: `lsof -i :5001`
   - Start the backend: `cd backend && npm start`
   - Verify: `curl http://localhost:5001/api/health`

3. **CORS issue**
   - Make sure `CLIENT_ORIGIN` in backend `.env` matches your frontend URL
   - Default: `CLIENT_ORIGIN=http://localhost:4000`

### Backend Won't Start

1. **Missing DATABASE_URL**
   - Create `backend/.env` file
   - Add your Neon PostgreSQL connection string

2. **Missing JWT_SECRET**
   - Add `JWT_SECRET=your-random-secret-key` to `backend/.env`

3. **Port already in use**
   - Change `PORT` in `backend/.env` to a different port
   - Or kill the process using port 5001: `lsof -ti :5001 | xargs kill -9`

### Frontend Can't Connect to Backend

1. **Check API URL**
   - Frontend uses `VITE_API_URL` from `.env` or defaults to `http://localhost:5001`
   - Verify in browser DevTools → Network tab what URL is being called

2. **Backend not running**
   - Make sure backend is started and shows "API server ready"

3. **CORS error in console**
   - Check backend logs for CORS errors
   - Verify `CLIENT_ORIGIN` in backend `.env` matches frontend URL

## Testing

### Test Backend
```bash
curl http://localhost:5001/api/health
```
Should return: `{"status":"ok","timestamp":...}`

### Test Frontend
1. Open `http://localhost:4000` in browser
2. Open DevTools (F12) → Console tab
3. Try to sign up or log in
4. Check Network tab for API calls

