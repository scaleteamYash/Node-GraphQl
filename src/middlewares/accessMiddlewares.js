import Role from "../models/Role";
import skip from "graphql-resolvers";

export default {
  accessAdmin: async (parent, args, loginUser, info) => {
    try {
      const findAdminRole = await Role?.findOne({ roleName: "admin" });

      if (findAdminRole?._id?.toString() === loginUser?.loginUser?.role) {
        skip;
      } else {
        throw new Error(`You Don't have Permission to Access!`);
      }
    } catch {
      throw new Error(`You Don't have Permission to Access!`);
    }
  },

  accessFaculty: async (parent, args, loginUser, info) => {
    try {
      const findAdminRole = await Role?.findOne({ roleName: "faculty" });

      if (findAdminRole?._id?.toString() === loginUser?.loginUser?.role) {
        skip;
      } else {
        throw new Error(`You Don't have Permission to Access!`);
      }
    } catch {
      throw new Error(`You Don't have Permission to Access!`);
    }
  },

  accessFacultyOrStudent: async (parent, args, loginUser, info) => {
    try {
      const findFacultyRole = await Role?.findOne({ roleName: "faculty" });
      const findStudentRole = await Role?.findOne({ roleName: "student" });

      if (
        findFacultyRole?._id?.toString() === loginUser?.loginUser?.role ||
        findStudentRole?._id?.toString() === loginUser?.loginUser?.role
      ) {
        skip;
      } else {
        throw new Error(`You Don't have Permission to Access!`);
      }
    } catch {
      throw new Error(`You Don't have Permission to Access!`);
    }
  },
};
