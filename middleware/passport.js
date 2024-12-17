
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import CONFIG from "../config/config.js";
export default (passport) => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;

  passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log('jwt_payloadq',jwt_payload)
    if (jwt_payload) {
      console.log('jwt_payload: ', jwt_payload);
      return done(null, jwt_payload);
    } else {
      console.log('jwt_payload else: ');
      return done(null, false);
    }
  }));
}