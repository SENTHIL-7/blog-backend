import { ERROR } from '../constants/messages.js';
import validator from 'validator';
import { findOne } from './author.service.js';

const authUser = async function (authorAccountInfo) {
  let emailId = authorAccountInfo.email;
  let authorData;
  //Check the given email is valid email
  if (validator.isEmail(emailId)) {
    try {
      authorData = await findOne({
        where: {
          email: emailId,
        },
      });
    }
    catch (err) {
      throw new Error(err.message);
    }
    if (!authorData) {
      throw new Error(ERROR.invalid_credentials);
    }
  } else {
    throw new Error(ERROR.invalid_email);
  }
    //For comparing the given password to the user instance
    try {
      authorData = await authorData.comparePassword(authorAccountInfo.password);
    }
    catch (err) {
      throw new Error(err.message);
    }


  return authorData;
}
export default authUser;