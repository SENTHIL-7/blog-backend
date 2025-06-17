import express  from "express";
import router from "./routers/v1.js"
import cors from "cors";
import helmet from 'helmet';
import passport from 'passport';
import {decrypt} from './services/crypto.service.js';
const app = express();

// disable `X-Powered-By` header that reveals information about the server
// app.disable('x-powered-by');
app.use(helmet());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


// Initialize passport for authentication
app.use(passport.initialize());

// Middleware to decrypt the authorization header
app.use(function (req, res, next) {
  if (req && req.headers && req.headers.authorization) {
    req.headers.authorization = decrypt(req.headers.authorization);
  }
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.use('/v1',router);  

export default app;