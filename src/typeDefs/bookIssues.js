import { gql } from "apollo-server-express";

const bookIssueType = gql`
  scalar Date
  type BookIssueModel {
    id: ID
    bookid: ID
    studentid: ID
    returnDays: Int
    isReturn: Boolean
    returnDate: String
    penalty: Int
  }
  type bookIssueModel {
    id: ID
    bookid: BookModel
    studentid: studentModel
    returnDays: Int
    isReturn: Boolean
    returnDate: String
    penalty: Int
  }
  type Query {
    getAllBookIssue: [bookIssueModel]
  }
  input BookIssueInput {
    bookid: ID
    studentid: ID
    returnDays: Int
  }

  type Mutation {
    createBookIssue(createbookIssuemodel: BookIssueInput): BookIssueModel
    updateBookIssue(
      id: ID!
      updatebookIssuemodel: BookIssueInput
    ): BookIssueModel
    deleteBookIssue(id: ID!): String
  }
`;

export default bookIssueType;
