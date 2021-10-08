import { FC } from "react";
import ScheduleCard from "@components/dashboard/home/ScheduleCard";

type Prop = {};
const TodayScheduleDisplay: FC<Prop> = ({}) => {
  return (
    <div className="relative w-7/12 flex-col flex justify-center py-4 bg-white rounded-lg h-[600px] ">
      <h1 className="absolute text-2xl font-bold left-8 top-4">On Air Now</h1>
      <div className="relative width-full px-8">
        <ScheduleCard />
      </div>
    </div>
  );
};

export default TodayScheduleDisplay;
