import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  onetCode: { type: String }, // O*NET SOC Code
  bright_outlook: { type: Boolean, default: false },

  // Snapshot / Hero Box
  averageSalary: { type: String }, // e.g., "$80,000 - $120,000"
  jobGrowth: { type: String }, // e.g., "15% (Much faster than average)"
  educationRequired: { type: String }, // e.g., "Bachelor's Degree"
  demandLevel: { type: String }, // e.g., "High"
  difficulty: { type: String, enum: ["Beginner", "Moderate", "Advanced"] },

  // Detailed Sections
  responsibilities: [{ type: String }],

  skills: {
    technical: [{ type: String }],
    soft: [{ type: String }],
  },

  educationPathway: {
    degree: { type: String },
    exams: [{ type: String }],
    certifications: [{ type: String }],
    internships: { type: String },
  },

  jobRoles: [
    {
      title: { type: String },
      description: { type: String },
    },
  ],

  salaryInsights: {
    india: {
      entry: { type: String },
      mid: { type: String },
      senior: { type: String },
    },
    global: {
      us: { type: String },
      uk: { type: String },
      canada: { type: String },
    },
  },

  futureScope: {
    demandTrend: { type: String },
    techChanges: { type: String },
    automationRisk: { type: String },
  },

  suitability: {
    goodFor: [{ type: String }],
    notFor: [{ type: String }],
  },

  similarCareers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Career" }],

  resources: [
    {
      name: { type: String },
      url: { type: String },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Career", careerSchema);
