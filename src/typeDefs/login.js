import { gql } from "apollo-server-express";

const loginType = gql`
  scalar Date
  type LoginModel {
    id: ID
    firstName: String
    lastName: String
    email: String
    gender: String
    role: ID
    class: ID
    subject: ID
    enrno: String
    token: String
  }

  input loginInput {
    email: String
    password: String
  }
  type Mutation {
    loginUser(loginmodel: loginInput): LoginModel
  }
`;

export default loginType;
