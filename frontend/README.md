# Academic Resource Hub - Frontend

React + Vite frontend application for the Academic Resource Hub.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your backend API URL:
```
VITE_API_URL=http://localhost:5001
```

For production, set this to your deployed backend URL:
```
VITE_API_URL=https://your-backend-api.com
```

## Running

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Environment Variables

- `VITE_API_URL` - Backend API URL (required)

## Tech Stack

- React 19
- Vite
- React Router
- Framer Motion
- Lucide Icons

