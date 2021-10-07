import React, { FC } from "react";
import { Dashboard } from "@mui/icons-material";

type Props = {
  onClick?: () => any;
  name: string;
  icon: JSX.Element;
};
const SideBarMenuItem: FC<Props> = ({ onClick, name, icon }) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center px-4 py-2 transition-all cursor-pointer select-none rounded-xl gap-x-6 hover:bg-yellow-300 active:bg-yellow-400"
    >
      <div>{icon}</div>
      <div className="font-bold">{name}</div>
    </li>
  );
};

export default SideBarMenuItem;
