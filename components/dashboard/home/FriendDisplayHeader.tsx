import React, { FC, RefObject } from "react";
import { AddModerator, Add, MoreVert } from "@mui/icons-material";

type Props = {};
const FriendDisplayHeader: FC<Props> = ({}) => {
  const title = "Friends";
  return (
    <div className="relative grid items-center content-start grid-flow-col pl-8 pr-4 rounded-lg auto-cols-auto gap-y-16">
      <h2 className="relative w-full text-2xl font-semibold font-title">
        {title}
      </h2>
      <Actions />
    </div>
  );
};

type ActionProps = {};
const Actions: FC<ActionProps> = ({}) => {
  return (
    <>
      {/* Button Group */}
      <div className="relative flex flex-row items-center justify-center justify-self-end">
        {/* Add Button */}
        <div className="p-2 transition-all rounded-full hover:shadow-sm active:bg-gray-100 hover:bg-gray-50">
          <Add />
        </div>
        {/* Allow Button */}
        <div className="p-2 transition-all rounded-full hover:shadow-sm active:bg-gray-100 hover:bg-gray-50">
          <MoreVert />
        </div>
      </div>
    </>
  );
};

type Menu = {
  name: string;
  icon: JSX.Element;
  onClick: (event: MouseEvent) => any;
};

type MenuProps = {
  menuList: Menu[];
  anchorTo: RefObject<HTMLElement>;
};

const ActionMenu: FC<MenuProps> = ({ menuList, anchorTo }) => {
  return (
    <div
      style={{
        top: anchorTo.current!.offsetTop + anchorTo.current!.offsetHeight,
        right:
          window.innerWidth -
          (anchorTo.current!.offsetLeft + anchorTo.current!.offsetWidth),
      }}
      className="absolute z-50 grid content-start px-4 py-4 bg-white shadow-md w-60 rounded-2xl auto-cols-auto"
    >
      {menuList.length > 0 &&
        menuList.map((menu) => <ActionMenuItem menu={menu} />)}
    </div>
  );
};

export default FriendDisplayHeader;
