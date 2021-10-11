import React, { FC, MouseEvent, ReactElement } from "react";

type Props = {
  menu: {
    name: string;
    icon: React.ReactElement;
    onClick: (event: MouseEvent) => any;
  };
};

const UserMenuItem: FC<Props> = ({ menu }) => {
  console.log(menu.icon.props.className);
  console.log(menu.icon.type);
  return (
    <div
      onClick={menu.onClick}
      className="grid items-center justify-start grid-flow-col p-2 text-2xl text-gray-700 rounded-full select-none active:bg-gray-100 hover:bg-gray-50 auto-cols-auto gap-x-4"
    >
      {React.cloneElement(menu.icon, {
        className: "text-3xl",
      })}
      <span className="text-sm justify-self-start ">{menu.name}</span>
    </div>
  );
};

export default UserMenuItem;
