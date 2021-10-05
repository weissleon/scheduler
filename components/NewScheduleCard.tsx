import { Box, Paper, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { Schedule } from "@models/schedule";
import { FC } from "react";
import { format } from "date-fns";

type Props = {
  schedule: Schedule;
};

const NewScheduleCard: FC<Props> = ({ schedule }) => {
  return (
    <Box maxWidth="400px">
      <Paper sx={{ display: "flex", alignItems: "center" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          p={2}
          mr={1}
        >
          <Typography textAlign="center" variant="h6" color="primary">
            {format(schedule.startAt!, "LLL")}
          </Typography>
          <Typography textAlign="center" variant="h3" color="primary">
            {format(schedule.startAt!, "dd")}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box>
            <Typography variant="h6" fontWeight="700" color="primary">
              {schedule.title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="flex-end" gap={1}>
            <AccessTime />
            <Typography>
              {`${format(schedule.startAt!, "HH:mm")}-${format(
                schedule.endAt!,
                "HH:mm"
              )}`}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewScheduleCard;
