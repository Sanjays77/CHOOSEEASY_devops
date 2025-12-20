import express from "express";
import TestResult from "../models/TestResult.js";
import User from "../models/User.js";

const router = express.Router();

// POST /api/test-results/submit
router.post("/submit", async (req, res) => {
  try {
    const { userId, answers, categoryScores, recommendedCareer, details } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Count previous attempts
    const previousAttempts = await TestResult.countDocuments({ user: userId });

    const newTestResult = new TestResult({
      user: userId,
      attemptNumber: previousAttempts + 1,
      answers,
      categoryScores,
      recommendedCareer,
      details
    });

    const savedResult = await newTestResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    console.error("Error saving test result:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/test-results/history/:userId
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await TestResult.find({ user: userId }).sort({ testDate: -1 });
    res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
