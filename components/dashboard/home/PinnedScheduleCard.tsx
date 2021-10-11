import { FC } from "react";
import { format } from "date-fns";
import { Notifications } from "@mui/icons-material";
import { Schedule } from "@models/schedule";

type Props = {
  schedule: Schedule;
};

const PinnedScheduleCard: FC<Props> = ({ schedule }) => {
  let cardColor;
  let iconBgColor;
  if (schedule.startAt! < Date.now()) {
    cardColor = "bg-red-200 hover:bg-red-300 active:bg-red-400";
    iconBgColor = "bg-white";
  } else {
    cardColor = "bg-white hover:bg-gray-50 active:bg-gray-100";
    iconBgColor = "bg-transparent";
  }

  return (
    <div
      className={`relative flex flex-row gap-x-4 items-center w-full h-16 px-6 py-2 transition-all  shadow-sm min-w-max rounded-2xl ${cardColor}`}
    >
      <div className={`p-1 rounded-lg ${iconBgColor}`}>
        <Notifications className="text-yellow-300" />
      </div>
      <h1 className="font-bold text-gray-700">{schedule.title}</h1>
      <p className="ml-auto text-gray-500">
        {format(schedule.startAt!, "dd LLL yyyy")}
      </p>
    </div>
  );
};

export default PinnedScheduleCard;
