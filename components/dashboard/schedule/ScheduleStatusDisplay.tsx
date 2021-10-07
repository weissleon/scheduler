import { FC } from "react";

type Prop = {};
const ScheduleStatusDisplay: FC<Prop> = ({}) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-7/12 h-[500px] py-4 bg-white rounded-lg">
      <h1 className="absolute text-2xl font-bold left-8 top-4">
        Schedule Status
      </h1>
    </div>
  );
};

export default ScheduleStatusDisplay;
