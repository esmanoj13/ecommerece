class Errorhandler extends Error{
    constructor(statusCode,message){
    super(message);
    this.statusCode=statusCode;
    Error.captureStackTrace(this, this.constructor);
      // this is used for the a string that represents the location
    // of that particular error in the call. It gives us a stack that helps us to find the location of that error 
    //in the code at which new Error() was Called. this will help us to find the exact error in our code.
}
}
module.exports=Errorhandler;