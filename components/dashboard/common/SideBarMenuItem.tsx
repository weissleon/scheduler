import React, { FC } from "react";
import { Dashboard } from "@mui/icons-material";

type Props = {
  onClick?: () => any;
  name: string;
  icon: JSX.Element;
  showTitle?: boolean;
};
const SideBarMenuItem: FC<Props> = ({
  onClick,
  name,
  icon,
  showTitle = true,
}) => {
  let itemWidth;

  if (showTitle) {
    itemWidth = `w-full px-4 py-2 `;
  } else {
    itemWidth = `w-max ml-2 p-2`;
  }

  return (
    <li
      onClick={onClick}
      className={`relative flex items-center transition-all rounded-full cursor-pointer select-none gap-x-6 hover:bg-yellow-300 active:bg-yellow-400 ${itemWidth}`}
    >
      <div>{icon}</div>
      {showTitle && <div className="font-bold">{name}</div>}
    </li>
  );
};

export default SideBarMenuItem;
