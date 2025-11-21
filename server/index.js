import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { ensureDatabase } from './db/schema.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:4000';

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await ensureDatabase();
app.listen(PORT, () => {
      console.log(`API server ready on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
