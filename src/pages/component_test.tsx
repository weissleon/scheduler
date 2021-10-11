import { GetServerSideProps, NextPage } from "next";
import FriendDisplay from "@components/dashboard/home/FriendDisplay";
import TodayScheduleDisplay from "@components/dashboard/home/TodayScheduleDisplay";
import friendList from "@data/users.json";
import scheduleList from "@data/schedules.json";

type Props = {};
const ComponentTest: NextPage<Props> = ({}) => {
  return (
    <div className="relative flex flex-row w-3/12 h-[500px] max-h-screen max-w-full bg-gray-200 ">
      <FriendDisplay friendList={friendList} />
      {/* <TodayScheduleDisplay schedules={scheduleList} /> */}
    </div>
  );
};

// * GetServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default ComponentTest;
