import 'dotenv/config';
  export default  {
  DB_DIALECT: process.env.DB_DIALECT || 'postgres', 
  PORT: process.env.PORT || 3001,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || 'blogsqdbdev',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  APP : process.env.APP ||'local',
  jwt_encryption : process.env.JWT_ENCRYPTION || 'please_change',
  jwt_expiration : process.env.JWT_EXPIRATION || 1800000,
  // jwtSecret: process.env.JWT_SECRET,
  // jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  secretKey: process.env.SECRET_KEY,
}