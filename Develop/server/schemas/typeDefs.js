const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type BookInput {
    authors: [String]
    description: String
    title: String!
    bookId: String!
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, password: String!, email: String!): Auth
    saveBook(bookId: ID!): Book
    removeBook(bookId: ID!): Book
  }
`;

module.exports = typeDefs;