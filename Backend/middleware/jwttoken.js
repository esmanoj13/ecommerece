const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Unautorised user"
        })
    }
    try {
        // Verify the token with the secret key
        const decodedToken = jwt.verify(token, secretKey);
        // Add the decoded token to the request object
        req.userData = { userId: decodedToken.id, email: decodedToken.email };
        next();
  } catch (error) {
    return res.status(401).json({ message: 'Authorization failed: Invalid token' });  
    }
};