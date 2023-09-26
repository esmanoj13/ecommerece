const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
const middlewareErrorhandler=require("./middleware/error");

const product=require("./routers/productRouter");
const user=require("./routers/userRouter");
const order =require("./routers/orderRouter");

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

//This is the use of middleware for error handler
app.use(middlewareErrorhandler);
module.exports=app;
