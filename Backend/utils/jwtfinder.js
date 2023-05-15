// It is used tpo set the cookies
const setToken = (user, statuscode, res) => {
    const token = user.getJWTToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.Cookie_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.status(statuscode).cookie("token",token,options).json({
        success: true,
        user,
        token,
        
    });
}
module.exports = setToken;