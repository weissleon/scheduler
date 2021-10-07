import { FC } from "react";
import MainScheduleCard from "@components/dashboard/home/MainScheduleCard";
import SubScheduleCard from "@components/dashboard/home/SubScheduleCard";

type Prop = {};
const TodayScheduleDisplay: FC<Prop> = ({}) => {
  return (
    <div className="relative flex-col flex w-7/12 overflow-x-hidden items-center justify-center py-4 bg-white rounded-lg h-[600px] ">
      <h1 className="absolute text-2xl font-bold left-8 top-4">On Air Now</h1>
      <div className="flex items-center justify-center h-full overflow-x-auto gap-x-24">
        <SubScheduleCard />
        <MainScheduleCard />
        <SubScheduleCard />
      </div>
    </div>
  );
};

export default TodayScheduleDisplay;
