import {
  Accordion,
  Box,
  Container,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { ExpandMore, PlayArrow, Stop } from "@mui/icons-material";
import { format } from "date-fns";
type Props = {
  schedule: {
    _id: string;
    creator: {
      _id: string;
      name: string;
    };
    participants: {
      user: {
        _id: string;
        name: string;
      };
      permission: number;
      status: number;
    }[];
    title: string;
    detail: string;
    tsStart: number;
    tsEnd: number;
    tsCreated: number;
    tsLastUpdated: number;
  };
};

const ScheduleCard = ({ schedule }: Props) => {
  return (
    <Container maxWidth="xs">
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">{schedule.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column">
            <Divider />
            <DateDisplay tsStart={schedule.tsStart} tsEnd={schedule.tsEnd} />
            <Box display="flex">
              <Typography>{schedule.detail}</Typography>
            </Box>
            <Divider />
            <Box mt={1} display="flex" gap={1} justifyContent="right">
              <Button variant="contained">Accept</Button>
              <Button>Reject</Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

const DateDisplay = ({
  tsStart,
  tsEnd,
}: {
  tsStart: number;
  tsEnd: number;
}) => {
  const startTime = format(new Date(tsStart), "yyyy-MM-dd p");
  const endTime = format(new Date(tsEnd), "yyyy-MM-dd p");
  return (
    <Box my={1} display="flex">
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <PlayArrow color="primary" />
        <Typography>{startTime}</Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <Stop color="primary" />
        <Typography>{endTime}</Typography>
      </Box>
    </Box>
  );
};

export default ScheduleCard;
