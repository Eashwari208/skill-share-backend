import express from "express";
import Session from "../models/Session.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create session (TEACHER)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create sessions" });
    }

    const { title, description, date } = req.body;

    const session = new Session({
      teacherId: req.user.id,
      title,
      description,
      date
    });

    await session.save();
    res.json({ message: "Session created ✅", session });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all sessions
router.get("/", async (req, res) => {
  const sessions = await Session.find().populate("teacherId", "name");
  res.json(sessions);
});

// Enroll student
router.post("/enroll/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can enroll" });
    }

    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.students.includes(req.user.id)) {
      return res.json({ message: "Already enrolled" });
    }

    session.students.push(req.user.id);
    await session.save();

    res.json({ message: "Enrolled successfully ✅" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
