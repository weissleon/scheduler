import { FC } from "react";
import PinnedScheduleCard from "./PinnedScheduleCard";

const dummySchedules = [
  {
    name: "Costco Shopping",
    time: new Date(2021, 9, 10, 12, 0, 0, 0).valueOf(),
    completed: false,
  },
  {
    name: "IkSeonDong Dinner",
    time: new Date(2021, 9, 18, 18, 0, 0, 0).valueOf(),
    completed: false,
  },

  {
    name: "1st Anniversary",
    time: new Date(2021, 11, 25, 8, 0, 0, 0).valueOf(),
    completed: false,
  },
];

const WeeklyPinnedDisplay: FC = () => {
  const title = "Weekly Pinned";

  return (
    <div className="relative flex flex-col px-8 py-8 bg-white rounded-lg h-3/5 gap-y-16">
      {/* Title Section */}
      <div className="relative flex flex-col w-full gap-y-2 ">
        <h1 className="text-2xl font-semibold font-title ">{title}</h1>
      </div>
      {/* Schedule List Section */}
      <div className="relative flex flex-col px-16 width-full gap-y-4">
        {dummySchedules.length > 0 &&
          dummySchedules.map((schedule) => (
            <PinnedScheduleCard schedule={schedule} />
          ))}
      </div>
    </div>
  );
};

export default WeeklyPinnedDisplay;
