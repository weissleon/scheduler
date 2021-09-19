import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    _id: String!
    name: String!
    email: String!
    password: String!
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  type Query {
    name: String
    users: [User]
    user(id: String!): User
  }

  type Mutation {
    deleteUser(id: String!): User
    updateUser(id: String!, data: UserInput!): User
    addUser(data: UserInput!): User
  }
`;
