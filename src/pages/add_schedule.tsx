import { ScheduleInserter } from "@components/ScheduleInserter";
import { NextPage } from "next";
import { Container } from "@mui/material";
const AddSchedule: NextPage = () => {
  return (
    <>
      <Container sx={{ marginTop: "16px" }}>
        <ScheduleInserter />
      </Container>
    </>
  );
};

export default AddSchedule;
