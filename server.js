import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

import sessionRoutes from "./routes/sessionRoutes.js";
app.use("/api/sessions", sessionRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Skill Share API Working ✅");
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

