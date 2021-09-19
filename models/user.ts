import mongoose from "mongoose";

export type User = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
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
  tsCreated: {
    type: Number,
  },
});

export const User: mongoose.Model<User, {}, {}> =
  mongoose.models.User || mongoose.model("User", UserSchema);
