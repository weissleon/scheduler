import { ScheduleStatus } from "@util/app/ScheduleManager";
import mongoose from "mongoose";
import { User } from "./user";

export type ScheduleSchema = {
  _id: mongoose.ObjectId;
  creatorId: mongoose.ObjectId;
  participants: Participant[];
  status: number;
  title: string;
  detail: string;
  tsStart: number;
  tsEnd: number;
  tsCreated: number;
  tsLastUpdated: number;
};

// TODO Further Implementation Required.
enum ParticipantPermission {
  NONE = 0,
  ADD_PARTICIPANT = 1,
  DELETE_SCHEDULE = 2,
}

// TODO Further Implementation Required.
enum ParticipantStatus {}

type Participant = {
  id?: string;
  name?: string;
  email?: string;
  inviter?: User;
  permission?: ParticipantPermission;
  status?: ParticipantStatus;
  addedAt?: number;
  updatedAt?: number;
};

export type Schedule = {
  id?: string;
  creator?: User;
  participants?: Participant[];
  status?: ScheduleStatus;
  title?: string;
  detail?: string;
  startAt?: number;
  endAt?: number;
  createdAt?: number;
  updatedAt?: number;
};

export type ParticipantSchema = {
  userId: mongoose.ObjectId;
  inviterId: mongoose.ObjectId;
  permission: number;
  status: number;
};

const ParticipantSchema = new mongoose.Schema<ParticipantSchema>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    inviterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    permission: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const ScheduleSchema = new mongoose.Schema<ScheduleSchema>({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participants: {
    type: [ParticipantSchema],
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  tsStart: {
    type: Number,
    required: true,
  },
  tsEnd: {
    type: Number,
    required: true,
  },
  tsCreated: {
    type: Number,
    required: true,
  },
  tsLastUpdated: {
    type: Number,
    required: true,
  },
});

export const Schedule: mongoose.Model<ScheduleSchema, {}, {}> =
  mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);
