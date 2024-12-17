import { Sequelize } from 'sequelize';
import CONFIG from "./config.js"
const sequelize = new Sequelize(
  CONFIG.DB_NAME,
  CONFIG.DB_USER,
  CONFIG.DB_PASSWORD
  ,{
  dialect: CONFIG.DB_DIALECT,
  host: CONFIG.DB_HOST,
  port: CONFIG.DB_PORT,
  ssl: true,
  // clientMinMessages: 'notice',
});
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');

} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default sequelize; 