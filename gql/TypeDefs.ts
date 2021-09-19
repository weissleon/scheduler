import { gql } from "apollo-server-core";

export const TypeDefs = gql`
type User: {
    email: String!
    password: String!
}`;
