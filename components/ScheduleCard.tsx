import {
  Accordion,
  Box,
  Container,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
  MenuList,
} from "@mui/material";
import {
  DeleteForever,
  PlayArrow,
  Add,
  Stop,
  MoreVert,
  PersonAddAlt1,
  VerifiedUser,
  Edit,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useState, MouseEvent, FC } from "react";
import { useDeleteSchedule } from "@gql/hooks/useDeleteSchedule";
import { ScheduleStatus } from "@util/app/ScheduleManager";
import { useUpdateParticipantStatus } from "@gql/hooks/useUpdateParticipantStatus";
import { useFriends } from "@gql/hooks/useFriends";
import Avatar from "react-avatar";

// * TYPES
type Props = {
  userId: string;
  schedule: {
    _id: string;
    creator: {
      _id: string;
      name: string;
    };
    participants: {
      user: {
        _id: string;
        name: string;
      };
      inviter: {
        _id: string;
        name: string;
      };
      permission: number;
      status: number;
    }[];
    status: number;
    title: string;
    detail: string;
    tsStart: number;
    tsEnd: number;
    tsCreated: number;
    tsLastUpdated: number;
  };
};

// * MAIN FUNCTION
const ScheduleCard = ({ userId, schedule }: Props) => {
  const status = schedule.participants.filter(
    (participant) => participant.user._id === userId
  )[0].status;

  // * STATES
  // These are for the menu popups
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isAddParticipantDialogOpen, setIsAddParticipantDialogOpen] =
    useState<boolean>(false);

  // * HOOKS
  const { data } = useFriends({ userId: userId });
  const {
    isLoading: isDeleting,
    isError: isDeleteError,
    mutate: deleteSchedule,
  } = useDeleteSchedule(schedule.creator._id);
  const {
    isLoading: isUpdating,
    isError: isUpdateError,
    mutate: updateStatus,
  } = useUpdateParticipantStatus(schedule, userId);

  // * FUNCTIONS
  function onMoreClicked(event: MouseEvent) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget as HTMLElement);
  }

  function onMenuClose(event: MouseEvent) {
    event.stopPropagation();
    setAnchorEl(null);
  }

  function onDeleteScheduleClick(event: MouseEvent) {
    event.stopPropagation();
    setIsDeleteDialogOpen(true);
    setAnchorEl(null);
  }

  function onDeleteScheduleDialogClose(event: MouseEvent) {
    setIsDeleteDialogOpen(false);
  }

  function onDeleteScheduleDialogCancelButtonClicked(event: MouseEvent) {
    setIsDeleteDialogOpen(false);
  }
  function onDeleteScheduleDialogDeleteButtonClicked(event: MouseEvent) {
    deleteSchedule({ scheduleId: schedule._id });
    setIsDeleteDialogOpen(false);
  }

  function onAcceptClicked(event: MouseEvent) {
    updateStatus({ participantStatus: ScheduleStatus.CONFIRMED });
  }

  function onRejectClicked(event: MouseEvent) {
    updateStatus({ participantStatus: ScheduleStatus.DECLINED });
  }
  function onAddParticipantsClicked(event: MouseEvent) {
    event.stopPropagation();
    setIsAddParticipantDialogOpen(true);
    setAnchorEl(null);
  }

  function onAddParticipantDialogClose(event: MouseEvent) {
    setIsAddParticipantDialogOpen(false);
  }

  function onAddParticipantDialogApplyButtonClicked(event: MouseEvent) {
    console.log(`Apply Add Participant Clicked!`);
  }
  function onAddParticipantDialogCancelButtonClicked(event: MouseEvent) {
    setIsAddParticipantDialogOpen(false);
  }

  function onEditParticipantsPermissionClicked(event: MouseEvent) {
    event.stopPropagation();
    console.log(`Edit Permission Clicked!`);
  }
  function onEditScheduleClicked(event: MouseEvent) {
    event.stopPropagation();
    console.log(`Edit Schedule Cicked!`);
  }

  return (
    <Container maxWidth="xs">
      <Accordion defaultExpanded={true}>
        <AccordionSummary sx={{ display: "flex" }}>
          <Typography sx={{ mr: "auto" }} variant="h6">
            {schedule.title}
          </Typography>
          <IconButton onClick={onMoreClicked} size="small">
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={onMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList sx={{ width: 320 }}>
              <MenuItem onClick={onEditScheduleClicked}>
                <ListItemIcon>
                  <Edit fontSize="medium" />
                </ListItemIcon>
                <Typography fontSize="medium">Edit Schedule</Typography>
              </MenuItem>
              <MenuItem onClick={onAddParticipantsClicked}>
                <ListItemIcon>
                  <PersonAddAlt1 fontSize="medium" />
                </ListItemIcon>
                <Typography fontSize="medium">Add Participant</Typography>
              </MenuItem>
              <MenuItem onClick={onEditParticipantsPermissionClicked}>
                <ListItemIcon>
                  <VerifiedUser fontSize="medium" />
                </ListItemIcon>
                <Typography fontSize="medium">Edit Permission</Typography>
              </MenuItem>
              <MenuItem onClick={onDeleteScheduleClick}>
                <ListItemIcon>
                  <DeleteForever fontSize="medium" />
                </ListItemIcon>
                <Typography fontSize="medium">Delete</Typography>
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Delete Schedule Dialog */}
          <Dialog
            onClick={(event) => event.stopPropagation()}
            open={isDeleteDialogOpen}
            onClose={onDeleteScheduleDialogClose}
          >
            <DialogTitle>{`Delete Schedule?`}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure to delete this schedule? Once you delete the
                schedule, you cannot recover it.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onDeleteScheduleDialogCancelButtonClicked}>
                Cancel
              </Button>
              <Button
                onClick={onDeleteScheduleDialogDeleteButtonClicked}
                variant="contained"
                color="error"
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {/* Add Participant Dialog */}
          <Dialog
            fullWidth={true}
            maxWidth="xs"
            onClick={(event) => event.stopPropagation()}
            open={isAddParticipantDialogOpen}
            onClose={onAddParticipantDialogClose}
          >
            <DialogTitle>{`Add Participant`}</DialogTitle>
            <DialogContent>
              {data && <FriendsMenu friends={data.friends} />}
            </DialogContent>
            <DialogActions>
              <Button onClick={onAddParticipantDialogCancelButtonClicked}>
                Cancel
              </Button>
              <Button
                onClick={onAddParticipantDialogApplyButtonClicked}
                variant="contained"
                color="primary"
                autoFocus
              >
                Apply
              </Button>
            </DialogActions>
          </Dialog>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column">
            <Divider />
            <DateDisplay tsStart={schedule.tsStart} tsEnd={schedule.tsEnd} />
            <Box display="flex">
              <Typography>{schedule.detail}</Typography>
            </Box>

            {status == ScheduleStatus.PENDING && (
              <>
                <Divider />
                <Box mt={1} display="flex" gap={1} justifyContent="right">
                  <Button onClick={onAcceptClicked} variant="contained">
                    Accept
                  </Button>
                  <Button onClick={onRejectClicked}>Reject</Button>
                </Box>
              </>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

const DateDisplay = ({
  tsStart,
  tsEnd,
}: {
  tsStart: number;
  tsEnd: number;
}) => {
  const startTime = format(new Date(tsStart), "yyyy-MM-dd p");
  const endTime = format(new Date(tsEnd), "yyyy-MM-dd p");
  return (
    <Box my={1} display="flex">
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <PlayArrow color="primary" />
        <Typography>{startTime}</Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <Stop color="primary" />
        <Typography>{endTime}</Typography>
      </Box>
    </Box>
  );
};

type FriendsMenuProps = {
  friends: {
    _id: string;
    name: string;
  }[];
};

const FriendsMenu: FC<FriendsMenuProps> = ({ friends }) => {
  return (
    <List>
      <ListItem>
        <Typography>Friends</Typography>
      </ListItem>

      {friends &&
        friends.length > 0 &&
        friends.map((friend) => {
          return <FriendRow key={friend._id} friend={friend} />;
        })}
      <Divider variant="middle" />
      <ListItem>
        <Typography>Added</Typography>
      </ListItem>
    </List>
  );
};

type FriendRowProps = {
  friend: {
    _id: string;
    name: string;
  };
};
const FriendRow: FC<FriendRowProps> = ({ friend }) => {
  return (
    <ListItem key={friend._id}>
      <ListItemAvatar>
        <Avatar name={friend.name} size="36px" round={true} textSizeRatio={2} />
      </ListItemAvatar>
      <ListItemText primary={friend.name} />
      <IconButton>
        <Add />
      </IconButton>
    </ListItem>
  );
};

export default ScheduleCard;
