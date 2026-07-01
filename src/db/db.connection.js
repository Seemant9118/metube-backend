import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// config/db.js
const connectDB = async () => {
  try {    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    process.exit(1);
  }
};

export default connectDB;