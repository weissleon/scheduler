import { useUser } from "@gql/hooks/useUser";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Notifications, ConfirmationNumber } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useFriends } from "@gql/hooks/useFriends";
import { MouseEvent } from "react";

const ENDPOINT_SIGN_UP = "/sign_up";
const ENDPOINT_SIGN_IN = "/sign_in";
const ENDPOINT_MAIN = "/schedule";

type Props = {
  userId: string;
  onSignOut: () => any;
};
const Appbar = ({ userId, onSignOut }: Props) => {
  // Create a router
  const router = useRouter();
  const {
    data: { friends },
  } = useFriends({ userId });

  const { isLoading, isError, data } = useUser({ userId: userId });

  // * HANDLERS
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

  function onTicketButtonClicked(event: MouseEvent) {
    console.log("Ticket button Clicked!");
    friends && console.log(friends);
  }

  return (
    <>
      <AppBar position="relative">
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography
            onClick={goToMain}
            variant="h6"
            color="inherit"
            sx={{ cursor: "pointer", mr: "auto" }}
          >
            Schedular
          </Typography>
          <Box>
            <IconButton disabled color="inherit">
              <Notifications />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={onTicketButtonClicked} color="inherit">
              <ConfirmationNumber />
            </IconButton>
          </Box>
          {/* Loading Circle while fetching user data. */}
          {isLoading && (
            <Box>
              <CircularProgress />
            </Box>
          )}
          {data && (
            <Box>
              <Button variant="text" color="inherit">
                <Typography variant="button">{data.user.name}</Typography>
              </Button>
            </Box>
          )}
          {userId ? (
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
