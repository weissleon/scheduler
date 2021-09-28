import { useSchedules } from "@gql/hooks/useSchedules";
import { GetServerSideProps, NextPage } from "next";
import ScheduleCard from "@components/ScheduleCard";
import {
  Divider,
  Typography,
  CircularProgress,
  Container,
  Fab,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
import cookie from "cookie";
import Appbar from "@components/Appbar";
import { decodeToken } from "@util/api/TokenAPI";
import { isToday } from "date-fns";
import { ScheduleStatus } from "@util/app/ScheduleManager";
import { useMemo } from "react";

// * TYPES
type Props = {
  token: string;
};

// * MAIN FUNCTION
const Schedule: NextPage<Props> = ({ token }) => {
  // Extract userId from token
  const userId = decodeToken(token);

  // * HOOKS
  const router = useRouter();
  const { isLoading, isError, data } = useSchedules({ id: userId! });

  // * HANDLERS
  const goToAddSchedule = () => {
    router.push("/add_schedule");
  };
  const logOut = async () => {
    const { ok } = await fetch("/api/auth/logout", { credentials: "include" });
    if (ok) router.reload();
  };

  // * VALUES
  const todaySchedules = useMemo(
    () =>
      data
        ? data.schedules.filter(
            (schedule) =>
              (isToday(schedule.tsStart) || isToday(schedule.tsEnd)) &&
              schedule.status == ScheduleStatus.CONFIRMED
          )
        : null,
    [data]
  );
  const pendingSchedules = useMemo(
    () =>
      data
        ? data.schedules.filter(
            (schedule) => schedule.status == ScheduleStatus.PENDING
          )
        : null,
    [data]
  );
  const pastSchedules = useMemo(
    () =>
      data
        ? data.schedules.filter(
            (schedule) => !isToday(schedule.tsStart) && !isToday(schedule.tsEnd)
          )
        : null,
    [data]
  );

  // * RENDERS
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
    <>
      <Appbar userId={userId as string} onSignOut={logOut} />

      <Container sx={{ marginY: "16px" }} maxWidth="md">
        {data && data.schedules.length == 0 && (
          <Typography variant="h4" textAlign="center">
            Thare are no schedules :(
          </Typography>
        )}

        <Typography variant="h4">Today</Typography>
        <Divider sx={{ my: "8px" }} />
        {todaySchedules &&
          todaySchedules.map((schedule) => (
            <ScheduleCard
              userId={userId!}
              key={schedule._id}
              schedule={schedule}
            />
          ))}
        <Typography variant="h4">Pending</Typography>
        <Divider sx={{ my: "8px" }} />
        {pendingSchedules &&
          pendingSchedules.map((schedule) => (
            <ScheduleCard
              userId={userId!}
              key={schedule._id}
              schedule={schedule}
            />
          ))}
        <Typography variant="h4">Past</Typography>
        <Divider sx={{ my: "8px" }} />
        {pastSchedules &&
          pastSchedules.map((schedule) => (
            <ScheduleCard
              userId={userId!}
              key={schedule._id}
              schedule={schedule}
            />
          ))}
        <Fab
          onClick={goToAddSchedule}
          sx={{ position: "absolute", right: "32px", bottom: "32px" }}
          color="primary"
          aria-label="add"
        >
          <Add />
        </Fab>
      </Container>
    </>
  );
};

// * GetServerSideProps
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

export default Schedule;
