import { gql } from "apollo-server-express";

const facultyType = gql`
  scalar Date

  type FacultyModel {
    id: ID
    firstName: String
    lastName: String
    email: String
    gender: String
    role: ID
    class: ID
    subject: ID
  }
  type facultyModel {
    id: ID
    firstName: String
    lastName: String
    email: String
    gender: String
    role: roleModel
    class: ClassModel
    subject: SubjectModel
  }
  extend type Query {
    getAllFaculty: [facultyModel]
    getFaculty(id: ID!): facultyModel
  }
  input FacultyInput {
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    class: ID!
    subject: ID!
    password: String!
  }
  input FacultyUpdateInput {
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    class: ID!
    subject: ID!
  }
  extend type Mutation {
    createFaculty(facultymodel: FacultyInput): FacultyModel
    updateFaculty(id: ID!, facultyupdatemodel: FacultyUpdateInput): FacultyModel
    deleteFaculty(id: ID!): FacultyModel
  }
`;
export default facultyType;
