import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

export const connectDB = async () => {
  try {
    const uri = `mongodb+srv://m98513313:Mongo123@e-commerce.qrafroh.mongodb.net/caamdb?retryWrites=true&w=majority&appName=E-Commerce`;
    if (!uri) throw new Error("MongoDB connection URI is missing!");

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true, // ✅ Explicitly enables TLS
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};