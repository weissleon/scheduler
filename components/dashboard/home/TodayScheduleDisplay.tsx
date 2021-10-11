import { FC } from "react";
import ScheduleCard from "@components/dashboard/home/ScheduleCard";
import { format } from "date-fns";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { Schedule } from "@models/schedule";

type Prop = {
  className?: string | undefined;
  schedules: Schedule[];
};
const TodayScheduleDisplay: FC<Prop> = ({ schedules, className }) => {
  const title = "Today's Yacsok";
  const todayDate = format(Date.now().valueOf(), "eeee dd");

  return (
    <div
      className={
        "relative flex gap-y-16 flex-col w-full bg-white rounded-lg" +
        ` ${className}`
      }
    >
      {/* Title Section */}
      <div className="relative flex flex-col w-full gap-y-2 ">
        <h1 className="text-4xl font-semibold tracking-wide ">{title}</h1>
        <h2 className="text-4xl font-semibold tracking-wide text-red-300 font-title">
          {todayDate}
        </h2>
        {/* <h1 className="text-2xl font-bold ">On Air Now</h1> */}
      </div>
      <SimpleBar className="relative h-full pr-4 overflow-y-auto ">
        <div className="relative grid grid-flow-row auto-rows-[minmax(4rem,auto)] w-full h-full pl-16 gap-y-4">
          {schedules.length > 0 &&
            schedules.map((schedule) => (
              <ScheduleCard key={schedule.startAt} schedule={schedule} />
            ))}
        </div>
      </SimpleBar>
    </div>
  );
};

export default TodayScheduleDisplay;
