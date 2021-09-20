import { Container, Box } from "@material-ui/core";

export const ScheduleInserter = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Detail" />
      </Box>
      <Box>
        <input type="datetime-local" />
        <input type="datetime-local" />
      </Box>
      <Box>
        <button onClick={() => {}}>Add Schedule</button>
      </Box>
    </Container>
  );
};
