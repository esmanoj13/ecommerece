// This file is used for establish the connection in server
const app =require("./app");
const dotenv = require("dotenv");
const connectTodb=require("./config/database")
//config

dotenv.config({path:"Backend/config/config.env"});
// Connecting the database (this is used after the config always)
connectTodb();
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on ${port}`));
//const port = process.env.PORT || 3000;
// This is used when we not making seperate env file------------------
// const server = require('http').createServer();
// const port = process.env.PORT || 3000;

