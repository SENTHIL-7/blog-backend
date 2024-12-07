import express  from "express";
import config from "./config/config.js"
import router from "./routers/v1.js"
import cors from "cors";
const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/v1',router);

app.listen(config.port, () => console.log("Server running on port ",config.port));