import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar Timestamp

  type User {
    _id: String!
    name: String!
    email: String!
    password: String!
    schedules: [Schedule!]
    friends: [User!]
  }

  type Participant {
    # userId: String!
    user: User!
    inviter: User!
    permission: Int!
    status: Int!
  }

  type Schedule {
    _id: String!
    creator: User!
    participants: [Participant]!
    title: String!
    detail: String!
    tsStart: Timestamp!
    tsEnd: Timestamp!
    tsCreated: Timestamp!
    tsLastUpdated: Timestamp!
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  input ScheduleInput {
    creatorId: String
    participants: [ParticipantInput]
    title: String
    detail: String
    tsStart: Timestamp
    tsEnd: Timestamp
  }

  input ParticipantInput {
    userId: String
    inviterId: String
    permission: Int
    status: Int
  }

  type Query {
    users: [User]
    user(id: String!): User
    schedules: [Schedule]
    schedule: Schedule
  }

  type Mutation {
    addUser(data: UserInput!): User
    updateUser(id: String!, data: UserInput!): User
    deleteUser(id: String!): User
    addSchedule(data: ScheduleInput!): Schedule
    updateSchedule(id: String!, data: ScheduleInput!): Schedule
    deleteSchedule(id: String!): Schedule
  }
`;
