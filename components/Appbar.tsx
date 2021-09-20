import { Typography, AppBar, Toolbar, Button } from "@mui/material";
import { useRouter } from "next/router";

const ENDPOINT_SIGN_UP = "/sign_up";

const Appbar = () => {
  // Create a router
  const router = useRouter();

  function goToSignUp() {
    if (router.asPath == ENDPOINT_SIGN_UP) return;
    router.push(ENDPOINT_SIGN_UP);
  }

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Schedular
          </Typography>
          <Button variant="text" color="inherit">
            <Typography variant="button">Sign In</Typography>
          </Button>
          <Button onClick={goToSignUp} variant="text" color="inherit">
            <Typography variant="button">Sign Up</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Appbar;
