import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Record visit
    const today = new Date().toISOString().split("T")[0];
    result.visitHistory.push(today);
    await result.save();

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    // Enforce role check
    const userRole = existingUser.role || "user";
    if (userRole !== role) {
      return res.status(403).json({
        message: `Access denied. Please login as ${
          role === "admin" ? "Administrator" : "User"
        }.`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Record visit
    const today = new Date().toISOString().split("T")[0];
    if (!existingUser.visitHistory.includes(today)) {
      existingUser.visitHistory.push(today);
      await existingUser.save();
    }

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
