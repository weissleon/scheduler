import { User } from "@models/user";
import React, { FC, useState } from "react";
import Avatar from "react-avatar";

type Props = {
  friend: User;
};
const FriendListItem: FC<Props> = ({ friend }) => {
  return (
    <div className="relative grid items-center content-start justify-start w-full grid-flow-col px-4 py-2 shadow-sm gap-x-8 auto-cols-auto min-w-min rounded-xl">
      {/* Avatar */}
      <Avatar value={friend.id} name={friend.name} round={true} size="36" />
      {/* Name */}
      <h2 className="text-lg font-normal text-gray-700">{friend.name}</h2>
    </div>
  );
};

export default FriendListItem;
