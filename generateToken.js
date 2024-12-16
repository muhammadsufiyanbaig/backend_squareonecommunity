
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        // ...other user properties...
    };

    const secret = 'your_jwt_secret'; // Replace with your actual secret key
    const options = {
        expiresIn: '1h', // Token expiration time
    };

    return jwt.sign(payload, secret, options);
}

module.exports = generateToken;