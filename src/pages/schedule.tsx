import { useSchedules } from "@gql/hooks/useSchedules";
import { GetServerSideProps, NextPage } from "next";
import ScheduleCard from "@components/ScheduleCard";
import { CircularProgress, Container, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/router";
import cookie from "cookie";
import Appbar from "@components/Appbar";
import { decodeToken } from "@util/api/TokenAPI";

type Props = {
  token: string;
};
const Schedule: NextPage<Props> = ({ token }) => {
  const router = useRouter();

  const userId = decodeToken(token);

  const { isLoading, isError, data } = useSchedules({ id: userId! });

  const goToAddSchedule = () => {
    router.push("/add_schedule");
  };

  async function logOut() {
    const { ok } = await fetch("/api/auth/logout", { credentials: "include" });
    if (ok) router.reload();
  }

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
      <Appbar isSignedIn={token ? true : false} onSignOut={logOut} />
      <Container sx={{ marginY: "16px" }} maxWidth="xl">
        {data.schedules.length > 0 &&
          data.schedules.map((schedule: any) => {
            return <ScheduleCard key={schedule._id} schedule={schedule} />;
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

export default Schedule;
