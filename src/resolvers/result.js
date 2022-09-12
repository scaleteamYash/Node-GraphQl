import Result from "../models/Result";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";

const resultType = {
  Query: {
    getAllResult: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getAllResult = await Result?.find({
            faculty: loginUser?.loginUser?._id,
            isDeleted: false,
          })
            .populate([
              {
                path: "faculty",
                populate: [
                  { path: "class" },
                  { path: "subject" },
                  { path: "role" },
                ],
              },
              {
                path: "student",
                populate: [{ path: "subject" }, { path: "role" }],
              },
              { path: "score", populate: [{ path: "subject" }] },
              { path: "class" },
            ])
            .sort({ percentage: 1 });

          if (getAllResult?.length > 0) {
            return getAllResult;
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    getResult: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getResult = await Result?.findOne({
            _id: args?.id,
            isDeleted: false,
            faculty: loginUser?.loginUser?._id,
          }).populate([
            {
              path: "faculty",
              populate: [
                { path: "class" },
                { path: "subject" },
                { path: "role" },
              ],
            },
            {
              path: "student",
              populate: [{ path: "subject" }, { path: "role" }],
            },
            { path: "score", populate: [{ path: "subject" }] },
            { path: "class" },
          ]);

          if (getResult) {
            return getResult;
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
    createResult: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const createResult = await Result?.create(args?.createresultmodel);

          createResult.faculty = loginUser?.loginUser?._id?.toString();
          createResult.class = loginUser?.loginUser?.class?.toString();

          let totalSubjectMarks = 0;
          let totalObtainMarks = 0;
          let minNumber = 100;
          for (let i = 0; i < args?.createresultmodel?.score?.length; i++) {
            totalSubjectMarks =
              totalSubjectMarks + args?.createresultmodel?.score[i]?.total;
            totalObtainMarks =
              totalObtainMarks + args?.createresultmodel?.score[i]?.marksObtain;
            if (args?.createresultmodel?.score[i]?.marksObtain <= minNumber) {
              minNumber = args?.createresultmodel?.score[i]?.marksObtain;
            }
          }
          createResult.totalSubjectMarks = totalSubjectMarks;
          createResult.totalObtainMarks = totalObtainMarks;
          if (minNumber < 23) {
            createResult.result = "fail";
          } else {
            createResult.result = "pass";
          }
          const percentage = (totalObtainMarks / totalSubjectMarks) * 100;
          createResult.percentage = percentage;
          if (minNumber < 23) {
            createResult.grade = "fail";
          } else if (createResult?.percentage >= 70) {
            createResult.grade = "distinction";
          } else if (
            createResult?.percentage >= 60 &&
            createResult?.percentage < 70
          ) {
            createResult.grade = "first class";
          } else if (
            createResult?.percentage >= 50 &&
            createResult?.percentage < 60
          ) {
            createResult.grade = "second class";
          } else {
            createResult.grade = "pass";
          }
          createResult?.save();
          return createResult;
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),

    updateResult: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getResult = await Result?.find({
            _id: args?.id,
            isDeleted: false,
            faculty: loginUser?.loginUser?._id,
          });
          if (getResult?.length > 0) {
            const updateResult = await Result?.findOneAndUpdate(
              { _id: args?.id },
              { $set: args?.updateresultmodel },
              { new: true }
            );
            let totalSubjectMarks = 0;
            let totalObtainMarks = 0;
            let minNumber = 100;
            for (let i = 0; i < args?.updateresultmodel?.score?.length; i++) {
              totalSubjectMarks =
                totalSubjectMarks + args?.updateresultmodel?.score[i]?.total;
              totalObtainMarks =
                totalObtainMarks +
                args?.updateresultmodel?.score[i]?.marksObtain;
              if (args?.updateresultmodel?.score[i]?.marksObtain <= minNumber) {
                minNumber = args?.updateresultmodel?.score[i]?.marksObtain;
              }
            }
            updateResult.totalSubjectMarks = totalSubjectMarks;
            updateResult.totalObtainMarks = totalObtainMarks;
            if (minNumber < 23) {
              updateResult.result = "fail";
            } else {
              updateResult.result = "pass";
            }
            const percentage = (totalObtainMarks / totalSubjectMarks) * 100;
            updateResult.percentage = percentage;
            if (minNumber < 23) {
              updateResult.grade = "fail";
            } else if (updateResult?.percentage >= 70) {
              updateResult.grade = "distinction";
            } else if (
              updateResult?.percentage >= 60 &&
              updateResult?.percentage < 70
            ) {
              updateResult.grade = "first class";
            } else if (
              updateResult?.percentage >= 50 &&
              updateResult?.percentage < 60
            ) {
              updateResult.grade = "second class";
            } else {
              updateResult.grade = "pass";
            }
            updateResult?.save();
            return updateResult;
          } else {
            throw new Error("Data is Not Found");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
    deleteResult: combineResolvers(
      access.accessFaculty,
      async (parent, args, loginUser, info) => {
        try {
          const getResult = await Result?.find({
            _id: args?.id,
            isDeleted: false,
            faculty: loginUser?.loginUser?._id,
          });
          if (getResult?.length > 0) {
            const deleteResult = await Result?.findByIdAndUpdate(
              args?.id,
              { $set: { isDeleted: true } },
              { new: true }
            );
            return deleteResult;
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
export default resultType;

