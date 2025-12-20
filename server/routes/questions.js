import express from "express";
import Question from "../models/Question.js";
import { auth, admin } from "../middleware/auth.js";

const router = express.Router();

// Get all questions
router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a question (Admin only)
router.post("/", auth, admin, async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a question (Admin only)
router.put("/:id", auth, admin, async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedQuestion)
            return res.status(404).json({ message: "Question not found" });
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a question (Admin only)
router.delete("/:id", auth, admin, async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion)
            return res.status(404).json({ message: "Question not found" });
        res.status(200).json({ message: "Question deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
