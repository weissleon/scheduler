import { useSchedules } from "@gql/hooks/useSchedules";
import { NextPage } from "next";
import ScheduleCard from "@components/ScheduleCard";
import { CircularProgress, Container, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";

const Test: NextPage = () => {
  const router = useRouter();
  const { isLoading, isError, data } = useSchedules();
  const goToAddSchedule = () => {
    router.push("/add_schedule");
  };
  if (isLoading)
    return (
      <Container
        sx={{ marginY: "16px", display: "flex", justifyContent: "center" }}
        maxWidth="xl"
      >
        <CircularProgress />
      </Container>
    );
  return (
    <Container sx={{ marginY: "16px" }} maxWidth="xl">
      {data.schedules.length > 0 &&
        data.schedules.map((schedule: any) => {
          return <ScheduleCard schedule={schedule} />;
        })}
      <Fab
        onClick={goToAddSchedule}
        sx={{ position: "absolute", right: "32px", bottom: "32px" }}
        color="primary"
        aria-label="add"
      >
        <Add />
      </Fab>
    </Container>
  );
};

export default Test;
