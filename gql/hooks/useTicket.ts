import { useMutation, useQuery } from "react-query";
import { request, gql } from "graphql-request";

const ENDPOINT = "/api/graphql";
const CREATE_TICKET_BY_EMAIL_QUERY = gql`
  mutation ($data: CreateTicketByEmailInput!) {
    createTicketByEmail(data: $data) {
      id
    }
  }
`;

type Payload = {
  email: string;
};

export const useTicket = (filter: { userId: string }) => {
  const { mutate: createTicketByEmail } = useMutation(
    async (payload: Payload) => {
      return await request(ENDPOINT, CREATE_TICKET_BY_EMAIL_QUERY, {
        data: { allowerId: filter.userId, email: payload.email },
      });
    },
    { onSuccess: () => {} }
  );
  return { createTicketByEmail };
};
