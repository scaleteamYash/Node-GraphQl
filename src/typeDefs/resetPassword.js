import { gql } from "apollo-server-express";

const resetPasswordType = gql`
  input resetInput {
    currentPassword: String
    newPassword: String
  }
  type Mutation {
    resetPassword(id: ID!, resetmodel: resetInput): String
  }
`;

export default resetPasswordType;
