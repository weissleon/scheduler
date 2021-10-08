import React, { FC } from "react";
import SideBarMenu from "./SideBarMenu";
import SideBarHeader from "./SideBarHeader";
type Props = {
  className?: string | undefined;
};
const SideBar: FC<Props> = ({ className }) => {
  return (
    <section className="flex flex-col min-h-screen px-4 bg-red-200 shadow-md w-60 rounded-r-3xl">
      <SideBarHeader />
      <SideBarMenu />
    </section>
  );
};

export default SideBar;
