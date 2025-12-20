import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("Auth Middleware: No token provided");
      return res
        .status(401)
        .json({ message: "Authentication failed: No token" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;
    req.userEmail = decodedData?.email;
    console.log(
      `Auth Middleware: Verified user ${req.userId} (${req.userEmail})`
    );
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Authentication failed: Invalid token" });
  }
};

export const admin = async (req, res, next) => {
  try {
    // We need to import User model here to check role
    // Dynamic import to avoid circular dependency issues if any, though standard import is fine usually.
    const User = (await import("../models/User.js")).default;

    const user = await User.findById(req.userId);
    if (user) {
      console.log(
        `Admin Middleware: Checking role for ${user.email}. Role: ${user.role}`
      );
    } else {
      console.log(`Admin Middleware: User not found for ID ${req.userId}`);
    }

    if (user && user.role === "admin") {
      next();
    } else {
      console.log("Admin Middleware: Access denied. Not an admin.");
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
