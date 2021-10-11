import { NextPage } from "next";
import React from "react";
import Logo from "@components/dashboard/common/Logo";
import UserDisplay from "@components/dashboard/common/UserDisplay";
import WeeklyPinnedDisplay from "@components/dashboard/home/WeeklyPinnedDisplay";
import PendingScheduleDisplay from "@components/dashboard/home/PendingScheduleDisplay";
import TodayScheduleDisplay from "@components/dashboard/home/TodayScheduleDisplay";
import FriendDisplay from "@components/dashboard/home/FriendDisplay";

// * DUMMY DATA
import schedules from "@data/schedules.json";
import friends from "@data/users.json";

const Dashboard: NextPage = () => {
  return (
    <>
      {/* Background */}
      <div className="absolute grid w-full min-h-screen content-start grid-cols-12 grid-rows-[auto,1fr,1fr,1fr,1fr,1fr]">
        <div className="col-span-4 col-start-1 row-span-6 row-start-1 bg-gray-50"></div>
      </div>
      <main className="relative px-16 gap-y-8 gap-x-16 grid w-full py-12 min-h-screen content-start grid-cols-12 grid-rows-[auto,1fr,1fr,1fr,1fr,1fr]">
        <Logo className="col-span-4 col-start-1 row-span-1 row-start-1" />
        <UserDisplay className="col-span-3 col-start-10 row-span-1 row-start-1 justify-self-end" />
        <WeeklyPinnedDisplay className="col-span-4 col-start-1 row-span-3 row-start-2 bg-transparent" />
        <PendingScheduleDisplay className="col-span-4 col-start-1 row-span-2 row-start-5 bg-transparent" />
        <TodayScheduleDisplay
          schedules={schedules}
          className="col-span-5 col-start-5 row-span-6 row-start-1"
        />
        <FriendDisplay
          className="col-span-3 col-start-10 row-span-5 row-start-2"
          friendList={friends}
        />
      </main>
    </>
  );
};

export default Dashboard;
