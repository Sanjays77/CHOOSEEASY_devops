import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  savedCareers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Career" }],
  visitHistory: [{ type: String }], // Stores dates as "YYYY-MM-DD"
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

export default mongoose.model("User", userSchema);
