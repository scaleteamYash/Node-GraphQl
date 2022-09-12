import User from "../models/User";
import jwt from "jsonwebtoken";

const loginType = {
  Mutation: {
    loginUser: async (parent, args, context, info) => {
      try {
        const email = args?.loginmodel?.email;
        const password = args?.loginmodel?.password;
        const loginUser = await User?.findOne({ email: email });
        if (loginUser?.email) {
          const match = await loginUser?.validatePassword(password);
          if (match) {
            const token = jwt.sign({ loginUser }, process?.env?.JWT_SECRET);
            loginUser.token = token;
            loginUser?.save();

            return loginUser;
          } else {
            throw new Error("Email or Password are invalid");
          }
        }
      } catch (error) {
        throw new Error(error?.message);
      }
    },
  },
};
export default loginType;
