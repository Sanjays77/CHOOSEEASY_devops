import express from "express";
import mongoose from "mongoose";
import Career from "../models/Career.js";
import { fetchCareerByCode, searchCareers } from "../services/onetService.js";
import { auth, admin } from "../middleware/auth.js";

const router = express.Router();

// Get all careers
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json(careers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get single career by ID
router.get("/:id", async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.status(200).json(career);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Add a career (Admin)
router.post("/", auth, admin, async (req, res) => {
  const career = req.body;
  const newCareer = new Career(career);
  try {
    await newCareer.save();
    res.status(201).json(newCareer);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// Update a career (Admin)
router.put("/:id", auth, admin, async (req, res) => {
  const { id } = req.params;
  const career = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No career with that id');

  const updatedCareer = await Career.findByIdAndUpdate(id, career, { new: true });

  res.json(updatedCareer);
});

// Delete a career (Admin)
router.delete("/:id", auth, admin, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No career with that id');

  await Career.findByIdAndDelete(id);

  res.json({ message: 'Career deleted successfully' });
});

// Import from O*NET (Admin)
router.post("/import/:onetCode", auth, admin, async (req, res) => {
  const { onetCode } = req.params;
  try {
    const onetData = await fetchCareerByCode(onetCode);

    if (!onetData) {
      return res
        .status(400)
        .json({
          message:
            "Could not fetch data from O*NET. Check credentials or code.",
        });
    }

    // Check if already exists
    let career = await Career.findOne({ onetCode });
    if (career) {
      return res.status(200).json({ message: "Career already exists", career });
    }

    // Create new career from O*NET data
    const newCareer = new Career({
      title: onetData.title,
      description: onetData.description || "Imported from O*NET",
      category: "General", // Default, or map from O*NET Job Family
      onetCode: onetCode,
    });

    await newCareer.save();
    res.status(201).json(newCareer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search O*NET (Proxy)
router.get("/search/onet", async (req, res) => {
  const { keyword } = req.query;
  try {
    const results = await searchCareers(keyword);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
