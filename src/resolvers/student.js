import User from "../models/User";
import Role from "../models/Role";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";

const studentType = {
  Query: {
    getAllStudent: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const student = await Role?.findOne({ roleName: "student" });
          const getAllStudent = await User?.find({
            isDeleted: false,
            role: student?._id,
            subject: loginUser?.loginUser?.subject,
          }).populate([{ path: "subject" }, { path: "role" }]);

          if (getAllStudent?.length > 0) {
            return getAllStudent;
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    getStudent: combineResolvers(
      access.accessFacultyOrStudent,
      async (parent, args, loginUser, info) => {
        try {
          const getStudent = await User?.findOne({
            _id: args?.id,
            isDeleted: false,
            subject: loginUser?.loginUser?.subject,
          }).populate([{ path: 'subject' }, { path: 'role' }])

          if (getStudent) {
            return getStudent;
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
  },
  Mutation: {
    createStudent: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const email = args.studentmodel.email;
          const checkEmail = await User?.findOne({ email });
          const student = await Role?.findOne({ roleName: "student" });

          if (!checkEmail) {
            const createStudent = await User?.create(args?.studentmodel);
            createStudent.role = student?._id;
            createStudent.subject = loginUser?.loginUser?.subject;
            createStudent?.save();
            return createStudent;
          } else {
            throw new Error("Email already exists");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    updateStudent: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const email = args?.studentmodel?.email;
          const checkEmail = await User?.findOne({ email });
          const getStudent = await User?.find({
            _id: args?.id,
            isDeleted: false,
            subject: loginUser?.loginUser?.subject,
          });
          if (getStudent) {
            if (!checkEmail || checkEmail?._id?.toString() === args?.id) {
              const update_student = await User?.findByIdAndUpdate(
                args?.id,
                args?.studentmodel,
                { new: true }
              );
              return update_student;
            } else {
              throw new Error("Email already exists");
            }
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    deleteStudent: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getStudent = await User?.find({
            _id: args?.id,
            isDeleted: false,
            subject: loginUser?.loginUser?.subject,
          });
          if (getStudent) {
            const deleteStudent = await User?.findByIdAndUpdate(
              args?.id,
              { $set: { isDeleted: true } },
              { new: true }
            );
            return deleteStudent;
          } else {
            throw new Error("Student is Not Found!");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
  },
};
export default studentType;
