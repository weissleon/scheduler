import { Schedule, ScheduleSchema } from "@models/schedule";
import { User, UserSchema } from "@models/user";
import { Ticket } from "@models/ticket";
import { GraphQLObjectIdScalar, TimestampScalar } from "./Scalars";
import mongoose from "mongoose";
import { ScheduleStatus } from "@util/app/ScheduleManager";
import { addHours } from "date-fns";

export const resolvers = {
  Timestamp: TimestampScalar,
  GraphQLObjectId: GraphQLObjectIdScalar,
  User: {
    schedules: async ({ _id }: { _id: string }, __: any, context: any) => {
      const schedules = await Schedule.find({
        participants: { $elemMatch: { userId: _id } },
      });
      return schedules;
    },
    friends: async (
      { friendIds }: { friendIds: mongoose.ObjectId[] },
      __: any,
      context: any
    ) => {
      const friends = await User.find({ _id: { $in: friendIds } });
      return friends;
    },
  },
  Ticket: {
    allower: async (
      { allowerId }: { allowerId: string },
      __: any,
      context: any
    ) => {
      const allower = await User.findById(allowerId);
      return allower;
    },
    allowee: async (
      { alloweeId }: { alloweeId: string },
      __: any,
      context: any
    ) => {
      const allowee = await User.findById(alloweeId);
      return allowee;
    },
  },

  Participant: {
    user: async ({ userId }: { userId: string }, __: any, context: any) => {
      const user = await User.findById(userId);
      return user;
    },
    inviter: async (
      { inviterId }: { inviterId: string },
      __: any,
      context: any
    ) => {
      const user = await User.findById(inviterId);
      return user;
    },
  },
  Schedule: {
    creator: async (
      { creatorId }: { creatorId: string },
      __: any,
      context: any
    ) => {
      const user = await User.findById(creatorId);
      return user;
    },
  },
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async (parent: any, { id }: { id: string }, context: any) => {
      const user = await User.findById(id);
      return user;
    },
    userExist: async (
      parent: any,
      { email }: { email: string },
      context: any
    ) => {
      const user = await User.findOne({ email: email });
      return user ? true : false;
    },

    ticketsByAllowerId: async (
      parent: any,
      { allowerId }: { allowerId: mongoose.ObjectId },
      context: any
    ) => {
      const tickets = await Ticket.find({
        allowerId: allowerId,
      });
      return tickets;
    },

    ticketByMutualIds: async (
      parent: any,
      {
        allowerId,
        alloweeId,
      }: { allowerId: mongoose.ObjectId; alloweeId: mongoose.ObjectId },
      context: any
    ) => {
      const ticket = await Ticket.findOne({
        allowerId: allowerId,
        alloweeId: alloweeId,
      });
      if (ticket && ticket.expiresAt < Date.now().valueOf()) return null;
      return ticket;
    },

    friends: async (
      parent: any,
      { userId }: { userId: string },
      context: any
    ) => {
      const user = await User.findById(userId);
      const friends = await User.find({ _id: { $in: user!.friendIds } });
      return friends;
    },
    schedules: async (
      _: any,
      { filter: { id } }: { filter: { id: string } },
      context: any
    ) => {
      let schedules;
      if (id)
        schedules = await Schedule.find({
          participants: { $elemMatch: { userId: id } },
        });
      if (!id) schedules = await Schedule.find();
      return schedules;
    },
    schedule: async (_: any, { id }: { id: string }, context: any) => {
      const schedule = await Schedule.findById(id);
      return schedule;
    },
  },
  Mutation: {
    addUser: async (
      parent: any,
      { data }: { data: UserSchema },
      context: any
    ) => {
      const newUser = new User({
        email: data.email,
        name: data.name,
        password: data.password,
        tsCreated: Date.now().valueOf(),
      });
      return await newUser.save();
    },
    updateUser: async (
      parent: any,
      { id, data }: { id: string; data: UserSchema },
      context: any
    ) => {
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
      return updatedUser;
    },
    deleteUser: async (parent: any, { id }: { id: string }, context: any) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    },
    addSchedule: async (
      parent: any,
      { data }: { data: ScheduleSchema },
      context: any
    ) => {
      const newSchedule = new Schedule({
        creatorId: data.creatorId,
        participants: data.participants,
        status:
          data.participants.length == 1
            ? ScheduleStatus.CONFIRMED
            : ScheduleStatus.PENDING,
        title: data.title,
        detail: data.detail,
        tsStart: data.tsStart,
        tsEnd: data.tsEnd,
        tsCreated: Date.now(),
        tsLastUpdated: Date.now(),
      });
      return await newSchedule.save();
    },
    updateSchedule: async (
      parent: any,
      { id, data }: { id: string; data: ScheduleSchema },
      context: any
    ) => {
      const updatedSchedule = await Schedule.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedSchedule;
    },

    deleteSchedule: async (
      parent: any,
      { id }: { id: string },
      context: any
    ) => {
      const deletedSchedule = await Schedule.findByIdAndDelete(id);
      return deletedSchedule;
    },
    createTicket: async (
      parent: any,
      {
        data: { allowerId, alloweeId },
      }: {
        data: { allowerId: mongoose.ObjectId; alloweeId: mongoose.ObjectId };
      },
      context: any
    ) => {
      const allower = await User.findById(allowerId);
      if (allower?.friendIds.includes(alloweeId)) return null;
      const ticket = await Ticket.findOne({
        allowerId: allowerId,
        alloweeId: alloweeId,
      });
      if (ticket) {
        ticket.expiresAt = addHours(Date.now(), 1).valueOf();
        const result = await ticket.save();
        return result;
      }
      const newTicket = new Ticket({
        allowerId: allowerId,
        alloweeId: alloweeId,
        createdAt: Date.now().valueOf(),
        expiresAt: addHours(Date.now(), 1),
      });
      const result = await newTicket.save();
      return result;
    },

    createTicketByEmail: async (
      parent: any,
      {
        data: { allowerId, email },
      }: {
        data: { allowerId: mongoose.ObjectId; email: string };
      },
      context: any
    ) => {
      const allower = await User.findById(allowerId);
      const allowee = await User.findOne({ email: email });
      if (!allowee) return null;
      if (allower?.friendIds.includes(allowee?._id)) return null;
      const ticket = await Ticket.findOne({
        allowerId: allowerId,
        alloweeId: allowee._id,
      });
      if (ticket) {
        ticket.expiresAt = addHours(Date.now(), 1).valueOf();
        const result = await ticket.save();
        return result;
      }
      const newTicket = new Ticket({
        allowerId: allowerId,
        alloweeId: allowee?._id,
        createdAt: Date.now().valueOf(),
        expiresAt: addHours(Date.now(), 1).valueOf(),
      });
      const result = await newTicket.save();
      return result;
    },

    addFriend: async (
      parent: any,
      {
        data: { userId, friendId },
      }: {
        data: { userId: mongoose.ObjectId; friendId: mongoose.ObjectId };
      },
      context: any
    ) => {
      const ticket = await Ticket.findOne({ allowerId: friendId });
      if (!ticket) return null;
      await Ticket.findOneAndDelete({ allowerId: userId, alloweeId: friendId });
      await Ticket.findOneAndDelete({ allowerId: friendId, alloweeId: userId });
      const me = await User.findById(userId);
      me?.friendIds.push(friendId);
      await me?.save();
      const friend = await User.findById(friendId);
      friend?.friendIds.push(userId);
      await friend?.save();
      return friend;
    },
    addFriendByEmail: async (
      parent: any,
      {
        data: { userId, email },
      }: {
        data: { userId: mongoose.ObjectId; email: string };
      },
      context: any
    ) => {
      const friend = await User.findOne({ email: email });
      if (!friend) return null;
      const ticket = await Ticket.findOne({ allowerId: friend.id });
      if (!ticket) return null;
      await Ticket.findOneAndDelete({
        allowerId: userId,
        alloweeId: friend.id,
      });
      await Ticket.findOneAndDelete({
        allowerId: friend.id,
        alloweeId: userId,
      });
      const me = await User.findById(userId);
      me?.friendIds.push(friend.id);
      await me?.save();
      friend?.friendIds.push(userId);
      await friend?.save();
      return friend;
    },
  },
};
