import BookIssue from "../models/bookIssue";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";
import moment from "moment";

const bookIssueType = {
  Query: {
    getAllBookIssue: combineResolvers(access.accessFaculty, async () => {
      try {
        const getAllBookIssue = await BookIssue?.find({
          isDeleted: false,
        }).populate([
          {
            path: "studentid",
            populate: [{ path: "subject" }, { path: "role" }],
          },
          { path: "bookid" },
        ]);

        if (getAllBookIssue) {
          for (let i = 0; i < getAllBookIssue; i++) {
            if (!getAllBookIssue[i]?.isReturn) {
              const given = moment(
                getAllBookIssue[i]?.returnDate,
                "MM-DD-YYYY"
              );
              const current = moment().startOf("day");
              const differentDay = moment
                .duration(given.diff(current))
                .asDays();
              if (differentDay < 0) {
                getAllBookIssue[i].penalty = -(differentDay * 10);
                getAllBookIssue[i]?.save();
              }
            } else {
              const given = moment(
                getAllBookIssue[i]?.returnDate,
                "MM-DD-YYYY"
              );
              const updateDate = moment(
                moment(new Date(getAllBookIssue[i]?.updatedAt)).format("L"),
                "MM-DD-YYYY"
              );

              const differentDay = moment
                .duration(given.diff(updateDate))
                .asDays();
              if (differentDay < 0) {
                getAllBookIssue[i].penalty = -(differentDay * 10);
                getAllBookIssue[i]?.save();
              }
            }
          }
          return getAllBookIssue;
        } else {
          throw new Error("Data is Not Found");
        }
      } catch (error) {
        throw new Error(error?.message);
      }
    }),
  },
  Mutation: {
    createBookIssue: combineResolvers(
      access.accessFaculty,
      async (parent, args, context, info) => {
        try {
          const bookid = args?.createbookIssuemodel?.bookid;
          const studentid = args?.createbookIssuemodel?.studentid;
          const checkBookIssue = await BookIssue?.findOne({
            bookid,
            studentid,
          });
          if (!checkBookIssue) {
            const createBookIssue = await BookIssue?.create(
              args?.createbookIssuemodel
            );
            const returnDays = createBookIssue?.returnDays;
            createBookIssue.returnDate = moment(
              moment(new Date(createBookIssue?.createdAt)).format("L"),
              "MM-DD-YYYY"
            )
              .add(returnDays, "days")
              .calendar();
            createBookIssue?.save();
            return createBookIssue;
          } else {
            throw new Error("BookIssue already exists");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    updateBookIssue: combineResolvers(
      access.accessFaculty,
      async (parent, args, context, info) => {
        try {
          const bookid = args?.updatebookIssuemodel?.bookid;
          const studentid = args?.updatebookIssuemodel?.studentid;
          const checkBookIssue = await BookIssue?.findOne({
            bookid,
            studentid,
          });
          const getBookIssue = await BookIssue?.find({
            _id: args?.id,
            isDeleted: false,
          });
          if (getBookIssue?.length > 0) {
            if (
              !checkBookIssue ||
              checkBookIssue?._id?.toString() === args?.id
            ) {
              const updateBookIssue = await BookIssue?.findByIdAndUpdate(
                args?.id,
                args?.updatebookIssuemodel,
                { new: true }
              );
              const returnDays = updateBookIssue?.returnDays;
              updateBookIssue.returnDate = moment(
                moment(new Date(updateBookIssue?.createdAt)).format("L"),
                "MM-DD-YYYY"
              )
                .add(returnDays, "days")
                .calendar();
              updateBookIssue?.save();
              return updateBookIssue;
            } else {
              throw new Error("BookIssue already exists");
            }
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    deleteBookIssue: combineResolvers(
      access.accessFaculty,
      async (parent, args, context, info) => {
        try {
          const deleteBookIssue = await BookIssue?.findByIdAndUpdate(
            args?.id,
            { $set: { isDeleted: true } },
            { new: true }
          );
          return deleteBookIssue;
        } catch (error) {
          throw new Error("Error in deleteBookIssue", error);
        }
      }
    ),
  },
};
export default bookIssueType;
