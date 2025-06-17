import randToken from 'rand-token';
import authUser from '../services/auth.service.js';
import {ERROR} from '../constants/messages.js';
const refreshTokens = {};
const login = async function (req, res) {
  let body = req.body;
  let user,token;
  console.log('body: ', req.body);
  try {
    user = await authUser(body);
    if (user) {
      delete user.dataValues.password;
      var refreshToken = randToken.uid(256);
      refreshTokens[refreshToken] = {
        user: user
      };
      try {
        token = await user.getJWT();
        // res.cookie('authcookie',token,{maxAge:900000,httpOnly:false})
        res.status(200).send({ token, refreshToken, user });
      } catch (error) {
        return res.status(422).send(error);
      }
    }
  }
  catch (error) {
    console.log(error);
    return res.status(422).send(error);
  }
}

const refreshToken = async function (req, res) {
  const rToken = req.body.refreshToken;
  if (rToken in refreshTokens) {
    let token;
    try{
      token = await refreshTokens[rToken].user.getJWT();
      delete refreshTokens[rToken];
      return res.status(200).send({ accessToken: token });
    } catch (error) {
      return res.status(422).send(ERROR.invalid_token)
    }

  } else {
    return res.status(422).send(ERROR.invalid_token);
  }
}

export { login, refreshToken };