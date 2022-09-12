import { gql } from "apollo-server-express";

const bookType = gql`
  scalar Date
  type BookModel {
    id: ID
    title: String
    author: String
    publisher: String
    publishDate: Date
  }
  extend type Query {
    getAllBook: [BookModel]
  }
  input BookInput {
    title: String
    author: String
    publisher: String
  }

  extend type Mutation {
    createBook(createbookmodel: BookInput): BookModel
    updateBook(id: ID!, updatebookmodel: BookInput): BookModel
    deleteBook(id: ID!): String
  }
`;

export default bookType;
