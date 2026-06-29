import dotenv from "dotenv";
import connectDB from "./db/db.connection.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });

  app.on("error", (err) => {
    console.error("Error starting the server", err);
  });
})
.catch((err) => {
  console.error("Error connecting to the database", err);
});