import { Schedule } from "@models/schedule";
import { User } from "@models/user";
import { TimestampScalar } from "./Scalars";
import mongoose from "mongoose";

export const resolvers = {
  Timestamp: TimestampScalar,
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
    schedules: async () => {
      const schedules = await Schedule.find();
      return schedules;
    },
    schedule: async (_: any, { id }: { id: string }, context: any) => {
      const schedule = await Schedule.findById(id);
      return schedule;
    },
  },
  Mutation: {
    addUser: async (parent: any, { data }: { data: User }, context: any) => {
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
      { id, data }: { id: string; data: User },
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
      { data }: { data: Schedule },
      context: any
    ) => {
      const newSchedule = new Schedule({
        creatorId: data.creatorId,
        participants: data.participants,
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
      { id, data }: { id: string; data: Schedule },
      context: any
    ) => {
      const updatedSchedule = await User.findByIdAndUpdate(id, data, {
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
  },
};
