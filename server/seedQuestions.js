import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

// Hardcoded data from client/src/data/testData.js
const psychometricQuestions = [
    {
        id: 1,
        text: "How do you prefer to work?",
        category: "Psychometric",
        options: [
            { text: "Independently on complex problems", scores: { IT: 2, Creative: 1 } },
            { text: "Collaborating with a team", scores: { Business: 2, Healthcare: 1 } },
            { text: "Leading and directing others", scores: { Business: 2, Government: 1 } },
            { text: "Helping individuals one-on-one", scores: { Healthcare: 2, Service: 1 } },
        ],
    },
    {
        id: 2,
        text: "What interests you the most?",
        category: "Psychometric",
        options: [
            { text: "Technology and gadgets", scores: { IT: 2 } },
            { text: "Art, colors, and aesthetics", scores: { Creative: 2 } },
            { text: "Money, markets, and business", scores: { Business: 2 } },
            { text: "Social justice and community", scores: { Government: 2, Healthcare: 1 } },
        ],
    },
    {
        id: 3,
        text: "When facing a problem, you usually:",
        category: "Psychometric",
        options: [
            { text: "Analyze data and logic", scores: { IT: 2, Business: 1 } },
            { text: "Look for a creative solution", scores: { Creative: 2 } },
            { text: "Ask for advice and consensus", scores: { Healthcare: 1, Government: 1 } },
            { text: "Take charge and decide", scores: { Business: 2 } },
        ],
    },
    {
        id: 4,
        text: "Which environment appeals to you?",
        category: "Psychometric",
        options: [
            { text: "A quiet office with computers", scores: { IT: 2 } },
            { text: "A busy studio or workshop", scores: { Creative: 2 } },
            { text: "A corporate meeting room", scores: { Business: 2 } },
            { text: "A hospital or clinic", scores: { Healthcare: 2 } },
        ],
    },
    {
        id: 5,
        text: "How do you handle risk?",
        category: "Psychometric",
        options: [
            { text: "I calculate and minimize it", scores: { IT: 1, Business: 1 } },
            { text: "I embrace it for innovation", scores: { Creative: 2, Business: 1 } },
            { text: "I prefer stability and rules", scores: { Government: 2 } },
            { text: "I risk it if it helps others", scores: { Healthcare: 2 } },
        ],
    },
];

