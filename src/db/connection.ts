import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
    process.exit(-1);
});

export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected');
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  } 
}