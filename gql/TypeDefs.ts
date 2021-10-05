import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar Timestamp
  scalar GraphQLObjectId

  type User {
    _id: GraphQLObjectId!
    name: String!
    email: String!
    password: String!
    schedules: [Schedule!]
    friends: [User!]
  }

  type Ticket {
    id: GraphQLObjectId!
    allower: User!
    allowee: User!
    expiresAt: Timestamp!
    createdAt: Timestamp!
  }

  type Participant {
    # userId: String!
    user: User!
    inviter: User!
    permission: Int!
    status: Int!
  }

  type Schedule {
    _id: GraphQLObjectId!
    creator: User!
    participants: [Participant]!
    status: Int!
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
    creatorId: GraphQLObjectId
    participants: [ParticipantInput]
    status: Int
    title: String
    detail: String
    tsStart: Timestamp
    tsEnd: Timestamp
  }

  input ScheduleFilter {
    id: String
  }

  input ParticipantInput {
    userId: GraphQLObjectId
    inviterId: GraphQLObjectId
    permission: Int
    status: Int
  }

  input FriendFilter {
    userId: String
  }

  input TicketInput {
    allowerId: GraphQLObjectId
    alloweeId: GraphQLObjectId
  }
  input CreateTicketByEmailInput {
    allowerId: GraphQLObjectId
    email: String
  }

  input AddFriendByEmail {
    userId: GraphQLObjectId
    email: String
  }

  input AddFriendInput {
    userId: GraphQLObjectId
    friendId: GraphQLObjectId
  }

  type Query {
    users: [User]
    user(id: String!): User
    userExist(email: String!): Boolean
    schedules(filter: ScheduleFilter!): [Schedule]
    schedule: Schedule
    ticketsByAllowerId(allowerId: String!): [Ticket!]
    ticketByMutualIds(allowerId: String!, alloweeId: String!): Ticket
    friends(userId: String!): [User!]
  }

  type Mutation {
    createTicket(data: TicketInput!): Ticket
    createTicketByEmail(data: CreateTicketByEmailInput!): Ticket
    addUser(data: UserInput!): User
    updateUser(id: String!, data: UserInput!): User
    deleteUser(id: String!): User
    addSchedule(data: ScheduleInput!): Schedule
    updateSchedule(id: String!, data: ScheduleInput!): Schedule
    deleteSchedule(id: String!): Schedule
    addFriend(data: AddFriendInput!): User
    addFriendByEmail(data: AddFriendByEmail!): User
  }
`;
