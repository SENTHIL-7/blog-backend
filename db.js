import pg from 'pg'
const { Pool } = pg
import config from "./config/config.js"

// export const pool = new Pool({
//   user: '',
//   password: 'root',
//   host: 'localhost',
//   port: 5432, // default Postgres port
//   database: 'blogtest'
// });

export const pool = new Pool({
  user: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  port: config.dbPort, // default Postgres port
  database: config.dbName
});

 
// console.log(await pool.query('SELECT NOW()'))