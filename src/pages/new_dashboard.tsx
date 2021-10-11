import { NextPage } from "next";
import SideBar from "@components/dashboard/common/SideBar";
import AppBar from "@components/dashboard/common/AppBar";
import TodayScheduleDisplay from "@components/dashboard/home/TodayScheduleDisplay";
import WeeklyPinnedDisplay from "@components/dashboard/home/WeeklyPinnedDisplay";
import PendingScheduleDisplay from "@components/dashboard/home/PendingScheduleDisplay";
import Fab from "@components/Fab";
import useBreakpoint from "use-breakpoint";

import schedules from "@data/schedules.json";

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

const NewSchedule: NextPage = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "desktop");

  const isDesktop = breakpoint == "desktop" ? true : false;

  let sideBarStyle = isDesktop
    ? "w-[calc(100vw-240px)] flex flex-col px-8"
    : "w-[calc(100vw-68px)] flex flex-col px-8";

  return (
    <>
      <div className="flex flex-row max-w-full">
        <SideBar isDesktop={isDesktop} />
        <div className={sideBarStyle}>
          <section>
            <AppBar />
          </section>
          <main className="relative w-full h-[calc(100vh-96px)] flex flex-row gap-y-8 px-4 py-12 rounded-3xl gap-x-4 bg-gray-100">
            <TodayScheduleDisplay schedules={schedules} />
            {/* Second Column  */}
            <div className="relative flex flex-col w-5/12 h-full gap-y-4">
              <WeeklyPinnedDisplay />
              <PendingScheduleDisplay />
            </div>
          </main>
        </div>
      </div>
      {/* FAB */}
      {/* <div className="fixed bottom-6 right-6">
        <Fab />
      </div> */}
    </>
  );
};

export default NewSchedule;
