import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

const psychometricQuestions = [
  {
    text: "When solving a complex problem, what is your first instinct?",
    category: "Psychometric",
    options: [
      {
        text: "Break it down into logical steps and algorithms.",
        scores: { Technology: 2, Science: 2 },
      },
      {
        text: "Think of a unique, out-of-the-box visual solution.",
        scores: { Creative: 2 },
      },
      {
        text: "Discuss it with a team to find a consensus.",
        scores: { Business: 1, Education: 2 },
      },
      {
        text: "Consider the human impact and ethical implications.",
        scores: { Healthcare: 1, Legal: 2 },
      },
    ],
  },
  {
    text: "Which of these activities sounds most appealing for a weekend project?",
    category: "Psychometric",
    options: [
      {
        text: "Building a PC or coding a small app.",
        scores: { Technology: 2 },
      },
      {
        text: "Painting, writing, or designing a poster.",
        scores: { Creative: 2 },
      },
      {
        text: "Volunteering at a shelter or teaching a skill.",
        scores: { Healthcare: 1, Education: 2 },
      },
      {
        text: "Debating current events or reading history.",
        scores: { Legal: 2, Science: 1 },
      },
    ],
  },
  {
    text: "What kind of Netflix/YouTube content do you watch?",
    category: "Psychometric",
    options: [
      {
        text: "Tech reviews, coding tutorials, or sci-fi.",
        scores: { Technology: 2, Science: 1 },
      },
      {
        text: "Documentaries on business moguls or finance.",
        scores: { Business: 2 },
      },
      {
        text: "Medical dramas, biology docs, or rescue shows.",
        scores: { Healthcare: 2 },
      },
      {
        text: "Legal dramas, crime thrillers, or political debates.",
        scores: { Legal: 2 },
      },
    ],
  },
  {
    text: "If you started a company, what role would you take?",
    category: "Psychometric",
    options: [
      {
        text: "CTO: Building the product and technology.",
        scores: { Technology: 2 },
      },
      {
        text: "Creative Director: Designing the brand.",
        scores: { Creative: 2 },
      },
      { text: "CEO: Managing strategy and sales.", scores: { Business: 2 } },
      {
        text: "Head of HR/Training: Developing the people.",
        scores: { Education: 2, Healthcare: 1 },
      },
    ],
  },
  {
    text: "You prefer a workspace that is:",
    category: "Psychometric",
    options: [
      {
        text: "High-tech with multiple monitors.",
        scores: { Technology: 2, Finance: 1 },
      },
      {
        text: "Vibrant, messy, and full of art supplies.",
        scores: { Creative: 2 },
      },
      {
        text: "A clean clinic or laboratory.",
        scores: { Healthcare: 2, Science: 2 },
      },
      {
        text: "A formal office or courtroom.",
        scores: { Legal: 2, Business: 1 },
      },
    ],
  },
  {
    text: "What drives you most in a career?",
    category: "Psychometric",
    options: [
      {
        text: "Discovering how things work.",
        scores: { Science: 2, Technology: 1 },
      },
      {
        text: "Helping people heal and grow.",
        scores: { Healthcare: 2, Education: 2 },
      },
      {
        text: "Influencing decisions and making money.",
        scores: { Business: 2, Legal: 1 },
      },
      {
        text: "Expressing myself and entertaining others.",
        scores: { Creative: 2 },
      },
    ],
  },
  {
    text: "How do you handle rules and guidelines?",
    category: "Psychometric",
    options: [
      {
        text: "They are code to be followed logically.",
        scores: { Technology: 1, Science: 1 },
      },
      {
        text: "They stifle my creativity; I prefer freedom.",
        scores: { Creative: 2 },
      },
      {
        text: "They are essential for justice and order.",
        scores: { Legal: 2, Business: 1 },
      },
      {
        text: "They are necessary for safety and care.",
        scores: { Healthcare: 2, Education: 1 },
      },
    ],
  },
  {
    text: "Which subject did you enjoy most in school?",
    category: "Psychometric",
    options: [
      {
        text: "Mathematics or Computer Science.",
        scores: { Technology: 2, Business: 1 },
      },
      {
        text: "Biology, Chemistry, or Physics.",
        scores: { Science: 2, Healthcare: 1 },
      },
      {
        text: "English, History, or Arts.",
        scores: { Creative: 1, Legal: 1, Education: 1 },
      },
      {
        text: "Debate, Economics, or Civics.",
        scores: { Legal: 2, Business: 2 },
      },
    ],
  },
  {
    text: "Your friends describe you as:",
    category: "Psychometric",
    options: [
      {
        text: " The 'Tech Guy' who fixes everything.",
        scores: { Technology: 2 },
      },
      { text: "The Artist/Dreamer.", scores: { Creative: 2 } },
      {
        text: "The Mom/Dad of the group who cares.",
        scores: { Healthcare: 2, Education: 1 },
      },
      { text: "The Leader/Organizer.", scores: { Business: 2, Legal: 1 } },
    ],
  },
  {
    text: "What is your preferred mode of communication?",
    category: "Psychometric",
    options: [
      {
        text: "Email or Chat (Precise & Written).",
        scores: { Technology: 1, Legal: 1 },
      },
      {
        text: "Presentations & Public Speaking.",
        scores: { Business: 2, Education: 2 },
      },
      { text: "Visuals & Boards.", scores: { Creative: 2 } },
      { text: "One-on-one listening.", scores: { Healthcare: 2 } },
    ],
  },
];

