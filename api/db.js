import pkg from 'pg';
import dotenv from 'dotenv';

//load our env variables
dotenv.config();

const { Pool } = pkg;

//pool to manage our postgres connections
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  
  //ssl connections, reject allows connections with self signed 
  ssl: {
    rejectUnauthorized: false,  
  },
});

export default pool;
