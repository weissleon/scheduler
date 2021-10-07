import { NextPage } from "next";
import SideBar from "@components/dashboard/common/SideBar";
import AppBar from "@components/dashboard/common/AppBar";
import TodayScheduleDisplay from "@components/dashboard/home/TodayScheduleDisplay";
import ScheduleStatusDisplay from "@components/dashboard/schedule/ScheduleStatusDisplay";
const NewSchedule: NextPage = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="w-[calc(100vw-240px)] flex flex-col px-8">
        <section>
          <AppBar />
        </section>
        <main className="min-h-[calc(100vh-96px)] flex flex-col gap-y-8 px-4 py-12 rounded-3xl bg-gray-100">
          <TodayScheduleDisplay />
          <ScheduleStatusDisplay />
        </main>
      </div>
    </div>
  );
};

export default NewSchedule;
