import { FC, MouseEvent, useState } from "react";
import UserMenu from "./UserMenu";

const UserDisplay: FC = () => {
  // * HOOKS
  const [isMenuOpen, setIsMenuOpen] = useState<false>(false);

  // * HANDLERS
  function openMenu(event: MouseEvent) {
    event.preventDefault();
  }

  function closeMenu(event: MouseEvent) {
    event.preventDefault();
  }

  return (
    <>
      {isMenuOpen && <UserMenu />}
      <div></div>
    </>
  );
};

export default UserDisplay;
