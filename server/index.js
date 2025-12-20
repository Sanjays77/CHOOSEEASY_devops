import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import careerRoutes from "./routes/careers.js";
import feedbackRoutes from "./routes/feedback.js";
import testimonialRoutes from "./routes/testimonials.js";
import testResultRoutes from "./routes/testResults.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";
import contactRoutes from "./routes/contact.js";
import questionRoutes from "./routes/questions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/test-results", testResultRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", (req, res) => {
  res.send("CHOOSEEASY API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
