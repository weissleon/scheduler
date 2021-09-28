import { GetServerSideProps, NextPage } from "next";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { TOKEN_TYPE, verifyToken } from "@util/api/TokenAPI";

const Home: NextPage = () => {
  const router = useRouter();

  function handleSignIn() {
    router.push("./sign_in");
  }

  return (
    <Container maxWidth="xl">
      <Box display="flex">
        <Button
          variant="contained"
          sx={{ mx: "auto" }}
          color="primary"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </Box>
      <Box display="flex">
        <Typography sx={{ mx: "auto" }}>This is Landing Page</Typography>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Currently there is no refreshToken validation.
  let { refreshToken } = context.req.cookies;
  if (refreshToken) {
    const { isValid } = verifyToken(refreshToken, TOKEN_TYPE.REFRESH);
    if (isValid)
      return { redirect: { destination: "/schedule", permanent: false } };
  }

  return {
    props: {},
  };
};

export default Home;
