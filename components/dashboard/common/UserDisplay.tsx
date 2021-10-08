import { FC, MouseEvent, useState } from "react";
import Avatar from "react-avatar";
import UserMenu from "./UserMenu";

const UserDisplay: FC = () => {
  // * HOOKS
  const [isMenuOpen, setIsMenuOpen] = useState<false>(false);

  // * HANDLERS
  function openMenu(event: MouseEvent) {
    event.preventDefault();
  }

  function toggleMenu(event: MouseEvent) {
    event.preventDefault();
  }

  function closeMenu(event: MouseEvent) {
    event.preventDefault();
  }

  return (
    <>
      {isMenuOpen && <UserMenu />}
      <div
        onClick={toggleMenu}
        className="flex flex-row items-center px-4 py-2 ml-4 transition-all rounded-full cursor-pointer select-none active:bg-gray-200 hover:bg-gray-100 gap-x-4"
      >
        <Avatar round={true} size="54" color="#fecaca" />
        <p className="text-xl font-bold">Denis Cho</p>
      </div>
    </>
  );
};

export default UserDisplay;
