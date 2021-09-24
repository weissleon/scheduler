import { QueryClient, useMutation } from "react-query";
import { request, gql } from "graphql-request";
import { ScheduleStatus } from "@util/app/ScheduleManager";

type Filter = {
  participantStatus: ScheduleStatus;
};

type Schedule = {
  _id: string;
  creator: {
    _id: string;
    name: string;
  };
  participants: {
    user: {
      _id: string;
      name: string;
    };
    inviter: {
      _id: string;
      name: string;
    };
    permission: number;
    status: number;
  }[];
  title: string;
  detail: string;
  tsStart: number;
  tsEnd: number;
  tsCreated: number;
  tsLastUpdated: number;
};

export const useUpdateParticipantStatus = (
  schedule: Schedule,
  userId: string,
  queryClient: QueryClient
) => {
  return useMutation(
    async (filter: Filter) => {
      const { participants } = schedule;

      const newParticipantList = [];
      newParticipantList.push(
        ...participants
          .filter((participant) => participant.user._id != userId)
          .map((participant) => ({
            userId: participant.user._id,
            inviterId: participant.inviter._id,
            permission: participant.permission,
            status: participant.status,
          }))
      );

      newParticipantList.push(
        ...participants
          .filter((participant) => participant.user._id == userId)
          .map((participant) => ({
            userId: participant.user._id,
            inviterId: participant.inviter._id,
            permission: participant.permission,
            status: filter.participantStatus,
          }))
      );

      return await request(
        "/api/graphql",
        gql`
          mutation UpdateSchedule($scheduleId: String!, $data: ScheduleInput!) {
            updateSchedule(id: $scheduleId, data: $data) {
              title
            }
          }
        `,
        { scheduleId: schedule._id, data: { participants: newParticipantList } }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules", userId]);
      },
    }
  );
};
