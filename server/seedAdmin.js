import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    const adminEmail = "admin@chooseeasy.com";
    const adminPassword = "adminpassword123";
    const adminUsername = "AdminUser";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const adminUser = new User({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
