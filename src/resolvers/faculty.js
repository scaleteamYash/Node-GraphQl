import User from "../models/User";
import Role from "../models/Role";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";

const facultyType = {
  Query: {
    getAllFaculty: combineResolvers(access.accessFacultyOrAdmin, async () => {
      try {
        const faculty = await Role?.findOne({ roleName: "faculty" });
        const getAllFaculty = await User?.find({
          isDeleted: false,
          role: faculty?._id,
        }).sort({ createdAt: -1 }).populate([{ path: "class" }, { path: "subject" }, { path: "role" }]);

        if (getAllFaculty) {
          return getAllFaculty;
        } else {
          throw new Error("Data is Not Found");
        }
      } catch (error) {
        throw new Error(error?.message);
      }
    }),
    getFaculty: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const getFaculty = await User?.findOne({
            _id: args?.id,
            isDeleted: false,
          }).populate([
            { path: "class" },
            { path: "subject" },
            { path: "role" },
          ]);

          if (getFaculty) {
            return getFaculty;
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
    createFaculty: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const email = args?.facultymodel?.email;
          const checkEmail = await User?.findOne({ email });
          const faculty = await Role?.findOne({ roleName: "faculty" });

          if (!checkEmail) {
            const createFaculty = await User?.create(args?.facultymodel);
            createFaculty.role = faculty?._id;
            createFaculty?.save();
            return createFaculty;
          } else {
            throw new Error("Email already exists");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    updateFaculty: combineResolvers(access.accessAdmin, async (parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        User?.findByIdAndUpdate(args?.id, { ...args?.facultyupdatemodel }, { new: true }).then((res) => {
          resolve(res)
        }).catch((error) => {
          reject(error)
        })
      })
      // try {
      //   const email = args?.facultymodel?.email;
      //   const checkEmail = await User?.findOne({ email });
      //   const getFaculty = await User?.find({ _id: args?.id,isDeleted: false});
      //   if (getFaculty?.length > 0) {
      //     if (!checkEmail || checkEmail?._id?.toString() === args?.id) {
      //       const updateFaculty = await User?.findByIdAndUpdate(
      //         args?.id,
      //         args?.facultymodel,
      //         { new: true }
      //         );
      //         console.log("🚀 ~ updateFaculty", updateFaculty)
      //       return updateFaculty;
      //     } else {
      //       throw new Error("Email already exists");
      //     }
      //   } else {
      //     throw new Error("Data is Not Found");
      //   }
      // } catch (error) {
      //   throw new Error(error?.message);
      // }
    }
    ),
    deleteFaculty: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const deleteFaculty = await User?.findByIdAndUpdate(
            args?.id,
            { $set: { isDeleted: true } },
            { new: true }
          );
          return deleteFaculty;
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
  },
};
export default facultyType;
