const express = require('express');
const { registeruser,
    loginUser,
    logoutuser,
    forgotpassword,
    resetpassword,
    getuserdetails,
    changePassword,
    changeuserdetails,
    getallusers,
    getsingleUser,
    changeuserRole,
    deleteuser
} = require('../Controller/userController');
const router = express.Router();
const { isauth, authorizerole } = require("../middleware/auth");

router.route("/register").post(registeruser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/reset/:token").post(resetpassword);
router.route("/logout").put(logoutuser);
router.route("/me").get(isauth, getuserdetails);
router.route("/password/update").put(isauth, changePassword);
router.route("/me/update").put(isauth, changeuserdetails);
router.route("/admin/users").get(isauth, authorizerole("admin"), getallusers);
router.route("/admin/user/:id").get(isauth, authorizerole("admin"), getsingleUser)
.put(isauth,authorizerole("admin"),changeuserRole)
.delete(isauth,authorizerole("admin"),deleteuser);

module.exports = router;
