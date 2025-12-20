import express from "express";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials" });
  }
});

router.post("/", async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Error adding testimonial" });
  }
});

export default router;
