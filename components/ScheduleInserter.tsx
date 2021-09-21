import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Paper,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Dummy
const names = [
  "Denis Cho",
  "Dana Cho",
  "Esther Kim",
  "Klaus Cho",
  "Grace Yeon",
  "Yubin Cho",
  "Sined Cho",
];

export const ScheduleInserter = () => {
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(new Date());

  const [participants, setParticipants] = useState<string[]>([]);

  return (
    <Container maxWidth="md">
      <Paper elevation={2} sx={{ px: "16px", py: "16px" }}>
        {/* Content Section */}
        <Box my={1}>
          <Typography variant="h6">Content</Typography>
        </Box>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <TextField type="text" label="Title" />
          <TextField multiline rows={5} type="text" label="Detail" />
        </Box>
        <Divider variant="middle" sx={{ my: "16px" }} />
        {/* Time Section */}
        <Box my={1}>
          <Typography variant="h6">Time</Typography>
        </Box>
        <Box display="flex" gap={2}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Time"
            value={startDateTime}
            onChange={(newValue) => {
              setStartDateTime(newValue);
            }}
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End Time"
            value={endDateTime}
            onChange={(newValue) => {
              setEndDateTime(newValue);
            }}
          />
        </Box>
        <Divider variant="middle" sx={{ my: "16px" }} />
        <Box my={1}>
          <Typography variant="h6">Participants</Typography>
        </Box>
        <Box display="flex" gap={2}>
          <FormControl fullWidth>
            <InputLabel id="participants-label">Participants</InputLabel>
            <Select
              label="Participants"
              labelId="participants-label"
              multiple
              value={participants}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                setParticipants(
                  typeof value === "string" ? value.split(",") : value
                );
              }}
              input={
                <OutlinedInput id="select-multiple-chip" label="Participants" />
              }
              renderValue={(selected: any) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: any) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Button Section */}
        <Box display="flex" gap={2} justifyContent="flex-end" my={2}>
          <Button variant="contained" onClick={() => {}}>
            Add Schedule
          </Button>
          <Button variant="text" onClick={() => {}}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
