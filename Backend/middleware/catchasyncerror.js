// this is used to handle the async error (It is applied to promise catch error)
module.exports=(fn)=>(req,res,next)=>{
    return Promise.resolve(fn(req,res,next)).catch(next);
};