const technicalQuestions = {
  Technology: [
    {
      text: "Which language is primarily used for web structure?",
      options: [
        { text: "HTML", correct: true },
        { text: "Python", correct: false },
        { text: "SQL", correct: false },
        { text: "C++", correct: false },
      ],
    },
    {
      text: "What does 'Cloud Computing' refer to?",
      options: [
        {
          text: "Using internet servers for storage/processing",
          correct: true,
        },
        { text: "Computing in airplanes", correct: false },
        { text: "Weather prediction software", correct: false },
        { text: "Hard drive storage", correct: false },
      ],
    },
    {
      text: "What is the function of RAM?",
      options: [
        { text: "Long-term storage", correct: false },
        { text: "Temporary fast memory", correct: true },
        { text: "Cooling the CPU", correct: false },
        { text: "Power supply", correct: false },
      ],
    },
    {
      text: "Which of these is a database technology?",
      options: [
        { text: "MongoDB", correct: true },
        { text: "Photoshop", correct: false },
        { text: "Linux", correct: false },
        { text: "Angular", correct: false },
      ],
    },
  ],
  Creative: [
    {
      text: "Which color scheme uses opposite colors on the wheel?",
      options: [
        { text: "Complementary", correct: true },
        { text: "Analogous", correct: false },
        { text: "Monochromatic", correct: false },
        { text: "Triadic", correct: false },
      ],
    },
    {
      text: "What is 'Kerning' in typography?",
      options: [
        { text: "Space between lines", correct: false },
        { text: "Space between characters", correct: true },
        { text: "Font size", correct: false },
        { text: "Font color", correct: false },
      ],
    },
    {
      text: "The 'Rule of Thirds' is used in:",
      options: [
        { text: "Photography/Composition", correct: true },
        { text: "Coding", correct: false },
        { text: "Accounting", correct: false },
        { text: "Surgery", correct: false },
      ],
    },
    {
      text: "CMYK is used primarily for?",
      options: [
        { text: "Printing", correct: true },
        { text: "Web Screens", correct: false },
        { text: "Video Editing", correct: false },
        { text: "Audio Mixing", correct: false },
      ],
    },
  ],
  Business: [
    {
      text: "What does 'B2B' stand for?",
      options: [
        { text: "Business to Business", correct: true },
        { text: "Back to Basics", correct: false },
        { text: "Buyer to Buyer", correct: false },
        { text: "Business to Bank", correct: false },
      ],
    },
    {
      text: "Which is an example of an Asset?",
      options: [
        { text: "Loan", correct: false },
        { text: "Building/Equipment", correct: true },
        { text: "Salary Expense", correct: false },
        { text: "Rent", correct: false },
      ],
    },
    {
      text: "The '4 Ps' of Marketing are Product, Price, Place, and...?",
      options: [
        { text: "Promotion", correct: true },
        { text: "People", correct: false },
        { text: "Process", correct: false },
        { text: "Profit", correct: false },
      ],
    },
    {
      text: "What is a 'Start-up'?",
      options: [
        { text: "A new, high-growth company", correct: true },
        { text: "Turning on a computer", correct: false },
        { text: "A corporate merger", correct: false },
        { text: "Closing a deal", correct: false },
      ],
    },
  ],
  Healthcare: [
    {
      text: "Hypertension refers to:",
      options: [
        { text: "High Blood Pressure", correct: true },
        { text: "Low Blood Sugar", correct: false },
        { text: "High Fever", correct: false },
        { text: "Rapid Heartbeat", correct: false },
      ],
    },
    {
      text: "What is the largest organ in the human body?",
      options: [
        { text: "Skin", correct: true },
        { text: "Liver", correct: false },
        { text: "Heart", correct: false },
        { text: "Lungs", correct: false },
      ],
    },
    {
      text: "Pediatrics is the branch of medicine dealing with:",
      options: [
        { text: "Children", correct: true },
        { text: "Feet", correct: false },
        { text: "Elderly", correct: false },
        { text: "Bones", correct: false },
      ],
    },
    {
      text: "Which cell fights infection?",
      options: [
        { text: "White Blood Cell", correct: true },
        { text: "Red Blood Cell", correct: false },
        { text: "Platelet", correct: false },
        { text: "Neuron", correct: false },
      ],
    },
  ],
  Science: [
    {
      text: "H2O is the chemical formula for:",
      options: [
        { text: "Water", correct: true },
        { text: "Hydrogen Peroxide", correct: false },
        { text: "Salt", correct: false },
        { text: "Oxygen", correct: false },
      ],
    },
    {
      text: "What is the center of an atom called?",
      options: [
        { text: "Nucleus", correct: true },
        { text: "Electron", correct: false },
        { text: "Proton", correct: false },
        { text: "Molecule", correct: false },
      ],
    },
    {
      text: "Photosynthesis is performed by:",
      options: [
        { text: "Plants", correct: true },
        { text: "Animals", correct: false },
        { text: "Rocks", correct: false },
        { text: "Fungi", correct: false },
      ],
    },
    {
      text: "DNA stands for:",
      options: [
        { text: "Deoxyribonucleic Acid", correct: true },
        { text: "Data New Access", correct: false },
        { text: "Digital Network Audio", correct: false },
        { text: "Dynamic Nitrogen Acid", correct: false },
      ],
    },
  ],
  Legal: [
    {
      text: "A 'Plaintiff' is someone who:",
      options: [
        { text: "Files a lawsuit", correct: true },
        { text: "Defends a lawsuit", correct: false },
        { text: "Judges the case", correct: false },
        { text: "Witnesses a crime", correct: false },
      ],
    },
    {
      text: "IP Rights usually refer to:",
      options: [
        { text: "Intellectual Property", correct: true },
        { text: "Internet Protocol", correct: false },
        { text: "Internal Policy", correct: false },
        { text: "International Police", correct: false },
      ],
    },
    {
      text: "What is a 'Constitution'?",
      options: [
        { text: "Supreme law of a country", correct: true },
        { text: "A business contract", correct: false },
        { text: "A type of tax", correct: false },
        { text: "A criminal record", correct: false },
      ],
    },
    {
      text: "An attorney is another name for a:",
      options: [
        { text: "Lawyer", correct: true },
        { text: "Doctor", correct: false },
        { text: "Police Officer", correct: false },
        { text: "Judge", correct: false },
      ],
    },
  ],
  Education: [
    {
      text: "Pedagogy refers to:",
      options: [
        { text: "The method and practice of teaching", correct: true },
        { text: "Child psychology", correct: false },
        { text: "School administration", correct: false },
        { text: "Physical Education", correct: false },
      ],
    },
    {
      text: "STEM Education includes Science, Technology, Engineering, and...?",
      options: [
        { text: "Mathematics", correct: true },
        { text: "Management", correct: false },
        { text: "Music", correct: false },
        { text: "Medicine", correct: false },
      ],
    },
    {
      text: "What is a 'Curriculum'?",
      options: [
        { text: "The subjects comprising a course of study", correct: true },
        { text: "A school bus", correct: false },
        { text: "A teacher's resume", correct: false },
        { text: "A grading system", correct: false },
      ],
    },
    {
      text: "Special Education focuses on:",
      options: [
        { text: "Students with distinct learning needs", correct: true },
        { text: "Gifted students only", correct: false },
        { text: "Sports training", correct: false },
        { text: "Art classes", correct: false },
      ],
    },
  ],
};

