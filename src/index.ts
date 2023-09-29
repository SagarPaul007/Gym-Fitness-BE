import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { DB_URI, PORT } from "./utils/env";
import userRoutes from "./routes/user.routes";
import exercisesRoutes from "./routes/exercise.routes";
import { authenticate } from "./middlewares/auth";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authenticate);

// Routes
app.use("/user", userRoutes);
app.use("/exercises", exercisesRoutes);

// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
