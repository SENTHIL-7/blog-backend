import bcrypt_p from 'bcrypt-promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { encrypt } from '../services/crypto.service.js'
import  {ERROR}  from '../constants/messages.js';
import CONFIG from '../config/config.js';
export default (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email :{
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    tableName: 'authors',
    schema: 'auth',
  });

  author.associate = function (models) {
    this.hasMany(models.article, {
      // Optional: Add more configuration
      foreignKey: 'author_id', // Specify the foreign key
      as: 'articles'           // Optional alias for easier querying
    });
  
  };
  //Class level methods to making the encrypted password and save this.
  author.beforeSave(async (user, options) => {
    let err;
    // Hash the password if it has been changed or is new
    if (user.changed('password')) {
      let salt, hash;
      // Asynchronously generates a salt.
      // Randomly select rounds(b/w 4-10) for generating hash
      let rounds = Math.floor(Math.random() * 6 + 4);
      console.log('Rounds: ', rounds); // 5, 6, 7, 8, 9, 10
      try{
        salt = await bcrypt.genSalt(rounds);
        console.log('Salt: ', salt);
      }
      catch(error){
        // logger.error('error in encryption in user account' + err.message);
        console.log('error in encryption in user account' + err.message);
      }
      try{
        //Asynchronously generates a hash with salt
        hash = await bcrypt.hash(user.password, salt);
        console.log('Hash: ', hash);
      } catch (error) {
        // logger.error('error in hash method in encryption' + err.message);
        console.log('error in hash method in encryption' + err.message);
      }
      user.password = hash;
    }
  });
  //Instance level methods to compare the password
  author.prototype.comparePassword = async function (userInputPassword) {
    let pass;
    if (!this.password) throw new Error(ERROR.password_notset);

    try{
      //Password verification
      pass = await bcrypt_p.compare(userInputPassword, this.password);
    }
    catch(error){
      new Error(error)
    }
    if (!pass) throw new Error(ERROR.invalid_credentials);

    return this;
  };
  //Instance level methods to get the jsonWebToken
  author.prototype.getJWT = async function () {
    let  encryptedToken;
    //return the signature for given payload and secretkey
    const token = "Bearer " + jwt.sign({
      id: this.id,
      email: this.email,
    }, CONFIG.jwt_encryption, { expiresIn: CONFIG.jwt_expiration });
    console.log('Token: ', token);
    try{
      //Encrypt the token
      encryptedToken = await encrypt(token);
    } catch (error) {
      throw new Error(error)
    }
    return encryptedToken;
  };
  return author;
}
