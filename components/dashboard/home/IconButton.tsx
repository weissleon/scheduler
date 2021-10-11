import React, { FC, MouseEvent, useState } from "react";

type Props = {
  onClick: (event: MouseEvent) => any;
  loading?: boolean;
  icon: React.ReactElement;
  color?: "green" | "red" | "gray" | "blue";
};
const IconButton: FC<Props> = ({
  icon,
  color = "gray",
  onClick,
  loading = false,
}) => {
  let className;
  switch (color) {
    case "blue":
      className =
        "w-6 h-6 border-2 border-blue-400 border-solid rounded-full animate-spin-harsh";
      break;
    case "green":
      className =
        "w-6 h-6 border-2 border-green-400 border-solid rounded-full animate-spin-harsh";
      break;
    case "red":
      className =
        "w-6 h-6 border-2 border-red-400 border-solid rounded-full animate-spin-harsh";
      break;
    default:
      className =
        "w-6 h-6 border-2 border-gray-400 border-solid rounded-full animate-spin-harsh";
      break;
  }

  return (
    <div
      onClick={onClick}
      className={`p-2 text-white transition-shadow bg-white rounded-full shadow-sm cursor-pointer active:bg-gray-50 hover:shadow-md active:shadow-sm`}
    >
      {loading ? (
        <div
          style={{ borderTopColor: "transparent" }}
          className={className}
        ></div>
      ) : (
        React.cloneElement(icon, { className: `text-${color}-300` })
      )}
    </div>
  );
};

export default IconButton;
