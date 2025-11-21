import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not set. Please copy .env.example to .env and add your Neon connection string.',
  );
}

export const sql = neon(connectionString);

