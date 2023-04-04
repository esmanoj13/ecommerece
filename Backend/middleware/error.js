// here we use the oops concept Error is the bydefault class of error 
const ErrorHandler = require("../utils/errorhandler");
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //mongoodb cast error
    if(err.name === "CastError"){
        const message=`cast error is created. Invalid ${err.path}`;
       err = new ErrorHandler(400,message);
    };
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // message: err.stack, (It is used to check the error where we find the errors reason)
        // next is the middle ware
}); 
}

