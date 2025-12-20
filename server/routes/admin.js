import express from "express";
import User from "../models/User.js";
import Feedback from "../models/Feedback.js";
import TestResult from "../models/TestResult.js";
import { auth, admin } from "../middleware/auth.js";

const router = express.Router();

// Get all users
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User Details (History + Test Results + Feedback + Saved Careers)
router.get("/users/:id", auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password").populate("savedCareers");
    if (!user) return res.status(404).json({ message: "User not found" });

    const testResults = await TestResult.find({ user: user._id }).sort({ testDate: -1 });

    // Find feedback by email
    const feedback = await Feedback.find({ email: user.email }).sort({ createdAt: -1 });

    res.status(200).json({ user, testResults, feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete("/users/:id", auth, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await TestResult.deleteMany({ user: req.params.id }); // Clean up results
    res.status(200).json({ message: "User and related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all feedback
router.get("/feedback", auth, admin, async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
