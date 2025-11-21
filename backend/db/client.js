import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

// Create a safe SQL function that handles missing DATABASE_URL
let sql;

if (!connectionString) {
  console.warn('⚠️  DATABASE_URL is not set. Database operations will fail.');
  console.warn('⚠️  Please set DATABASE_URL in Railway environment variables.');
  // Create a mock sql function that throws helpful errors
  sql = async () => {
    throw new Error(
      'DATABASE_URL is not set. Please set it in Railway environment variables.',
    );
  };
} else {
  sql = neon(connectionString);
}

export { sql };

