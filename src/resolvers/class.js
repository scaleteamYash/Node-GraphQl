import ClassModel from "../models/class";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";


const classType = {
  Query: {
    getAllClass: combineResolvers(access.accessAdmin, async () => {
      try {
        const getAllClass = await ClassModel?.find({ isDeleted: false });
        if (getAllClass) {
          return getAllClass;
        } else {
          throw new Error("Data is Not Found");
        }
      } catch (error) {
        throw new Error(error?.message);
      }
    }),
    getClass: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const getClass = await ClassModel?.find({
            _id: args?.id,
            isDeleted: false,
          });
          if (getClass) {
            return getClass;
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
    createClass: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const className = args?.Classmodel?.className;
          const checkClass = await ClassModel?.findOne({ className });
          if (!checkClass) {
            const createClass = await ClassModel?.create(args?.Classmodel);
            return createClass;
          } else {
            throw new Error("Class already exists");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    updateClass: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const className = args?.Classmodel?.className;
          const checkClass = await ClassModel?.findOne({ className });
          const getClass = await ClassModel?.find({
            _id: args?.id,
            isDeleted: false,
          });
          if (getClass?.length > 0) {
            if (!checkClass || checkClass?._id?.toString() === args?.id) {
              const updateClass = await ClassModel?.findByIdAndUpdate(
                args?.id,
                args?.Classmodel,
                { new: true }
              );
              return updateClass;
            } else {
              throw new Error("Class already exists");
            }
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    deleteClass: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const deleteClass = await ClassModel?.findByIdAndUpdate(
            args?.id,
            { $set: { isDeleted: true } },
            { new: true }
          );
          return deleteClass;
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
  },
};
export default classType;
