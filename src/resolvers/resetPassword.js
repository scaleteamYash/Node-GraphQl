import User from "../models/User";
import { combineResolvers } from "graphql-resolvers";
import access from "../middlewares/accessMiddlewares";
import bcrypt from "bcryptjs";

const resetPasswordType = {
  Mutation: {
    resetPassword: combineResolvers(
      access.accessFacultyOrStudent,
      async (parent, args, context, info) => {
        try {
          const findUser = await User?.findById(args.id);
          if (findUser) {
            const match = await findUser?.validatePassword(
              args?.resetmodel?.currentPassword
            );

            // if (match) {
            const newPassword = await bcrypt.hash(
              args?.resetmodel?.newPassword,
              10
            );
            const newData = await User?.findByIdAndUpdate(
              args?.id,
              { $set: { password: newPassword } },
              { new: true }
            );
            await newData?.save();
            return "Your password has been updated";
            // } else {
            //   throw new Error("Your password is incorrect");
            // }
          } else {
            throw new Error("User is Not found ");
          }
        } catch (error) {
          throw new Error(error?.message);
        }
      }
    ),
  },
};

export default resetPasswordType;
