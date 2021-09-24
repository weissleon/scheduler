import { QueryClient, useMutation } from "react-query";
import { request, gql } from "graphql-request";

type ScheduleInput = {
  creatorId: string;
  participants: {
    userId: string;
    inviterId: string;
    permission: number;
    status: number;
  }[];
  title: string;
  detail: string;
  tsStart: number;
  tsEnd: number;
};

export const useAddSchedule = (userId: string, queryClient: QueryClient) =>
  useMutation(
    async (data: ScheduleInput) =>
      await request(
        "/api/graphql",
        gql`
          mutation AddSchedule($data: ScheduleInput!) {
            addSchedule(data: $data) {
              _id
            }
          }
        `,
        { data }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules", userId]);
      },
    }
  );
