import CONFIG from "./config/config.js"
import app from "./app.js" ;
app.listen(CONFIG.PORT, () => console.log("Server running on port ",CONFIG.PORT));

process.on('unhandledRejection', error => {
  console.error('Uncaught Error', error);
});