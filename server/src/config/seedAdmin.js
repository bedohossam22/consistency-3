import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "AdminUser",
    email: "admin@test.com",
    password: hashedPassword,
    role: "admin",
    age: 30
  });

  console.log("Admin created!");
  process.exit();
};

createAdmin();