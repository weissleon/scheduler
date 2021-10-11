import { FC } from "react";
import { format } from "date-fns";
import { Notifications, Star } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import { Schedule } from "@models/schedule";

type Props = {
  schedule: Schedule;
};

const ScheduleCard: FC<Props> = ({ schedule }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  let cardColor;
  let iconBgColor;
  if (schedule.startAt! < Date.now()) {
    cardColor = "bg-red-200 hover:bg-red-300 active:bg-red-400";
    iconBgColor = "bg-white";
  } else {
    cardColor = "bg-gray-100 hover:bg-gray-200 active:bg-gray-300";
    iconBgColor = "bg-transparent";
  }

  // * HANDLERS
  function expand(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    console.log(`Expand Clicked!`);
  }

  return (
    <div
      className={`relative grid auto-rows-auto  gap-x-4 items-center w-full  px-6 py-2 transition-all  shadow-sm hover:shadow-md cursor-pointer select-none min-w-max rounded-2xl ${cardColor}`}
      style={{
        gridTemplateColumns: "auto 1fr auto auto",
      }}
      onClick={expand}
    >
      {/* Main Icon */}
      <div
        className={`row-start-1 row-end-2 col-start-1 col-end-2 z-0 p-1 rounded-lg ${iconBgColor}`}
      >
        <Notifications className="text-yellow-300" />
      </div>
      <h1 className="z-10 col-start-2 col-end-3 row-start-1 row-end-2 font-bold text-gray-700 select-none">
        {schedule.title}
      </h1>
      <p className="z-10 col-start-3 col-end-4 row-start-1 row-end-2 text-gray-500 select-none justify-self-end">
        {format(schedule.startAt!, "p")}
      </p>
    </div>
  );
};

export default ScheduleCard;
