import { FC } from "react";

type Props = {
  showFull?: boolean;
};
const SideBarHeader: FC<Props> = ({ showFull = true }) => {
  return (
    <header className="mx-auto my-16 text-2xl font-extrabold">
      {showFull ? "YACSOK" : "Y"}
    </header>
  );
};

export default SideBarHeader;
