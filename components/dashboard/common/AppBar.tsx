import { FC } from "react";
import SearchBar from "./SearchBar";
import UserDisplay from "./UserDisplay";
import { NotificationsOutlined } from "@mui/icons-material";

const AppBar: FC = () => {
  return (
    <div className="flex flex-row items-center w-full h-24 py-4 ">
      <h1 className="mr-16 text-2xl font-bold">Dashboard</h1>
      <SearchBar />
      <div className="p-4 ml-auto transition-all rounded-full cursor-pointer select-none hover:bg-gray-100 active:bg-gray-200">
        <NotificationsOutlined />
      </div>
      <UserDisplay />
    </div>
  );
};

export default AppBar;
