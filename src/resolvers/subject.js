import Subject from "../models/Subject";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";

const subjectType = {
  Query: {
    getAllSubject: combineResolvers(access.accessAdmin, async () => {
      try {
        const getAllSubject = await Subject?.find({ isDeleted: false });
        if (getAllSubject?.length > 0) {
          return getAllSubject;
        } else {
          throw new Error("Data is Not Found");
        }
      } catch (error) {
        throw new Error(error?.message);
      }
    }),
    getSubject: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const getSubject = await Subject?.findOne({
            _id: args?.id,
            isDeleted: false,
          });
          if (getSubject) {
            return getSubject;
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
    createSubject: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const subjectCode = args.subjectmodel.subjectCode;
          const checkSubject = await Subject?.findOne({ subjectCode });
          if (!checkSubject) {
            const createSubject = await Subject?.create(args?.subjectmodel);
            return createSubject;
          } else {
            throw new Error("Subject already exists");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    updateSubject: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const subjectCode = args.subjectmodel.subjectCode;
          const checkSubject = await Subject?.findOne({ subjectCode });
          const getSubject = await Subject?.find({
            _id: args?.id,
            isDeleted: false,
          });
          if (getSubject?.length > 0) {
            if (!checkSubject || checkSubject?._id?.toString() === args?.id) {
              const updateSubject = await Subject?.findByIdAndUpdate(
                args?.id,
                args?.subjectmodel,
                { new: true }
              );
              return updateSubject;
            } else {
              throw new Error("Subject already exists");
            }
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    deleteSubject: combineResolvers(
      access.accessAdmin,
      async (parent, args, context, info) => {
        try {
          const deleteSubject = await Subject?.findByIdAndUpdate(
            args?.id,
            { $set: { isDeleted: true } },
            { new: true }
          );
          return deleteSubject;
        } catch (error) {
          throw new Error("Error in deleteSubject", error);
        }
      }
    ),
  },
};
export default subjectType;
