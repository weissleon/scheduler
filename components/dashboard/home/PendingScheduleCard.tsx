import { FC, MouseEvent, useState } from "react";
import { format } from "date-fns";
import { Notifications, Check, Clear } from "@mui/icons-material";
import { Schedule } from "@models/schedule";
import IconButton from "@components/dashboard/home/IconButton";

type Props = {
  schedule: Schedule;
};

const PendingScheduleCard: FC<Props> = ({ schedule }) => {
  // * HOOKS
  const [expanded, setExpanded] = useState<boolean>(false);

  // * VARIABLES
  let cardColor;
  let iconBgColor;

  cardColor = "bg-yellow-200 hover:bg-yellow-300";
  iconBgColor = "bg-white";

  // * HANDLERS
  function accept(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Accept Clicked`);
  }

  function decline(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log(`Decline Clicked`);
  }

  function expand(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setExpanded((prevState) => !prevState);
  }

  return (
    <div
      onClick={expand}
      className={`relative grid auto-rows-auto gap-x-4 items-center w-full px-6 py-2 transition-all  shadow-sm min-w-max rounded-2xl ${cardColor} `}
      style={{
        gridTemplateColumns: "auto 1fr auto auto",
      }}
    >
      {/* Main Icon */}
      <div
        className={`row-start-1 row-end-2 col-start-1 col-end-2 z-0 p-1 rounded-lg ${iconBgColor}`}
      >
        <Notifications className="text-yellow-300" />
      </div>
      {/* Title */}
      <h1 className="z-10 col-start-2 col-end-3 row-start-1 row-end-2 font-bold text-gray-700 select-none">
        {schedule.title}
      </h1>
      {/* Time */}
      <p className="z-10 col-start-3 col-end-4 row-start-1 row-end-2 text-gray-500 select-none justify-self-end">
        {format(schedule.startAt!, "dd LLL yyyy")}
      </p>
      {/* Detail Content */}
      {expanded && (
        <div className="z-10 col-start-2 col-end-5 row-start-2 row-end-3 text-gray-500">
          {"Hosted By:\tDenis Cho\n Detail:\n1. Look it up on Danawa"}
        </div>
      )}
      {/* Button Group */}
      <div className="z-10 flex flex-row col-start-4 col-end-5 row-start-1 row-end-2 justify-self-end gap-x-4 w-max">
        {/* Accept Button */}
        <IconButton
          icon={<Check />}
          color="green"
          loading={false}
          onClick={accept}
        />
        {/* Decline Button */}
        <IconButton
          icon={<Clear />}
          color="red"
          loading={false}
          onClick={decline}
        />
      </div>
    </div>
  );
};

export default PendingScheduleCard;
