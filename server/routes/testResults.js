import express from "express";
import TestResult from "../models/TestResult.js";
import User from "../models/User.js";
import axios from "axios";

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

// POST /api/test-results/ai-recommendation
router.post("/ai-recommendation", async (req, res) => {
  try {
    const { resultId, wish } = req.body;

    if (!resultId) {
      return res.status(400).json({ message: "Test result ID is required" });
    }

    const testResult = await TestResult.findById(resultId);
    if (!testResult) {
      return res.status(404).json({ message: "Test result not found" });
    }

    // Call the Python AI Microservice
    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://localhost:5001";
    
    const payload = {
      answers: testResult.answers,
      categoryScores: testResult.categoryScores,
      recommendedCareer: testResult.recommendedCareer,
      wish: wish || ""
    };

    console.log(`Calling AI microservice at ${aiServiceUrl}/recommend`);
    
    const response = await axios.post(`${aiServiceUrl}/recommend`, payload, {
      headers: { "Content-Type": "application/json" }
    });

    const aiRecommendation = response.data;

    // Save AI recommendation under details.aiRecommendation in TestResult
    testResult.details = {
      ...testResult.details,
      aiRecommendation: aiRecommendation,
      userWish: wish || ""
    };
    
    // Mark mixed type as modified
    testResult.markModified("details");

    const savedResult = await testResult.save();
    res.status(200).json(savedResult);
  } catch (error) {
    console.error("Error generating AI recommendation:", error.response?.data || error.message);
    res.status(500).json({ 
      message: "AI recommendation failed", 
      error: error.response?.data || error.message 
    });
  }
});

export default router;
