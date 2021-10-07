import React, { FC } from "react";
import SideBarMenuItem from "@components/dashboard/common/SideBarMenuItem";
import {
  Dashboard,
  Notifications,
  DateRange,
  Group,
} from "@mui/icons-material";

const SideBarMenu: FC = () => {
  const menuList = [
    {
      name: "Dashboard",
      onClick: () => {},
      icon: <Dashboard className="text-3xl" />,
    },
    {
      name: "Calendar",
      onClick: () => {},
      icon: <DateRange className="text-3xl" />,
    },
    {
      name: "Friends",
      onClick: () => {},
      icon: <Group className="text-3xl" />,
    },
    {
      name: "Notifications",
      onClick: () => {},
      icon: <Notifications className="text-3xl" />,
    },
  ];

  return (
    <div className="flex flex-col gap-y-8">
      {menuList.length > 0 &&
        menuList.map((menu, index) => (
          <SideBarMenuItem
            key={index}
            icon={menu.icon}
            onClick={menu.onClick}
            name={menu.name}
          />
        ))}
    </div>
  );
};

export default SideBarMenu;
