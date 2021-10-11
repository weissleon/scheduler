import React, { FC } from "react";

type Props = {
  className?: string | undefined;
};
const Logo: FC<Props> = ({ className }) => {
  const title = "Yacsok";
  return (
    <div className={"w-max" + ` ${className}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default Logo;
