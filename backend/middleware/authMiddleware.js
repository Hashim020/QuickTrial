import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      // Verify token and decode user information
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user by ID from the decoded token and attach to req.user
      req.user = await User.findById(decoded.id).select('-password'); 
      console.log(req.user)

      // Check if user exists in the database
      if (req.user===null) {
        return res.status(404).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
