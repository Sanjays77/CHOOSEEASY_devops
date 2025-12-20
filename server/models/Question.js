import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["Psychometric", "Technical", "Aptitude"]
    },
    subCategory: { type: String }, // e.g., 'IT', 'Creative' for Technical; 'Analytical', 'Grammar' for Aptitude
    options: [
        {
            text: { type: String, required: true },
            scores: { type: Map, of: Number }, // For Psychometric: { IT: 2, Creative: 1 }
            correct: { type: Boolean }, // For Technical/Aptitude
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Question", questionSchema);
