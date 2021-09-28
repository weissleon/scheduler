import { useMutation, useQueryClient } from "react-query";
import { request, gql } from "graphql-request";

type Filter = {
  scheduleId: string;
};

const ENDPOINT_URL = "/api/graphql";
const DELETE_SCHEDULE_QUERY = gql`
  mutation DeleteSchedule($scheduleId: String!) {
    deleteSchedule(id: $scheduleId) {
      _id
      title
    }
  }
`;

export const useDeleteSchedule = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (filter: Filter) =>
      await request(ENDPOINT_URL, DELETE_SCHEDULE_QUERY, filter),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules", userId]);
      },
    }
  );
};
