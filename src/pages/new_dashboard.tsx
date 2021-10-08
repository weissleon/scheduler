import { NextPage } from "next";
import SideBar from "@components/dashboard/common/SideBar";
import AppBar from "@components/dashboard/common/AppBar";
import TodayScheduleDisplay from "@components/dashboard/home/TodayScheduleDisplay";
import ScheduleStatusDisplay from "@components/dashboard/schedule/ScheduleStatusDisplay";
import Fab from "@components/Fab";
const NewSchedule: NextPage = () => {
  return (
    <>
      <div className="max-w-full flex flex-row">
        <SideBar />
        <div className="w-[calc(100vw-240px)] flex flex-col px-8">
          <section>
            <AppBar />
          </section>
          <main className="relative w-full min-h-[calc(100vh-96px)] flex flex-col gap-y-8 px-4 py-12 rounded-3xl bg-gray-100">
            <TodayScheduleDisplay />
            <ScheduleStatusDisplay />
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
