import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.gamer = decoded; // Attach gamer ID to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;