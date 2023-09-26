const Errorhandler = require("../utils/errorhandler");
const User = require("../Models/userModel");
const asyncerror = require("../middleware/catchasyncerror");
const jwttoken = require("../utils/jwtfinder");
const sendemail = require("../utils/sendemail");
const crypto = require("crypto");
const setToken = require("../utils/jwtfinder");

exports.registeruser = asyncerror(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name, email, password,
    avatar: {
      productId: "user_id",
      url: "user_image",
    },
  });
  jwttoken(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   // Previously we use user but after use jwt we change to token
  //   // Because now we sent token
  //   // user,
  //   token,
  // });
});

// login user
exports.loginUser = asyncerror(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler(400, "please enter the email and password"));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler(401, "First regester yourself"));
  }
  const ispasswordsame = await user.comparepassword(password);
  // const ispasswordsame = userSchema.methods.comparepassword = async function (enterpassword) => {
  //   return await bcrypt.compare(enterpassword, this.password);
  // }

  if (!ispasswordsame) {
    return next(new Errorhandler(401, "please enter the email and password"));
  }
  jwttoken(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//logout user

exports.logoutuser = asyncerror(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "user is logout",
  });
});
// Forgot password
exports.forgotpassword = asyncerror(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Errorhandler(404, "User is not found"));
  }
  const gettoken = user.getresetpasswordToken();
  await user.save({ validateBeforeSave: false });
  const url = `${req.prototype}//:${req.get("host")}/api/v1/password/reset/${gettoken}`;
  const message = `your new password created successfully please click on the below link /n/n ${url}`
  try {
    await sendemail({
      email: user.email,
      subject: "Ecommerece password recovery",
    });
    res.status(200).json({
      success: true,
      message: `${message} /n/n ${user.email}`
    });
  } catch (error) {
    user.resetpasswordtoken = undefined,
      user.resetpasswordExpire = undefined,
      await user.save({ validateBeforeSave: false });
    return next(new Errorhandler(500, error.message));
  }

});
// reset password
exports.resetpassword = asyncerror(async (req, res, next) => {
  // creating token hash
  const resetpasswordtoken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetpasswordtoken,
    resetpasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new Errorhandler(404, "User is not found"));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new Errorhandler(400, "please match password"));
  }
  user.password = req.body.password;
  user.resetpasswordtoken = undefined;
  user.resetpasswordExpire = undefined;
  await user.save();
  jwttoken(user, 201, res);

});
// get the user details
exports.getuserdetails = asyncerror(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })

});


// Change the user password
exports.changePassword = asyncerror(async (req, res, next) => {
  // Here +password is ussed because in user we does not select the password
  const user = await User.findById(req.user.id).select("+password");
  const ispasswordMatch = await user.comparePassword(req.body.oldPassword);
  if (!ispasswordMatch) {
    return next(new Errorhandler(404, "Password does not match"));
  };
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler(404, "password does not match"));
  };
  user.password = user.newPassword;
  await user.save();
  setToken(user, 201, res);
});
//update the user details
exports.changeuserdetails = asyncerror(async (req, res, next) => {

  const newDetails = {
    name: req.body.name,
    email: req.body.email,
  }
  const user = await User.findByIdAndUpdate(req.user.id, newDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true,
    user
  })
});
//In this we get all user by admin so admin can easily check these users detail without seeing password.
exports.getallusers = asyncerror(async (req, res, next) => {
  //find method given the all the user whose are sign in in the website. 
  const users = await User.find();
  console.log(users);
  if (!users) {
    return next(new Errorhandler(401, " We not get any users"));
  }
  res.status(201).json({
    success: true,
    users,
  });
});
//In this we get single user by admin so admin can easily check this user detail without seeing password.
exports.getsingleUser = asyncerror(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Errorhandler(401, " We not get any users"));
  }
  res.status(201).json({
    success: true,
    user,
  });
});

// Update the role of a person
exports.changeuserRole = asyncerror(async (req, res, next) => {

  const newDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }
  const user = await User.findByIdAndUpdate(req.params.id, newDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user
  });
});
// delete user
exports.deleteuser = asyncerror(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new Errorhandler(404, "User is not found"))
  }
  // await user.remove();
  res.status(200).json({
    success: true,
  });
});

