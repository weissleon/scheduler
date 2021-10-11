import { User } from "@models/user";
import React, { FC } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import FriendListItem from "./FriendListItem";

type Props = {
  friendList: User[];
};
const FriendList: FC<Props> = ({ friendList = [] }) => {
  return (
    <SimpleBar className="w-full h-full px-4 py-2 overflow-y-auto">
      <div className="relative flex flex-col w-full h-full gap-y-4">
        {friendList.length > 0 &&
          friendList.map((friend) => <FriendListItem friend={friend} />)}
      </div>
    </SimpleBar>
  );
};

export default FriendList;
