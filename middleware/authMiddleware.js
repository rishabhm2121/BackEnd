const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send("No token provided.");

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token.");
    req.user = decoded;
    next();
  });
};
