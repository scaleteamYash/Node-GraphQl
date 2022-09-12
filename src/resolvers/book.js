import Book from "../models/book";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";

const bookType = {
  Query: {
    getAllBook: combineResolvers(access.accessFaculty, async () => {
      try {
        const getAllBook = await Book?.find({ isDeleted: false });
        if (getAllBook?.length > 0) {
          return getAllBook;
        } else {
          throw new Error("Data is Mot Found");
        }
      } catch (error) {
        throw new Error(error?.message);
      }
    }),
  },
  Mutation: {
    createBook: combineResolvers(
      access.accessFaculty,
      async (parent, args, context, info) => {
        try {
          const title = args.createbookmodel.title;
          const checkBook = await Book?.findOne({ title });
          if (!checkBook) {
            const createBook = await Book?.create(args?.createbookmodel);
            return createBook;
          } else {
            throw new Error("Book already exists");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    updateBook: combineResolvers(
      access.accessFaculty,
      async (parent, args, context, info) => {
        try {
          const title = args?.updatebookmodel?.title;
          const checkBook = await Book?.findOne({ title });
          const getBook = await Book?.find({ _id: args?.id, isDeleted: false });
          if (getBook?.length > 0) {
            if (!checkBook || checkBook?._id?.toString() === args?.id) {
              const updateBook = await Book?.findByIdAndUpdate(
                args?.id,
                args?.updatebookmodel,
                { new: true }
              );
              return updateBook;
            } else {
              throw new Error("Book already exists");
            }
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    deleteBook: combineResolvers(
      access.accessFaculty,
      async (parent, args, context, info) => {
        try {
          const deleteBook = await Book?.findByIdAndUpdate(
            args?.id,
            { $set: { isDeleted: true } },
            { new: true }
          );
          return deleteBook;
        } catch (error) {
          throw new Error("Error in deleteBook", error);
        }
      }
    ),
  },
};
export default bookType;
