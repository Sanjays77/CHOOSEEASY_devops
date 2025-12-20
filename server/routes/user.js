import express from "express";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get user profile with populated saved careers
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("savedCareers");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Filter out any null savedCareers (in case referenced careers were deleted)
    user.savedCareers = user.savedCareers.filter((c) => c !== null);

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Save a career
router.post("/save-career/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isAlreadySaved = user.savedCareers.some(
      (careerId) => careerId.toString() === id
    );

    if (!isAlreadySaved) {
      user.savedCareers.push(id);
      await user.save();
    }

    res.status(200).json({
      message: "Career saved successfully",
      savedCareers: user.savedCareers,
    });
  } catch (error) {
    console.error("Error saving career:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Unsave a career
router.delete("/save-career/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedCareers = user.savedCareers.filter(
      (careerId) => careerId.toString() !== id
    );
    await user.save();

    res.status(200).json({
      message: "Career removed successfully",
      savedCareers: user.savedCareers,
    });
  } catch (error) {
    console.error("Error removing career:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Record a visit
router.post("/visit", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    if (!user.visitHistory.includes(today)) {
      user.visitHistory.push(today);
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Visit recorded", visitHistory: user.visitHistory });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
