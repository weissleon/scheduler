import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const ENDPOINT = "/api/graphql";
const USER_QUERY = gql`
  query GetUser($userId: String!) {
    user(id: $userId) {
      _id
      name
      email
    }
  }
`;
export const useUser = (filter: { userId: string }) =>
  useQuery(
    ["user", filter.userId],
    async () => await request(ENDPOINT, USER_QUERY, filter)
  );
