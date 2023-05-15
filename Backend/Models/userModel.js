const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require ("crypto");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the name"],
        maxlength: [30, "Name should not be greater than 30 characters"],
        minlength: [4, "name shoud be greater than 6"],
    },
    email: {
        type: String,
        required: [true, "please enter the email"],
        //This is used for we can be choose single value
        unique: true,
        validate: [validator.isEmail, 'invalid email'],
    },
    password: {
        type: String,
        required: [true, "please enter the password"],
        minlength: [8, "Password shoud be greater than 8"],
        // this can be used for that we can not be choose this password in find method(so we canot be 
        //choose password when we select all the elements)
        Select: false
    },
    avatar: {
        productId: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
  
    role: {
        type: String,
        default: "user"
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        
    },
    resetpasswordtoken: String,
    resetpasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SCRET, { expiresIn: process.env.JWT_EXPIRE })
}
// Compare the password
userSchema.methods.comparepassword = async function (enterpassword) {
    return await bcrypt.compare(enterpassword, this.password);
};
//reset password
userSchema.methods.getresetpasswordToken = function(){
    //Generating token
    const tokencrypto = crypto.randomBytes(10).toString("hex");
    //Generating and hasing the user schema
    this.resetpasswordtoken = crypto.createHash("sha256").update(tokencrypto).digest("hex");
    this.resetpasswordExpire= Date.now() + 3 * 55 * 60 * 1000;
    return  tokencrypto;  
};

module.exports = mongoose.model("User", userSchema);