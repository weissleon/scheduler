import { Typography, AppBar, Toolbar, Button } from "@mui/material";
import { fetchJson, METHOD_GET } from "@util/api/NetworkUtil";
import { useRouter } from "next/router";

const ENDPOINT_SIGN_UP = "/sign_up";
const ENDPOINT_SIGN_IN = "/sign_in";
const ENDPOINT_MAIN = "/schedule";

type Props = {
  isSignedIn: boolean;
  onSignOut: () => any;
};
const Appbar = ({ isSignedIn, onSignOut }: Props) => {
  // Create a router
  const router = useRouter();

  function goToSignUp() {
    if (router.asPath == ENDPOINT_SIGN_UP) return;
    router.push(ENDPOINT_SIGN_UP);
  }

  function goToMain() {
    if (router.asPath == ENDPOINT_MAIN) return;
    router.push(ENDPOINT_MAIN);
  }

  function goToSignIn() {
    if (router.asPath == ENDPOINT_SIGN_IN) return;
    router.push(ENDPOINT_SIGN_IN);
  }

  return (
    <>
      <AppBar position="relative">
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <>
            <Typography
              onClick={goToMain}
              variant="h6"
              color="inherit"
              sx={{ cursor: "pointer", mr: "auto" }}
            >
              Schedular
            </Typography>
          </>
          {isSignedIn ? (
            <Button onClick={onSignOut} variant="text" color="inherit">
              <Typography variant="button">Sign Out</Typography>
            </Button>
          ) : (
            <>
              <Button onClick={goToSignIn} variant="text" color="inherit">
                <Typography variant="button">Sign In</Typography>
              </Button>
              <Button onClick={goToSignUp} variant="text" color="inherit">
                <Typography variant="button">Sign Up</Typography>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Appbar;
