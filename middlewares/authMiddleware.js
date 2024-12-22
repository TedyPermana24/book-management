const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized!' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden!' });
    req.user = decoded;
    next();
  });
};

exports.authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden!' });
  next();
};
