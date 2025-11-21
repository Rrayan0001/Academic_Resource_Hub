# Academic Resource Hub

A collaborative platform where students showcase their projects, share knowledge, and inspire the next generation of innovators.

## Project Structure

This project is split into two separate parts that can be deployed independently:

- **Frontend** - React + Vite application (see `frontend/` directory)
- **Backend** - Express API server (see `backend/` directory)

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL:
```
VITE_API_URL=http://localhost:5001
```

For production, set this to your deployed backend URL:
```
VITE_API_URL=https://your-backend-api.com
```

## Running Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

The built files will be in the `frontend/dist/` directory.

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. See the [backend README](./backend/README.md) for detailed setup instructions.

## Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- etc.

Make sure to set the `VITE_API_URL` environment variable in your hosting platform.

### Backend Deployment
The backend can be deployed to:
- Railway
- Render
- Heroku
- AWS EC2/Lambda
- DigitalOcean
- etc.

See `backend/README.md` for backend-specific deployment instructions.

## Features

- 🔐 Authentication with JWT
- 👥 Role-based access (Student, Teacher, Visitor)
- 📚 Project library
- 📤 Project upload
- 🎓 Faculty dashboard
- 🎨 Modern, responsive UI

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Framer Motion
- Lucide Icons

### Backend
- Express.js
- Neon PostgreSQL
- JWT Authentication
- bcryptjs
