import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

export const connectDB = async () => {
  try {
    const uri = `mongodb://caam:caam-123@caam-cluster-975049978724.ap-south-1.docdb-elastic.amazonaws.com:27017/caamdb?authMechanism=SCRAM-SHA-1&tls=true`;
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