import fs from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath,pathToFileURL } from 'url';
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import CONFIG from '../config/config.js';

const __filename = fileURLToPath(import.meta.url); // 'E:\\project\\blogBackend\\models\\index.js'
const __dirname = dirname(__filename); // models
const base = basename(__filename); // index.js
const db = {};
const files = fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== base) && (file.slice(-3) === '.js'));

await Promise.all(files.map(async file => {
  try {
    // Use relative import
    const modelPath = pathToFileURL(join(__dirname, file)).href;
    console.log(modelPath);
    const modelModule = await import(modelPath);
    
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
  } catch (error) {
    console.error(`Error importing model from ${file}:`, error);
  }
}));
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
if(CONFIG.APP === 'local'){
  try{
    await db.sequelize.sync(); 
    console.log('Database Synced');
  }
  catch(error){
    console.log(error); 
  }
}
export default {
  db,
};