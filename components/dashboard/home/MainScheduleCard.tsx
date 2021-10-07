import { FC } from "react";

const MainScheduleCard: FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center transition-all py-6 px-8 bg-red-100 shadow-lg w-[600px] h-96 rounded-2xl hover:scale-105 hover:bg-red-300">
      <p className="absolute mx-auto text-4xl font-bold text-white top-6">
        11:00 - 20:00
      </p>
      <h1 className="text-5xl font-bold text-white ">익선동 가기</h1>
    </div>
  );
};

export default MainScheduleCard;
