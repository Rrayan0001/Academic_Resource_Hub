import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { ensureDatabase } from './db/schema.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
// Support multiple origins (comma-separated) or single origin
const getClientOrigins = () => {
  const origins = process.env.CLIENT_ORIGIN || 'http://localhost:4000';
  return origins.split(',').map(origin => origin.trim());
};

const CLIENT_ORIGINS = getClientOrigins();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list
      if (CLIENT_ORIGINS.includes(origin) || CLIENT_ORIGINS.includes('*')) {
        return callback(null, true);
      }
      
      // For development, allow localhost
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
      
      // Log CORS rejection for debugging
      console.warn(`⚠️  CORS blocked origin: ${origin}. Allowed origins:`, CLIENT_ORIGINS);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'Academic Resource Hub API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
      },
    },
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await ensureDatabase();
    console.log('Database connection established');
  } catch (error) {
    console.error('⚠️  Database connection failed:', error.message);
    console.error('⚠️  Server will start but database operations will fail');
    console.error('⚠️  Please update DATABASE_URL in .env file with your Neon connection string');
  }
  
  app.listen(PORT, () => {
    console.log(`✅ API server ready on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
