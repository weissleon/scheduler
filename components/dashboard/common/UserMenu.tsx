import { FC, MouseEvent, RefObject } from "react";
import UserMenuItem from "./UserMenuItem";

type Menu = {
  name: string;
  icon: JSX.Element;
  onClick: (event: MouseEvent) => any;
};

type Props = {
  menuList: Menu[];
  anchorTo: RefObject<HTMLElement>;
};

const UserMenu: FC<Props> = ({ menuList, anchorTo }) => {
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
        menuList.map((menu) => <UserMenuItem menu={menu} />)}
    </div>
  );
};

export default UserMenu;
