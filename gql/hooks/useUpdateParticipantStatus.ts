import { useQueryClient, useMutation } from "react-query";
import { request, gql } from "graphql-request";
import { ScheduleStatus } from "@util/app/ScheduleManager";

// * TYPES
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

  status: number;
  title: string;
  detail: string;
  tsStart: number;
  tsEnd: number;
  tsCreated: number;
  tsLastUpdated: number;
};

// * CONSTANTS
const ENDPOINT_URL = "/api/graphql";
const UPDATE_PARTICIPANT_QUERY = gql`
  mutation UpdateSchedule($scheduleId: String!, $data: ScheduleInput!) {
    updateSchedule(id: $scheduleId, data: $data) {
      title
    }
  }
`;

// * MAIN FUNCTION
export const useUpdateParticipantStatus = (
  schedule: Schedule,
  userId: string
) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (filter: Filter) => {
      const { participants: oldParticipants } = schedule;

      const newParticipants = oldParticipants.map((participant) => {
        if (participant.user._id == userId)
          return { ...participant, status: filter.participantStatus };
        return participant;
      });

      let confirmed = false;

      const result = newParticipants.find(
        (participant) => participant.status != ScheduleStatus.CONFIRMED
      );
      if (!result) confirmed = true;

      const participants = newParticipants.map((participant) => {
        return {
          userId: participant.user._id,
          inviterId: participant.inviter._id,
          permission: participant.permission,
          status: participant.status,
        };
      });

      const data = {
        participants: participants,
        status: confirmed ? ScheduleStatus.CONFIRMED : undefined,
      };

      return await request(ENDPOINT_URL, UPDATE_PARTICIPANT_QUERY, {
        scheduleId: schedule._id,
        data: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["schedules", userId]);
      },
    }
  );
};
