import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Defining Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, },
    gender: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId , ref: 'roles'},
    class: { type: mongoose.Schema.Types.ObjectId,ref:'Classes' },
    subject: { type: mongoose.Schema.Types.ObjectId,ref: 'Subjects' },
    enrno: { type: String },
    password: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Compiling Schema
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next()
  }
  next();
});

userSchema.methods.validatePassword = async function (password) {

  return await bcrypt.compare(password, this.password);
};
const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
