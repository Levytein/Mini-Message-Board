import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

/*const pool = new Pool({
  host: process.env.HOST, 
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.DATA,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined 
});*/
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
export default pool;