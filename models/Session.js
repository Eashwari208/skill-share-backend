import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  date: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.model("Session", sessionSchema);
