import mongoose from "mongoose";

export type TicketSchema = {
  id: mongoose.ObjectId;
  allowerId: mongoose.ObjectId;
  alloweeId: mongoose.ObjectId;
  createdAt: number;
  expiresAt: number;
};

const TicketSchema = new mongoose.Schema<TicketSchema>({
  allowerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  alloweeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Number,
    required: true,
  },
});

export const Ticket: mongoose.Model<TicketSchema, {}, {}> =
  mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
