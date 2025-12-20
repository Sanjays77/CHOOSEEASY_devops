import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testDate: { type: Date, default: Date.now },
  attemptNumber: { type: Number, default: 1 },
  // Detailed answers for each section
  answers: {
    psychometric: { type: Object }, // Question ID -> Answer Scores
    technical: { type: Object },    // Question ID -> Correct/Incorrect
    aptitude: { type: Object }      // Question ID -> Correct/Incorrect
  },
  // Aggregated scores
  categoryScores: {
    technical: { type: Number, default: 0 },
    aptitude: { type: Number, default: 0 }
  },
  // Final Result
  recommendedCareer: { type: String },
  details: { type: Object } // Any extra metadata
});

export default mongoose.model("TestResult", testResultSchema);
