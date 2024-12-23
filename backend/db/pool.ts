const { Pool } = require("pg");
import * as dotenv from 'dotenv';

dotenv.config();

module.exports = new Pool({
  host: process.env.HOST, 
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.DATA,
  port: process.env.PORT 
});
