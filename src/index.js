import dotenv from "dotenv";
import connectDB from "./db/db.connection.js";

dotenv.config();

// Connect to the database
connectDB();