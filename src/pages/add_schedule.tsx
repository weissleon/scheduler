import { GetServerSideProps, NextPage } from "next";
import cookie from "cookie";
import { useFriends } from "@gql/hooks/useFriends";
import { useRouter } from "next/router";
import { decodeToken } from "@util/api/TokenAPI";
import {
  CircularProgress,
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
import { useRef, useState } from "react";
import { useAddSchedule } from "@gql/hooks/useAddSchedule";
import { addHours } from "date-fns";
import Appbar from "@components/Appbar";
import { useQueryClient } from "react-query";
import { ScheduleStatus } from "@util/app/ScheduleManager";

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

type Props = {
  token: string;
};

type FriendProps = {
  _id: string;
  name: string;
};

// * MAIN FUNCTION
const AddSchedule: NextPage<Props> = ({ token }) => {
  // * Extract userId
  const userId = decodeToken(token);

  // * HOOKS
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    isLoading: isProcessing,
    isError,
    mutate,
    isSuccess,
  } = useAddSchedule(userId!, queryClient);

  const { isLoading, data } = useFriends({ userId: userId! });

  const titleRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLInputElement>(null);

  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(
    addHours(new Date(), 1)
  );

  const [participantList, setParticipantList] = useState<FriendProps[]>([]);
  const [indices, setIndices] = useState<number[]>([]);

  // * HANDLERS
  async function logOut() {
    const { ok } = await fetch("/api/auth/logout", { credentials: "include" });
    if (ok) router.reload();
  }

  async function handleAddScheduleClick() {
    const title = titleRef!.current!.value;
    const detail = detailRef!.current!.value;
    const participants = participantList.map((participant) => {
      const p = {
        userId: participant._id,
        inviterId: userId as string,
        permission: 0,
        status: ScheduleStatus.PENDING,
      };
      return p;
    });
    participants.push({
      userId: userId as string,
      inviterId: userId as string,
      permission: 1,
      status: 2,
    });
    mutate({
      creatorId: userId!,
      detail: detail,
      title: title,
      tsStart: startDateTime!.valueOf(),
      tsEnd: endDateTime!.valueOf(),
      participants: participants,
    });
    router.replace("/schedule");
  }

  if (isLoading)
    return (
      <Container sx={{ marginTop: "16px" }}>
        <CircularProgress />
      </Container>
    );
  return (
    <>
      <Appbar userId={userId as string} onSignOut={logOut} />
      <Container sx={{ marginTop: "16px" }}>
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ px: "16px", py: "16px" }}>
            {/* Content Section */}
            <Box my={1}>
              <Typography variant="h6">Content</Typography>
            </Box>
            <Box display="flex" flexDirection="column" rowGap={2}>
              <TextField inputRef={titleRef} type="text" label="Title" />
              <TextField
                inputRef={detailRef}
                multiline
                rows={5}
                type="text"
                label="Detail"
              />
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
                  if (newValue!.valueOf() <= startDateTime!.valueOf()) return;
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
                  value={indices}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setIndices(value as number[]);
                    setParticipantList(() => {
                      const participantList: FriendProps[] = [];
                      (value as number[]).forEach((idx: number) => {
                        participantList.push(data.user.friends[idx]);
                      });
                      return participantList;
                    });
                  }}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Participants"
                    />
                  }
                  renderValue={(selected: any) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((index: number) => (
                        <Chip
                          key={data.user.friends[index]._id}
                          label={data.user.friends[index].name}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {data.user.friends &&
                    data.user.friends.length > 0 &&
                    data.user.friends.map(
                      (friend: FriendProps, index: number) => (
                        <MenuItem key={friend._id} value={index}>
                          {friend.name}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
            </Box>
            {/* Button Section */}
            <Box display="flex" gap={2} justifyContent="flex-end" my={2}>
              <Button variant="contained" onClick={handleAddScheduleClick}>
                {isProcessing ? (
                  <CircularProgress color="inherit" size={30} />
                ) : (
                  <Typography>Add Schedule</Typography>
                )}
              </Button>
              <Button variant="text" onClick={() => {}}>
                Cancel
              </Button>
            </Box>
          </Paper>
        </Container>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { accessToken, refreshToken } = context.req.cookies;
  if (!refreshToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign_in",
      },
    };
  }

  if (!accessToken) {
    const response = await fetch(
      `${process.env.DOMAIN_URL}/api/auth/refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      }
    );
    if (response.ok) {
      accessToken = (await response.json()).accessToken;
      context.res.setHeader(
        "Set-Cookie",
        cookie.serialize("accessToken", accessToken, {
          httpOnly: true,
          path: "/",
          maxAge: 60,
        })
      );
    }
  }

  return {
    props: {
      token: accessToken as string,
    },
  };
};

export default AddSchedule;
