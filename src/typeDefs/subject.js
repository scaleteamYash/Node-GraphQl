import { gql } from "apollo-server-express";

const subject = gql`
  scalar Int

  type SubjectModel {
    id: ID
    subjectName: String
    subjectCode: Int
  }
  extend type Query {
    getAllSubject: [SubjectModel]
    getSubject(id: ID!): SubjectModel
  }
  input SubjectInput {
    subjectName: String!
    subjectCode: Int!
  }
  extend type Mutation {
    createSubject(subjectmodel: SubjectInput): SubjectModel
    updateSubject(id: ID!, subjectmodel: SubjectInput): SubjectModel
    deleteSubject(id: ID!): String
  }
`;

export default subject;
