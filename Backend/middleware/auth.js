const Errorhandler = require("../utils/errorhandler");
const asyncerror = require("./catchasyncerror");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

exports.isauth = asyncerror(async (req, res, next) => {
    const { token } = req.cookies;    
    if (!token) {
        return next(new Errorhandler(401, "Please enter coerect details"));
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SCRET);
    req.user = await User.findById(decodedToken.id);
    next();
});
exports.authorizerole = (...roles) => {
    return (req, res, next) => {
        console.log(roles);
        console.log(req.user.role);
        if (!roles.includes(req.user.role)) {
            return next(new Errorhandler(403, `Role:${req.user.role} is not authorised`));
        }
        next();
    };
};