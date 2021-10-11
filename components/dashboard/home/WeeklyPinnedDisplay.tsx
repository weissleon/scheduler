import { FC } from "react";
import PinnedScheduleCard from "./PinnedScheduleCard";

const dummySchedules = [
  {
    title: "Costco Shopping",
    startAt: new Date(2021, 9, 10, 12, 0, 0, 0).valueOf(),
  },
  {
    title: "IkSeonDong Dinner",
    startAt: new Date(2021, 9, 18, 18, 0, 0, 0).valueOf(),
  },

  {
    title: "1st Anniversary",
    startAt: new Date(2021, 11, 25, 8, 0, 0, 0).valueOf(),
  },
];

type Props = {
  className: string | undefined;
};
const WeeklyPinnedDisplay: FC<Props> = ({ className }) => {
  const title = "Weekly Pinned";

  return (
    <div
      className={
        "relative flex flex-col w-full py-8 bg-white rounded-lg h-full gap-y-5" +
        ` ${className}`
      }
    >
      {/* Title Section */}
      <div className="relative flex flex-col w-full gap-y-2 ">
        <h1 className="text-2xl font-semibold font-title ">{title}</h1>
      </div>
      {/* Schedule List Section */}
      <div className="relative flex flex-col width-full gap-y-4">
        {dummySchedules.length > 0 &&
          dummySchedules.map((schedule) => (
            <PinnedScheduleCard schedule={schedule} />
          ))}
      </div>
    </div>
  );
};

export default WeeklyPinnedDisplay;
