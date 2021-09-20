import { useMutation } from "react-query";
import { request, gql } from "graphql-request";

export const useAddUser = () =>
  useMutation(
    async (data: { name: string; email: string; password: string }) =>
      await request(
        "/api/graphql",
        gql`
          mutation AddUser($data: UserInput!) {
            addUser(data: $data) {
              _id
              name
              email
              password
            }
          }
        `,
        { data }
      )
  );
