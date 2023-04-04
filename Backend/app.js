const express=require("express");
const app=express();
const middlewareErrorhandler=require("./middleware/error")
app.use(express.json());
const product=require("./routers/productRouter");
app.use("/api/v1",product);
//This is the use of middleware for error handler
app.use(middlewareErrorhandler);
module.exports=app;