const technicalQuestions = {
    IT: [
        { text: "Which of these is a programming language?", options: [{ text: "HTML", correct: false }, { text: "Python", correct: true }, { text: "JPEG", correct: false }, { text: "Excel", correct: false }] },
        { text: "What does CPU stand for?", options: [{ text: "Central Processing Unit", correct: true }, { text: "Computer Personal Unit", correct: false }, { text: "Central Power Unit", correct: false }, { text: "Central Processor Union", correct: false }] },
        { text: "Which data structure uses LIFO (Last In First Out)?", options: [{ text: "Queue", correct: false }, { text: "Stack", correct: true }, { text: "Array", correct: false }, { text: "Tree", correct: false }] },
    ],
    Creative: [
        { text: "Which color mix creates Green?", options: [{ text: "Red + Blue", correct: false }, { text: "Blue + Yellow", correct: true }, { text: "Red + Yellow", correct: false }, { text: "White + Black", correct: false }] },
        { text: "What is 'Typography'?", options: [{ text: "The study of maps", correct: false }, { text: "The art of arranging type", correct: true }, { text: "Ancient writing", correct: false }, { text: "Photography techniques", correct: false }] },
        { text: "Which tool is commonly used for vector graphics?", options: [{ text: "Photoshop", correct: false }, { text: "Illustrator", correct: true }, { text: "Premiere Pro", correct: false }, { text: "Excel", correct: false }] },
    ],
    Business: [
        { text: "What implies 'ROI'?", options: [{ text: "Rate of Inflation", correct: false }, { text: "Return on Investment", correct: true }, { text: "Risk of Inquiry", correct: false }, { text: "Real Office Income", correct: false }] },
        { text: "A SWOT analysis includes Strengths, Weaknesses, Opportunities, and...?", options: [{ text: "Tasks", correct: false }, { text: "Threats", correct: true }, { text: "Teams", correct: false }, { text: "Tests", correct: false }] },
        { text: "What is the primary goal of marketing?", options: [{ text: "To hire people", correct: false }, { text: "To manufacture products", correct: false }, { text: "To promote and sell products", correct: true }, { text: "To calculate taxes", correct: false }] },
    ],
    Healthcare: [
        { text: "Which organ pumps blood?", options: [{ text: "Brain", correct: false }, { text: "Heart", correct: true }, { text: "Liver", correct: false }, { text: "Lungs", correct: false }] },
        { text: "What is the normal human body temperature approx?", options: [{ text: "96°C", correct: false }, { text: "37°C", correct: true }, { text: "100°C", correct: false }, { text: "25°C", correct: false }] },
        { text: "CPR stands for?", options: [{ text: "Cardiopulmonary Resuscitation", correct: true }, { text: "Central Pulse Regulation", correct: false }, { text: "Control Pressure Rate", correct: false }, { text: "Cardio Pure Recovery", correct: false }] },
    ],
    Government: [
        { text: "Who creates laws in a democracy?", options: [{ text: "The Police", correct: false }, { text: "The Parliament/Legislature", correct: true }, { text: "The Judges", correct: false }, { text: "The Military", correct: false }] },
        { text: "What is a public sector job?", options: [{ text: "Working for a private company", correct: false }, { text: "Working for the government", correct: true }, { text: "Self-employment", correct: false }, { text: "Freelancing", correct: false }] },
        { text: "Diplomacy typically involves:", options: [{ text: "International relations", correct: true }, { text: "Computer programming", correct: false }, { text: "Surgery", correct: false }, { text: "Accounting", correct: false }] },
    ],
};

const aptitudeQuestions = [
    { category: "Aptitude", subCategory: "Analytical", text: "Find the next number: 2, 4, 8, 16, ...", options: [{ text: "20", correct: false }, { text: "24", correct: false }, { text: "32", correct: true }, { text: "30", correct: false }] },
    { category: "Aptitude", subCategory: "Analytical", text: "If A is the brother of B, and B is the sister of C, what is A to C?", options: [{ text: "Father", correct: false }, { text: "Brother", correct: true }, { text: "Uncle", correct: false }, { text: "Cousin", correct: false }] },
    { category: "Aptitude", subCategory: "Grammar", text: "Select the correct sentence:", options: [{ text: "She don't like apples.", correct: false }, { text: "She doesn't like apples.", correct: true }, { text: "She not like apples.", correct: false }, { text: "She isn't like apples.", correct: false }] },
    { category: "Aptitude", subCategory: "Grammar", text: "Identify the synonym of 'Happy':", options: [{ text: "Sad", correct: false }, { text: "Joyful", correct: true }, { text: "Angry", correct: false }, { text: "Tired", correct: false }] },
];

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connected to MongoDB for Seeding Questions");

        await Question.deleteMany({}); // Clear existing questions
        console.log("Cleared existing questions");

        const questionsToInsert = [];

        // Psychometric
        psychometricQuestions.forEach(q => {
            questionsToInsert.push({
                text: q.text,
                category: q.category,
                options: q.options
            });
        });

        // Technical
        for (const [subCat, questions] of Object.entries(technicalQuestions)) {
            questions.forEach(q => {
                questionsToInsert.push({
                    text: q.text,
                    category: "Technical",
                    subCategory: subCat,
                    options: q.options
                });
            });
        }

        // Aptitude
        aptitudeQuestions.forEach(q => {
            questionsToInsert.push({
                text: q.text,
                category: q.category,
                subCategory: q.subCategory, // e.g. Analytical, Grammar
                options: q.options
            });
        });

        await Question.insertMany(questionsToInsert);
        console.log(`Seeded ${questionsToInsert.length} questions successfully`);

        process.exit();
    })
    .catch((err) => {
        console.error("Error seeding questions:", err);
        process.exit(1);
    });
