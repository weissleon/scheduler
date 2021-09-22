import { useMutation } from "react-query";
import { request, gql } from "graphql-request";
import { useQueryClient } from "react-query";

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

export const useAddSchedule = () =>
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
        const queryClient = useQueryClient();
        queryClient.invalidateQueries("schedules");
      },
    }
  );
