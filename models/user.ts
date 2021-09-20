import mongoose from "mongoose";

export type User = {
  _id: mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  friendIds: mongoose.ObjectId[];
  tsCreated?: number;
};

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friendIds: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: true,
  },
  tsCreated: {
    type: Number,
  },
});

export const User: mongoose.Model<User, {}, {}> =
  mongoose.models.User || mongoose.model("User", UserSchema);
