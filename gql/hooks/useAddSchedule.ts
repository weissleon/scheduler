import { useMutation, useQueryClient } from "react-query";
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

const ENDPOINT_URL = "/api/graphql";
const ADD_SCHEDULE_QUERY = gql`
  mutation AddSchedule($data: ScheduleInput!) {
    addSchedule(data: $data) {
      _id
    }
  }
`;

export const useAddSchedule = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: ScheduleInput) =>
      await request(ENDPOINT_URL, ADD_SCHEDULE_QUERY, { data }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules", userId]);
      },
    }
  );
};
