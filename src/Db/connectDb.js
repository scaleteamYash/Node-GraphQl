import mongoose from "mongoose";
import Role from "../models/Role";
import User from "../models/User";

const connectDb = async (DATABASE_URL) => {
  try {
    const DATABASE_OPTION = {
      dbName: "SchoolDatabase",
    };
    await mongoose
      .connect(DATABASE_URL, DATABASE_OPTION)
      .then(async (req, res) => {
        const findAdmin = await Role?.findOne({ roleName: "admin" });
        if (!findAdmin) {
          await Role?.create([
            { roleName: "admin" },
            { roleName: "faculty" },
            { roleName: "student" },
          ]);
        }
        const findAdminRole = await Role?.findOne({ roleName: "admin" });
        const findAdminData = await User?.findOne({ role: findAdminRole?._id });
        if (!findAdminData) {
          await User?.create({
            firstName: "Yash",
            lastName: "Gopani",
            email: process?.env?.EMAIL,
            gender: "male",
            role: findAdminRole?._id,
            enrno: process?.env?.ENRNO,
            password: process?.env?.PASSWORD,
          });
        }
      });
    console.log("Connect Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
