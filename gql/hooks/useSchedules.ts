import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

type Schedule = {
  schedules: {
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
  }[];
};
const ENDPOINT = "/api/graphql";
const GQL_CMD = gql`
  query Schedules($filter: ScheduleFilter!) {
    schedules(filter: $filter) {
      _id
      creator {
        _id
        name
      }
      participants {
        user {
          _id
          name
        }
        inviter {
          _id
          name
        }
        permission
        status
      }
      status
      title
      detail
      tsStart
      tsEnd
      tsCreated
      tsLastUpdated
    }
  }
`;
export const useSchedules = (filter: { id: string }) =>
  useQuery<Schedule>(
    ["schedules", filter.id],
    async () => await request(ENDPOINT, GQL_CMD, { filter })
  );
