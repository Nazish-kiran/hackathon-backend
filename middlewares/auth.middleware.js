import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authUser = async (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // "Bearer <token>"

  // Check if token exists
  if (!token) {
    return res.status(401).json("User not logged in");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user associated with the token
    const user = await userModel.findById(decoded._id);
    
    // If the user is not found
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Attach the user to the request object
    req.user = user;

    // Continue to the next middleware or route handler
    return next();
  } catch (error) {
    // Handle errors in token verification
    res.status(401).json("Invalid or expired token");
  }
};