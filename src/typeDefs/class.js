import { gql } from "apollo-server-express";

const classType = gql`
  type ClassModel {
    id: ID!
    className: String!
  }
  extend type Query {
    getAllClass: [ClassModel]
    getClass(id: ID!): ClassModel
  }
  input ClassInput {
    className: String!
  }
  extend type Mutation {
    createClass(classmodel: ClassInput): ClassModel
    updateClass(id: ID!, classmodel: ClassInput): ClassModel
    deleteClass(id: ID!): String
  }
`;

export default classType;
