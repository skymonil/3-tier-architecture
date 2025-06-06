import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MongoDB connection URI is missing!");

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error: ", err);
  }
};
