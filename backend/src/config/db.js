import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async () => {
  try {
    if(!config.MONGO_URI) throw new Error('MONGO_URI is not set');
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log("✅ Connected to Database",conn.connection.host);
  } catch (error) {
    console.log("❌ Error connecting to MongoDB: ", error?.message || error);
    throw error;
  }
};
  