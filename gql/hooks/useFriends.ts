import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const ENDPOINT = "/api/graphql";
const GET_FRIENDS_QUERY = gql`
  query GetFriends($userId: String!) {
    friends(userId: $userId) {
      _id
      name
    }
  }
`;

// * MAIN FUNCTION
export const useFriends = (filter: { userId: string }) =>
  useQuery(
    ["friends", filter.userId],
    async () => await request(ENDPOINT, GET_FRIENDS_QUERY, filter)
  );
