import { FC } from "react";
import { Add } from "@mui/icons-material";

const Fab: FC = () => {
  return (
    <div className="transition-all select-none cursor-pointer hover:bg-yellow-400 shadow-md hover:shadow-lg active:shadow-sm active:bg-yellow-500 inline-flex items-center justify-center rounded-full bg-yellow-300 p-4 w-16 h-16">
      <Add />
    </div>
  );
};

export default Fab;
