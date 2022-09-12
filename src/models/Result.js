import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    faculty: { type: mongoose.Schema.Types.ObjectId,ref:"Users" },
    student: { type: mongoose.Schema.Types.ObjectId,ref:"Users" },
    class: { type: mongoose.Schema.Types.ObjectId,ref:"Classes" },
    score: [
      {
        subject: { type: mongoose.Schema.Types.ObjectId,ref:"Subjects" },
        total: { type: Number, required: true },
        marksObtain: { type: Number, required: true },
      },
    ],
    totalSubjectMarks: { type: Number },
    totalObtainMarks: { type: Number },
    result: { type: String },
    grade: { type: String },
    percentage: { type: Number },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const resultModel = mongoose.model("results", resultSchema);

export default resultModel;
