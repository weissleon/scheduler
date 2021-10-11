import { FC, MouseEvent, useState, useRef } from "react";
import Avatar from "react-avatar";
import UserMenu from "./UserMenu";
import { Person, Logout } from "@mui/icons-material";

const menuList = [
  {
    name: "Profile",
    icon: <Person />,
    onClick: (event: MouseEvent) => {
      event.stopPropagation();
      console.log(`Profile Clicked!`);
    },
  },
  {
    name: "Logout",
    icon: <Logout />,
    onClick: (event: MouseEvent) => {
      event.stopPropagation();
      console.log(`Logout Clicked!`);
    },
  },
];

type Props = {
  className?: string | undefined;
};
// * MAIN FUNCTION
const UserDisplay: FC<Props> = ({ className }) => {
  // * HOOKS
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  // * HANDLERS
  function openMenu(event: MouseEvent) {
    event.preventDefault();
  }

  function toggleMenu(event: MouseEvent) {
    event.preventDefault();
    setIsMenuOpen((prevState) => !prevState);
  }

  function closeMenu(event: MouseEvent) {
    event.preventDefault();
  }

  return (
    <>
      <div
        ref={anchorRef}
        onClick={toggleMenu}
        className={
          "relative flex flex-row items-center px-4 py-2 transition-all rounded-full cursor-pointer select-none active:bg-gray-200 hover:bg-gray-100 gap-x-4" +
          ` ${className}`
        }
      >
        <Avatar round={true} size="54" color="#fecaca" />
        <p className="text-xl font-bold">Denis Cho</p>
      </div>
      {isMenuOpen && <UserMenu anchorTo={anchorRef} menuList={menuList} />}
    </>
  );
};

export default UserDisplay;
