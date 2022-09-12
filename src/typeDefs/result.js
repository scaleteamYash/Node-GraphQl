import { gql } from "apollo-server-express";

const resultType = gql`
  type scoreD {
    subject: ID
    total: Int
    marksObtain: Int
  }
  type ResultModel {
    id: ID
    faculty: ID
    student: ID
    class: ID
    score: [scoreD]
    totalSubjectMarks: Int
    totalObtainMarks: Int
    result: String
    grade: String
    percentage: Int
  }
  type scoreDB {
    subject: SubjectModel
    total: Int
    marksObtain: Int
  }
  type resultModel {
    id: ID
    faculty: facultyModel
    student: studentModel
    class: ClassModel
    score: [scoreDB]
    totalSubjectMarks: Int
    totalObtainMarks: Int
    result: String
    grade: String
    percentage: Int
  }
  type Query {
    getAllResult(id: ID!): [resultModel]
    getResult(id: ID!): resultModel
  }
  input ScoreD {
    subject: ID
    total: Int
    marksObtain: Int
  }
  input ResultInput {
    student: ID
    score: [ScoreD]
  }

  type Mutation {
    createResult(createresultmodel: ResultInput): ResultModel
    updateResult(id: ID!, updateresultmodel: ResultInput): ResultModel
    deleteResult(id: ID!): String
  }
`;

export default resultType;
