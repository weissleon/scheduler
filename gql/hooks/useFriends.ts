import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const ENDPOINT = "/api/graphql";
const GQL_CMD = gql`
  query Friends($userId: String!) {
    user(id: $userId) {
      friends {
        _id
        name
      }
    }
  }
`;
export const useFriends = (filter: { userId: string }) =>
  useQuery(
    "schedules",
    async () => await request(ENDPOINT, GQL_CMD, { ...filter })
  );
