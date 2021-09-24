import { QueryClient, useMutation } from "react-query";
import { request, gql } from "graphql-request";

type Filter = {
  scheduleId: string;
};

export const useDeleteSchedule = (userId: string, queryClient: QueryClient) =>
  useMutation(
    async (filter: Filter) =>
      await request(
        "/api/graphql",
        gql`
          mutation DeleteSchedule($scheduleId: String!) {
            deleteSchedule(id: $scheduleId) {
              _id
              title
            }
          }
        `,
        filter
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules", userId]);
      },
    }
  );
