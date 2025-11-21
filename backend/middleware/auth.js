import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET, JWT_EXPIRES_IN = '7d' } = process.env;

if (!JWT_SECRET) {
  throw new Error(
    'JWT_SECRET is missing. Please set it in your environment variables (see .env.example).',
  );
}

export const signToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const authenticateRequest = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.auth = decoded;
    return next();
  } catch (error) {
    console.error('Invalid auth token', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

