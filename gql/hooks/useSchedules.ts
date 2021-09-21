import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

const ENDPOINT = "/api/graphql";
const GQL_CMD = gql`
  query {
    schedules {
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
        permission
        status
      }
      title
      detail
      tsStart
      tsEnd
      tsCreated
      tsLastUpdated
    }
  }
`;
export const useSchedules = () =>
  useQuery("schedules", async () => await request(ENDPOINT, GQL_CMD));
