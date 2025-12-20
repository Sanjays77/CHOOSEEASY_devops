import mongoose from "mongoose";
import dotenv from "dotenv";
import Career from "./models/Career.js";

dotenv.config();

import careersData from "./data/careersData.js";

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data (optional, but good for development)
    await Career.deleteMany({});
    console.log("Cleared existing careers.");

    // Insert new data
    await Career.insertMany(careersData);
    console.log("Database seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
