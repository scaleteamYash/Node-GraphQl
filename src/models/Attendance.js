import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    faculty: { type: mongoose.Schema.Types.ObjectId,ref:"Users" },
    students: [
      {
        student: { type: mongoose.Schema.Types.ObjectId,ref:"Users" },
        status: { type: Boolean, default: false },
      },
    ],
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const attendanceModel = mongoose.model("attendances", attendanceSchema);

export default attendanceModel;
