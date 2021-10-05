import { useMutation, useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { useQueryClient } from "react-query";

const ENDPOINT = "/api/graphql";
const GET_FRIENDS_QUERY = gql`
  query GetFriends($userId: String!) {
    friends(userId: $userId) {
      _id
      name
    }
  }
`;

const ADD_FRIENDS_BY_EMAIL_MUTATION = gql`
  mutation AddFriendByEmail($data: AddFriendByEmail!) {
    addFriendByEmail(data: $data) {
      name
    }
  }
`;

// * MAIN FUNCTION
export const useFriends = (filter: { userId: string }) => {
  const queryClient = useQueryClient();

  const { mutate: addFriendByEmail } = useMutation(
    async (email: string) => {
      await request(ENDPOINT, ADD_FRIENDS_BY_EMAIL_MUTATION, {
        data: { userId: filter.userId, email: email },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["friends", filter.userId]);
      },
    }
  );

  return {
    ...useQuery(
      ["friends", filter.userId],
      async () => await request(ENDPOINT, GET_FRIENDS_QUERY, filter)
    ),
    addFriendByEmail: addFriendByEmail,
  };
};
