import { FC } from "react";
import { format } from "date-fns";

type Props = {
  schedule?: {
    name: string;
    time: string;
  };
};

const dummySchedule = {
  name: "Wake up Buddy",
  time: new Date(2021, 9, 8, 7, 0, 0, 0),
};
const ScheduleCard: FC<Props> = ({}) => {
  return (
    <div className="relative items-center flex flex-row px-6 py-2 transition-all bg-red-200 w-full min-w-max shadow-sm  h-16 rounded-2xl hover:bg-red-300 active:bg-red-400">
      <h1 className="font-bold text-gray-600">{dummySchedule.name}</h1>
      <p className="text-gray-500 ml-auto">
        {format(dummySchedule.time, "HH:mm")}
      </p>
    </div>
  );
};

export default ScheduleCard;
