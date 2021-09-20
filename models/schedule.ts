import mongoose from "mongoose";

export type Schedule = {
  _id: mongoose.ObjectId;
  creatorId: string;
  participants: Participant[];
  title: string;
  detail: string;
  tsStart: number;
  tsEnd: number;
  tsCreated: number;
  tsLastUpdated: number;
};

export type Participant = {
  userId: string;
  inviterId: string;
  permission: number;
  status: number;
};

const ParticipantSchema = new mongoose.Schema<Participant>(
  {
    userId: {
      type: String,
      required: true,
    },
    inviterId: {
      type: String,
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

const ScheduleSchema = new mongoose.Schema<Schedule>({
  creatorId: {
    type: String,
    required: true,
  },
  participants: {
    type: [ParticipantSchema],
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

export const Schedule: mongoose.Model<Schedule, {}, {}> =
  mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);
