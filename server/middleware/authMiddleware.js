const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-123';

const protect = (req, res, next) => {
  // Read token from the httpOnly cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach decoded payload to request object
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed or expired.'
    });
  }
};

module.exports = { protect, SECRET_KEY };
