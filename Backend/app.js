const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
const middlewareErrorhandler=require("./middleware/error")

const product=require("./routers/productRouter");
const user=require("./routers/userRouter");
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",product);
app.use("/api/v1",user);

//This is the use of middleware for error handler
app.use(middlewareErrorhandler);
module.exports=app;
