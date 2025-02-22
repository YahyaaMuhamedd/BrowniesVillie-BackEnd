const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },  // Payload
        process.env.JWT_SECRET,                   // Secret Key
        { expiresIn: process.env.JWT_EXPIRES_IN } // Expiry Time
    );
};

module.exports = generateToken;
