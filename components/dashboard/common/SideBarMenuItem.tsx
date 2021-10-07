import React, { FC } from "react";
import { Dashboard } from "@mui/icons-material";

type Props = {
  onClick?: () => any;
  name: string;
  icon: JSX.Element;
};
const SideBarMenuItem: FC<Props> = ({ onClick, name, icon }) => {
  return (
    <li onClick={onClick} className="flex gap-x-8">
      <div>{icon}</div>
      <div>{name}</div>
    </li>
  );
};

export default SideBarMenuItem;
