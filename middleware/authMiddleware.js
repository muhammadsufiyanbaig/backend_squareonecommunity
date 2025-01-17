const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.body.token || req.query.token;
  console.log('Received token:', token);
  
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(403).json({ error: 'Token is invalid or expired' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
