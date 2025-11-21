# Academic Resource Hub - Backend API

Backend API server for the Academic Resource Hub application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Neon database connection string and JWT secret.

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Environment Variables

- `DATABASE_URL` - Neon PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (default: 5001)
- `CLIENT_ORIGIN` - Frontend URL for CORS (can be comma-separated for multiple origins)
  - Default: `http://localhost:4000`
  - Production: `https://academic-resource-hub.vercel.app`
  - Example for multiple: `https://academic-resource-hub.vercel.app,http://localhost:4000`

**Important**: The backend now supports multiple origins. Set `CLIENT_ORIGIN` to your Vercel frontend URL in production.

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires authentication)