const aptitudeQuestions = [
  {
    category: "Aptitude",
    subCategory: "Logical",
    text: "Which number comes next: 2, 6, 12, 20, 30, ...?",
    options: [
      { text: "42", correct: true },
      { text: "40", correct: false },
      { text: "36", correct: false },
      { text: "50", correct: false },
    ],
  },
  {
    category: "Aptitude",
    subCategory: "Verbal",
    text: "Benevolent means:",
    options: [
      { text: "Kind and well-meaning", correct: true },
      { text: "Violent", correct: false },
      { text: "Rich", correct: false },
      { text: "Confused", correct: false },
    ],
  },
  {
    category: "Aptitude",
    subCategory: "Logical",
    text: "If 'CAT' is coded as '3120', how is 'DOG' coded? (A=1, B=2...)",
    options: [
      { text: "4157", correct: true },
      { text: "4156", correct: false },
      { text: "3157", correct: false },
      { text: "4147", correct: false },
    ],
  },
  {
    category: "Aptitude",
    subCategory: "Math",
    text: "What is 15% of 200?",
    options: [
      { text: "30", correct: true },
      { text: "20", correct: false },
      { text: "25", correct: false },
      { text: "35", correct: false },
    ],
  },
  {
    category: "Aptitude",
    subCategory: "Logical",
    text: "Bird is to Fly as Fish is to...?",
    options: [
      { text: "Swim", correct: true },
      { text: "Water", correct: false },
      { text: "Gill", correct: false },
      { text: "Ocean", correct: false },
    ],
  },
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
    psychometricQuestions.forEach((q) => {
      questionsToInsert.push({
        text: q.text,
        category: q.category,
        options: q.options,
      });
    });

    // Technical
    for (const [subCat, questions] of Object.entries(technicalQuestions)) {
      questions.forEach((q) => {
        questionsToInsert.push({
          text: q.text,
          category: "Technical",
          subCategory: subCat,
          options: q.options,
        });
      });
    }

    // Aptitude
    aptitudeQuestions.forEach((q) => {
      questionsToInsert.push({
        text: q.text,
        category: q.category,
        subCategory: q.subCategory,
        options: q.options,
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
