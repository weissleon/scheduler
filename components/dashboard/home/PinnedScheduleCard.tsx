import { FC } from "react";
import { format } from "date-fns";
import { Notifications } from "@mui/icons-material";

type Props = {
  schedule: {
    name: string;
    time: number;
    completed: boolean;
  };
};

const PinnedScheduleCard: FC<Props> = ({ schedule }) => {
  let cardColor;
  let iconBgColor;
  if (schedule.completed) {
    cardColor = "bg-red-200 hover:bg-red-300 active:bg-red-400";
    iconBgColor = "bg-white";
  } else {
    cardColor = "bg-gray-100 hover:bg-gray-200 active:bg-gray-300";
    iconBgColor = "bg-transparent";
  }

  return (
    <div
      className={`relative flex flex-row gap-x-4 items-center w-full h-16 px-6 py-2 transition-all  shadow-sm min-w-max rounded-2xl ${cardColor}`}
    >
      <div className={`p-1 rounded-lg ${iconBgColor}`}>
        <Notifications className="text-yellow-300" />
      </div>
      <h1 className="font-bold text-gray-700">{schedule.name}</h1>
      <p className="ml-auto text-gray-500">
        {format(schedule.time, "dd LLL yyyy")}
      </p>
    </div>
  );
};

export default PinnedScheduleCard;
