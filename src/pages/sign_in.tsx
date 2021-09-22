import { GetServerSideProps, NextPage } from "next";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  CircularProgress,
  Paper,
  Box,
  Container,
  TextField,
  Button,
} from "@mui/material";
import { METHOD_POST } from "@util/api/NetworkUtil";
import { useQuery } from "react-query";

const SignIn: NextPage = () => {
  // * Router
  const router = useRouter();

  // * States
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    const email = emailRef!.current!.value.trim();
    const password = passwordRef!.current!.value.trim();
    const payload = { email: email, password: password };

    const { ok } = await fetch("/api/auth/login", {
      method: METHOD_POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsLoading(false);

    if (ok) {
      router.reload();
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "grid", height: "calc(100vh - 64px)" }}
    >
      <Box py={2} justifySelf="center" alignSelf="center" position="relative">
        <Paper>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <TextField
              inputRef={emailRef}
              type="email"
              label="Email"
              variant="outlined"
            />
            <TextField
              inputRef={passwordRef}
              type="password"
              label="Password"
              variant="outlined"
            />
            <Button variant="contained" onClick={handleSignIn}>
              {isLoading ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                <Typography>Sign In</Typography>
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Currently there is no refreshToken validation.
  let { refreshToken } = context.req.cookies;
  if (refreshToken)
    return { redirect: { destination: "/schedule", permanent: false } };
  return {
    props: {},
  };
};

export default SignIn;
