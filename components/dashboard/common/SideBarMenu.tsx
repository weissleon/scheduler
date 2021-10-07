import React, { FC } from "react";
import SideBarMenuItem from "@components/dashboard/common/SideBarMenuItem";
import { Dashboard, Notifications } from "@mui/icons-material";

const SideBarMenu: FC = () => {
  const menuList = [
    {
      name: "Dashboard",
      onClick: () => {},
      icon: <Dashboard />,
    },
    {
      name: "Notifications",
      onClick: () => {},
      icon: <Notifications />,
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-y-4">
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
