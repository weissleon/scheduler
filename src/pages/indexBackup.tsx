import {
  checkParticipantStatus,
  getScheduleById,
  isScheduleOwner,
  Schedule,
  ScheduleStatus,
  scheduleStatusToString,
  updateParticipantStatus,
} from "@util/app/ScheduleManager";
import type { NextPage } from "next";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { logout } from "@util/app/LoginManager";
import { AccessTokenContext } from "./_app";
import { getUserIdFromToken } from "@util/app/UserManager";
import {
  AppBar,
  Button,
  Paper,
  Theme,
  Toolbar,
  Typography,
  Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  appbarTitle: {
    flexGrow: 1,
  },
  fab: {
    position: "absolute",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

const Home: NextPage = () => {
  const [schedules, setSchedules] = useState<Schedule[] | null>(null);

  // * Context
  const { token: accessToken, updateToken: setAccessToken } =
    useContext(AccessTokenContext);

  // * Router
  const router = useRouter();

  // * Functions
  const handleLogin = () => {
    router.push("./login");
  };
  const handleLogout = async () => {
    await logout();
    setAccessToken(null);
  };

  const handleAccept = async (scheduleId: string) => {
    const userId = await getUserIdFromToken(accessToken as string);

    let updatePayload = null;

    if (schedules) {
      const newSchedule = [...schedules];
      const targetScheduleIdx = newSchedule?.findIndex(
        (schedule) => schedule.id === scheduleId
      );
      const targetParticipantIdx = newSchedule[
        targetScheduleIdx
      ].participants.findIndex((participant) => participant.id === userId);
      updatePayload = {
        ...newSchedule[targetScheduleIdx].participants[targetParticipantIdx],
        status: ScheduleStatus.CONFIRMED,
      };
      newSchedule[targetScheduleIdx].participants[targetParticipantIdx] = {
        ...newSchedule[targetScheduleIdx].participants[targetParticipantIdx],
        status: ScheduleStatus.CONFIRMED,
      };
      updatePayload = {
        participants: newSchedule[targetScheduleIdx].participants,
      };
      const res = await updateParticipantStatus(scheduleId, updatePayload);
      if (res) setSchedules(newSchedule);
    }
  };

  const handleDecline = async (scheduleId: string) => {
    const userId = await getUserIdFromToken(accessToken as string);

    let updatePayload = null;

    if (schedules) {
      const newSchedule = [...schedules];
      const targetScheduleIdx = newSchedule?.findIndex(
        (schedule) => schedule.id === scheduleId
      );
      const targetParticipantIdx = newSchedule[
        targetScheduleIdx
      ].participants.findIndex((participant) => participant.id === userId);
      updatePayload = {
        ...newSchedule[targetScheduleIdx].participants[targetParticipantIdx],
        status: ScheduleStatus.DECLINED,
      };
      newSchedule[targetScheduleIdx].participants[targetParticipantIdx] = {
        ...newSchedule[targetScheduleIdx].participants[targetParticipantIdx],
        status: ScheduleStatus.DECLINED,
      };
      updatePayload = {
        participants: newSchedule[targetScheduleIdx].participants,
      };
      const res = await updateParticipantStatus(scheduleId, updatePayload);
      if (res) setSchedules(newSchedule);
    }
  };

  const displayChoices = (scheduleId: string) => {
    return (
      <div
        className={
          "grid gap-2 grid-cols-2 col-start-1 col-end-3 justify-self-end"
        }
      >
        <button
          onClick={() => handleAccept(scheduleId)}
          className={"px-2 py-1 rounded-md shadow-sm bg-gray-100"}
        >
          Accept
        </button>
        <button
          onClick={() => handleDecline(scheduleId)}
          className={"px-2 py-1 rounded-md shadow-sm bg-gray-100"}
        >
          Decline
        </button>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      setSchedules(await getScheduleById(accessToken as string));
    })();
    return () => {};
  }, [accessToken]);

  const classes = useStyles();

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.appbarTitle}>
            Scheduler
          </Typography>
          <Button color="inherit">Schedule</Button>
          {!accessToken ? (
            <Button color="inherit" onClick={() => handleLogin()}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={() => handleLogout()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main className={"grid justify-center"}>
        {!schedules ||
          (schedules.length > 0 &&
            schedules.map((schedule) => {
              return (
                <Paper
                  elevation={5}
                  className={
                    "grid grid-cols-2 m-4 shadow-md px-4 py-2 rounded-lg"
                  }
                >
                  <p className={"self-center text-lg font-bold "}>
                    {schedule.title}
                  </p>
                  <p
                    className={
                      "self-center justify-self-end p-2 bg-yellow-500 text-white font-extrabold rounded-md"
                    }
                  >
                    {scheduleStatusToString(schedule.status)}
                  </p>
                  {isScheduleOwner(accessToken as string, schedule) ? (
                    <p>Owner</p>
                  ) : (
                    <p>Not Owner</p>
                  )}
                  <p className={"col-start-1 col-end-3"}>{schedule.detail}</p>

                  <p>{schedule.id}</p>
                  <p>{schedule.creatorId}</p>
                  <p>
                    {schedule.participants.length > 0 &&
                      schedule.participants
                        .map((participant) => participant.id)
                        .join(", ")}
                  </p>
                  {!isScheduleOwner(accessToken as string, schedule) &&
                    checkParticipantStatus(
                      schedule,
                      getUserIdFromToken(accessToken as string) as string
                    ) === ScheduleStatus.PENDING &&
                    displayChoices(schedule.id)}
                </Paper>
              );
            }))}
        <Fab className={classes.fab} color="primary">
          <Add />
        </Fab>
      </main>
    </>
  );
};

export default Home;
