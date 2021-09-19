import { User } from "@models/user";

export const resolvers = {
  Query: {
    name: (parent: any, args: any, context: any) => {
      return "Denis Cho";
    },
    users: async () => {
      const users = await User.find();
      return users;
    },
    user: async (parent: any, { id }: { id: string }, context: any) => {
      const user = await User.findById(id);
      return user;
    },
  },
  Mutation: {
    deleteUser: async (parent: any, { id }: { id: string }, context: any) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    },
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
      await User.findByIdAndUpdate(id, data);
      return await User.findById(id);
    },
  },
};
