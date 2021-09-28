import mongoose from "mongoose";

export type Schedule = {
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

export type Participant = {
  userId: mongoose.ObjectId;
  inviterId: mongoose.ObjectId;
  permission: number;
  status: number;
};

const ParticipantSchema = new mongoose.Schema<Participant>(
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

const ScheduleSchema = new mongoose.Schema<Schedule>({
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

export const Schedule: mongoose.Model<Schedule, {}, {}> =
  mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);
