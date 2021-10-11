import { User } from "@models/user";
import React, { FC } from "react";
import FriendDisplayHeader from "./FriendDisplayHeader";
import FriendList from "./FriendList";

type Props = {
  className?: string | undefined;
  friendList: User[];
};
const FriendDisplay: FC<Props> = ({ friendList, className }) => {
  return (
    <div
      className={
        "relative grid content-start w-full py-8 bg-white rounded-lggap-y-8 auto-rows-auto" +
        ` ${className}`
      }
    >
      <FriendDisplayHeader />
      <FriendList friendList={friendList} />
    </div>
  );
};

export default FriendDisplay;
