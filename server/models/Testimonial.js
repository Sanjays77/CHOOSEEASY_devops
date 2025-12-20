import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g., Student, Professional
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Testimonial", testimonialSchema);
