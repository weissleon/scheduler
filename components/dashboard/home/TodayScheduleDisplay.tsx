import { FC } from "react";
import ScheduleCard from "@components/dashboard/home/ScheduleCard";
import { format } from "date-fns";

const dummySchedules = [
  {
    name: "Wake up Buddy",
    time: new Date(2021, 9, 8, 7, 0, 0, 0).valueOf(),
    completed: true,
  },
  {
    name: "Morning Yoga",
    time: new Date(2021, 9, 8, 8, 0, 0, 0).valueOf(),
    completed: true,
  },
  {
    name: "Daily Workout",
    time: new Date(2021, 9, 8, 9, 0, 0, 0).valueOf(),
    completed: false,
  },
  {
    name: "Shift project kick off pt.1",
    time: new Date(2021, 9, 8, 7, 0, 0, 0).valueOf(),
    completed: false,
  },

  {
    name: "Skype Sushi",
    time: new Date(2021, 9, 8, 12, 30, 0, 0).valueOf(),
    completed: false,
  },
  {
    name: "Dribbble Shot",
    time: new Date(2021, 9, 8, 14, 0, 0, 0).valueOf(),
    completed: false,
  },
];

type Prop = {};
const TodayScheduleDisplay: FC<Prop> = ({}) => {
  const title = "Today's schedule";
  const todayDate = format(Date.now().valueOf(), "eeee dd");

  return (
    <div className="relative flex flex-col w-7/12 h-full px-8 py-8 bg-white rounded-lg gap-y-16">
      {/* Title Section */}
      <div className="relative flex flex-col w-full gap-y-2 ">
        <h1 className="text-2xl font-semibold font-title ">{title}</h1>
        <h2 className="text-2xl font-semibold text-red-300 font-title">
          {todayDate}
        </h2>
        {/* <h1 className="text-2xl font-bold ">On Air Now</h1> */}
      </div>
      <div className="relative flex flex-col pl-16 width-full gap-y-4">
        {dummySchedules.length > 0 &&
          dummySchedules.map((schedule) => (
            <ScheduleCard schedule={schedule} />
          ))}
      </div>
    </div>
  );
};

export default TodayScheduleDisplay;
