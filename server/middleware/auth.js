const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({message: 'Access denied. No Token provided'});

  try {
    const decodedPayload = jwt.verify(token, 'secret');
    req.user = decodedPayload;
    next();
  }
  catch (ex) {
    res.status(400).json({ message: 'Invalid Token.'});
  }
}