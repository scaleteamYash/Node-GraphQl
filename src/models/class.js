import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  className: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

const classModel = mongoose.model("Classes", classSchema);

export default classModel;
