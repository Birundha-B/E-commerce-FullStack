const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check if the Authorization header is provided
  const token = req.headers.authorization?.split(' ')[1];  // Get token from 'Authorization: Bearer token'

  if (!token) {
    return res.status(401).json({ msg: "No token provided, access denied" });
  }

  try {
    // Verify the token using your JWT secret (must match the secret used when creating the token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is in your .env file
    req.user = decoded;  // Attach the decoded token to the request object (so it can be used in the route handler)
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return 401 Unauthorized error
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
