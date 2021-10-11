import { FC } from "react";
import PendingScheduleCard from "./PendingScheduleCard";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const dummySchedules = [
  {
    title: "Purchasing Philips Coffee Machine",
    startAt: new Date(2021, 9, 10, 12, 0, 0, 0).valueOf(),
  },
  {
    title: "Booking Marriot Buffet",
    startAt: new Date(2021, 9, 18, 18, 0, 0, 0).valueOf(),
  },
];

type Props = {
  className?: string | undefined;
};
const PendingScheduleDisplay: FC<Props> = ({ className }) => {
  const title = "Pending Schedules";
  return (
    <div
      className={
        "relative flex flex-col h-full w-full py-8 gap-y-5 bg-white rounded-lg " +
        ` ${className}`
      }
    >
      {/* Title Section */}
      <div className="relative flex flex-col w-full gap-y-2 ">
        <h1 className="text-2xl font-semibold font-title ">{title}</h1>
      </div>
      {/* Schedule List Section */}
      <SimpleBar className="relative h-full pr-4 overflow-y-auto ">
        <div className="relative grid grid-flow-row auto-rows-[minmax(4rem,auto)] w-full h-full gap-y-4">
          {dummySchedules.length > 0 &&
            dummySchedules.map((schedule) => (
              <PendingScheduleCard key={schedule.title} schedule={schedule} />
            ))}
        </div>
      </SimpleBar>
    </div>
  );
};

export default PendingScheduleDisplay;
