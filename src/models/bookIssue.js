import mongoose from "mongoose";

const bookIssuerSchema = new mongoose.Schema(
    {
        bookid: { type: mongoose.Schema.Types.ObjectId,ref:"books" },
        studentid: { type: mongoose.Schema.Types.ObjectId,ref:"Users" },
        returnDays: { type: Number },
        isReturn: { type: Boolean, default: false },
        returnDate :{ type: String},
        penalty: { type: Number, default: 0 },
        isActive: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const bookIssuerModel = mongoose.model("bookIssues", bookIssuerSchema);

export default bookIssuerModel;
