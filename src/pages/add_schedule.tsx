import { ScheduleInserter } from "@components/ScheduleInserter";
import { GetServerSideProps, NextPage } from "next";
import { CircularProgress, Container } from "@mui/material";
import cookie from "cookie";
import { useFriends } from "@gql/hooks/useFriends";
import { decodeToken } from "@util/api/TokenAPI";

type Props = {
  token: string;
};
const AddSchedule: NextPage<Props> = ({ token }) => {
  const userId = decodeToken(token);
  const { isLoading, data } = useFriends({ userId: userId! });

  return (
    <>
      <Container sx={{ marginTop: "16px" }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ScheduleInserter friends={data.user.friends} />
        )}
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
