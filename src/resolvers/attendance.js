import Attendance from "../models/Attendance";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";

const attendanceType = {
  Query: {
    getAllAttendance: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getAllAttendance = await Attendance?.find({
            faculty: loginUser?.loginUser?._id,
            isDeleted: false,
          }).populate([
            {
              path: "faculty",
              populate: [
                { path: "role" },
                { path: "class" },
                { path: "subject" },
              ],
            },
            {
              path: "students",
              populate: [
                {
                  path: "student",
                  populate: [{ path: "role" }, { path: "subject" }],
                },
              ],
            },
          ]);

          if (getAllAttendance) {
            return getAllAttendance;
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    getAttendance: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getAttendance = await Attendance?.findOne( {
            _id: args?.id,
            isDeleted: false,
            faculty: loginUser?.loginUser?._id,
          }).populate([
            {
              path: "faculty",
              populate: [
                { path: "role" },
                { path: "class" },
                { path: "subject" },
              ],
            },
            {
              path: "students",
              populate: [
                {
                  path: "student",
                  populate: [{ path: "role" }, { path: "subject" }],
                },
              ],
            },
          ]);

          if (getAttendance) {
            return getAttendance;
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
    createAttendance: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const createAttendance = await Attendance?.create(
            args?.createattendancemodel
          );

          return createAttendance;
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    addAttendance: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getAttendance = await Attendance?.find({
            _id: args?.id,
            isDeleted: false,
            faculty: loginUser?.loginUser?._id,
          });

          if (getAttendance?.length > 0) {
            const addAttendance = await Attendance?.findByIdAndUpdate(
              args.id,
              {
                $push: {
                  students: {
                    student: args?.addattendancemodel?.student,
                    status: args?.addattendancemodel?.status,
                  },
                },
              },
              { upsert: true, new: true }
            );

            return addAttendance;
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    updateAttendance: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getAttendance = await Attendance?.find({
            _id: args?.id,
            isDeleted: false,
            faculty: loginUser?.loginUser?._id,
          });
          if (getAttendance?.length > 0) {
            const updateAttendance = await Attendance?.findOneAndUpdate(
              { _id: args?.id, students: { $elemMatch: { _id: args?.sid } } },
              {
                $set: {
                  "students.$.status": args?.updateattendancemodel?.status,
                },
              },
              { new: true }
            );
            return updateAttendance;
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    deleteAttendance: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getAttendance = await Attendance?.find({
            _id: args?.id,
            isDeleted: false,
            faculty: loginUser?.loginUser?._id,
          });
          if (getAttendance?.length > 0) {
            const deleteAttendance = await Attendance?.findByIdAndUpdate(
              args.id,
              { $set: { isDeleted: true } },
              { new: true }
            );
            return deleteAttendance;
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
  },
};
export default attendanceType;
