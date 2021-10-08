import { NextPage } from "next";
import SideBar from "@components/dashboard/common/SideBar";
import AppBar from "@components/dashboard/common/AppBar";
import TodayScheduleDisplay from "@components/dashboard/home/TodayScheduleDisplay";
import WeeklyPinnedDisplay from "@components/dashboard/home/WeeklyPinnedDisplay";
import PendingScheduleDisplay from "@components/dashboard/home/PendingScheduleDisplay";
import Fab from "@components/Fab";
const NewSchedule: NextPage = () => {
  return (
    <>
      <div className="flex flex-row max-w-full">
        <SideBar />
        <div className="w-[calc(100vw-240px)] flex flex-col px-8">
          <section>
            <AppBar />
          </section>
          <main className="relative w-full min-h-[calc(100vh-96px)] flex flex-row gap-y-8 px-4 py-12 rounded-3xl gap-x-4 bg-gray-100">
            <TodayScheduleDisplay />
            {/* Second Column  */}
            <div className="relative flex flex-col w-5/12 h-full gap-y-4">
              <WeeklyPinnedDisplay />
              <PendingScheduleDisplay />
            </div>
          </main>
        </div>
      </div>
      {/* FAB */}
      <div className="fixed bottom-6 right-6">
        <Fab />
      </div>
    </>
  );
};

export default NewSchedule;
