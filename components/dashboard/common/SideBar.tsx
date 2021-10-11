import React, { FC } from "react";
import SideBarMenu from "./SideBarMenu";
import SideBarHeader from "./SideBarHeader";
import useBreakpoint from "use-breakpoint";
type Props = {
  className?: string | undefined;
  isDesktop?: boolean;
};

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

const SideBar: FC<Props> = ({ className, isDesktop = true }) => {
  let sideBarWidth;

  if (isDesktop) {
    sideBarWidth = "w-60";
  } else {
    sideBarWidth = "w-max";
  }

  return (
    <section
      className={`flex flex-col min-h-screen px-4 bg-red-200 shadow-md  rounded-r-3xl ${sideBarWidth}`}
    >
      <SideBarHeader showFull={isDesktop ? true : false} />
      <SideBarMenu showTitle={isDesktop ? true : false} />
    </section>
  );
};

export default SideBar;
