import { FC } from "react";
import { Search } from "@mui/icons-material";

const SearchBar: FC = () => {
  return (
    <div className="flex flex-row items-center flex-grow max-w-lg px-4 py-4 bg-gray-100 rounded-full gap-x-4">
      <Search className="text-gray-400" />
      <span className="text-gray-400">Search</span>
    </div>
  );
};

export default SearchBar;
