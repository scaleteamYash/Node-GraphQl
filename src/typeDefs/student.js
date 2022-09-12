import { gql } from "apollo-server-express";

const studentType = gql`
  scalar Date
  type StudentModel {
    id: ID
    firstName: String
    lastName: String
    email: String
    gender: String
    role: ID
    subject: ID
    enrno: String
  }
  type roleModel {
    id: ID
    roleName: String
  }
  type studentModel {
    id: ID
    firstName: String
    lastName: String
    email: String
    gender: String
    role: roleModel
    subject: SubjectModel
    enrno: String
  }
  extend type Query {
    getAllStudent: [studentModel]
    getStudent(id: ID!): studentModel
  }
  input StudentInput {
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    enrno: String!
    password: String!
  }
  input StudentUpdateInput {
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    enrno: String!
    password: String!
  }

  extend type Mutation {
    createStudent(studentmodel: StudentInput): StudentModel
    updateStudent(id: ID!, studentupdatemodel: StudentUpdateInput): StudentModel
    deleteStudent(id: ID!): String
  }
`;
export default studentType;
