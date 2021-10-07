import React, { FC } from "react";
import SideBarMenu from "./SideBarMenu";

type Props = {
  className?: string | undefined;
};
const SideBar: FC<Props> = ({ className }) => {
  return (
    <section
      className={`${className} w-full min-h-screen bg-red-100 rounded-md justify-center px-8 shadow-md`}
    >
      <SideBarMenu />
    </section>
  );
};

export default SideBar;
