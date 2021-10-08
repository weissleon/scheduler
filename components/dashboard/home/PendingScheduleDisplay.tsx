import { FC } from "react";

const PendingScheduleDisplay: FC = () => {
  const title = "Pending Schedules";
  return (
    <div className="relative flex flex-col px-8 py-8 bg-white rounded-lg h-2/5 gap-y-16">
      {/* Title Section */}
      <div className="relative flex flex-col w-full gap-y-2 ">
        <h1 className="text-2xl font-semibold font-title ">{title}</h1>
      </div>
      {/* Schedule List Section */}
      <div className="relative flex flex-col pl-16 width-full gap-y-4"></div>
    </div>
  );
};

export default PendingScheduleDisplay;
