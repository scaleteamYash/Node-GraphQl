import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true, trim: true },
  subjectCode: { type: Number, required: true, trim: true },
  isActive: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

const subjectModel = mongoose.model("Subjects", subjectSchema);

export default subjectModel;
