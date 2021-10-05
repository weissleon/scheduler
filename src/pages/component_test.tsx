import { GetServerSideProps, NextPage } from "next";
import { Container } from "@mui/material";
import NewScheduleCard from "@components/NewScheduleCard";
import { Schedule } from "@models/schedule";
import { ScheduleStatus } from "@util/app/ScheduleManager";

type Props = {
  schedules?: Schedule[];
};
const ComponentTest: NextPage<Props> = ({ schedules }) => {
  return (
    <Container>
      <NewScheduleCard schedule={schedules![0]} />
    </Container>
  );
};

// * GetServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  const dummySchedules: Schedule[] = [
    {
      id: "6152f1dfc2a7a0d786713013",
      title: "개발일지 쓰기",
      detail: "오늘 힘들었던 점이 무엇이었는지 같은 것들을 적기",
      participants: [{}],
      creator: {},
      status: ScheduleStatus.PENDING,
      startAt: 1632825813606,
      endAt: 1632829413606,
      createdAt: 1632825823456,
      updatedAt: 1632825823456,
    },
  ];

  return {
    props: {
      schedules: dummySchedules,
    },
  };
};

export default ComponentTest;
