import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    publisher: { type: String },
    publishDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("books", bookSchema);

export default bookModel;
