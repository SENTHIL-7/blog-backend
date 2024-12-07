import 'dotenv/config';
  export default  {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  // jwtSecret: process.env.JWT_SECRET,
  // jwtExpiration: process.env.JWT_EXPIRATION,
  // jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  //  export default config;
}