import { useUser } from "@gql/hooks/useUser";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import { Notifications, ConfirmationNumber } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useFriends } from "@gql/hooks/useFriends";
import { MouseEvent, useState, useRef } from "react";
import { useTicket } from "@gql/hooks/useTicket";

const ENDPOINT_SIGN_UP = "/sign_up";
const ENDPOINT_SIGN_IN = "/sign_in";
const ENDPOINT_MAIN = "/schedule";

type Props = {
  userId: string;
  onSignOut: () => any;
};
const Appbar = ({ userId, onSignOut }: Props) => {
  // * HOOKS
  const router = useRouter();
  const { data: userData, addFriendByEmail } = useFriends({ userId });
  const { isLoading, isError, data } = useUser({ userId: userId });
  const { createTicketByEmail } = useTicket({ userId });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isFriendMenuOpened = Boolean(anchorEl);
  const [isAllowFriendDialogOpen, setIsAllowFriendDialogOpen] = useState(false);
  const [isAddFriendDialogOpen, setIsAddFriendDialogOpen] = useState(false);

  // * Ref
  const friendEmailRef = useRef<HTMLInputElement>(null);

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

  function handleFriendMenuClick(event: MouseEvent) {
    event.preventDefault();
    setAnchorEl(event.currentTarget as HTMLElement);
  }
  function handleFriendMenuClose(event: MouseEvent) {
    event.preventDefault();
    setAnchorEl(null);
  }
  function handleAllowRequestClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIsAllowFriendDialogOpen(() => true);
    setAnchorEl(null);
  }
  function handleAddFriendClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIsAddFriendDialogOpen(() => true);
    setAnchorEl(null);
  }

  function handleAllowFriendRequestAllowButtonClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    createTicketByEmail({
      email: friendEmailRef.current?.value.trim() as string,
    });
    setIsAllowFriendDialogOpen(() => false);
  }

  function handleAddFriendAddButtonClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addFriendByEmail(friendEmailRef.current?.value.trim() as string);
    setIsAddFriendDialogOpen(() => false);
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
            <IconButton onClick={handleFriendMenuClick} color="inherit">
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
          <Menu
            anchorEl={anchorEl}
            open={isFriendMenuOpened}
            onClose={handleFriendMenuClose}
          >
            <MenuItem onClick={handleAllowRequestClick}>
              <Typography>Allow Request</Typography>
            </MenuItem>
            <MenuItem onClick={handleAddFriendClick}>
              <Typography>Add Friend</Typography>
            </MenuItem>
          </Menu>
          <Dialog
            open={isAllowFriendDialogOpen}
            onClose={() => setIsAllowFriendDialogOpen(false)}
          >
            <DialogTitle>Allow Friend Request</DialogTitle>
            <TextField
              inputRef={friendEmailRef}
              label="email"
              variant="outlined"
            />
            <DialogActions>
              <Button onClick={() => setIsAllowFriendDialogOpen(() => false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAllowFriendRequestAllowButtonClick}
              >
                Allow
              </Button>
            </DialogActions>
          </Dialog>

          {/* Add Friend Dialog */}
          <Dialog
            open={isAddFriendDialogOpen}
            onClose={() => setIsAddFriendDialogOpen(() => false)}
          >
            <DialogTitle>Add Friend</DialogTitle>
            <TextField
              inputRef={friendEmailRef}
              label="email"
              variant="outlined"
            />
            <DialogActions>
              <Button onClick={() => setIsAddFriendDialogOpen(() => false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddFriendAddButtonClick}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Appbar;
