import { sql } from './client.js';

export const ensureDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Cannot initialize database.');
  }
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('visitor', 'student', 'teacher')),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users (email)
    `;
    
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
};

