import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";

// This middleware protects routes (checks if user is logged in)
const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check if token exists in headers
    // Format: "Authorization: Bearer TOKEN_HERE"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. If no token → block access
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 3. Verify token
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // 4. Get user from DB using id inside token
    req.user = await User.findById(decoded.id).select("-password");

    // 5. If user no longer exists
    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // 6. Everything is ok → continue to next middleware/controller
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protect;
