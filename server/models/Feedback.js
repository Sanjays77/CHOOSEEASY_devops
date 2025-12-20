import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number },
  mood: { type: String },
  categories: [{ type: String }],
  feeling: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", feedbackSchema);
