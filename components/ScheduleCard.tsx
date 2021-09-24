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
  MenuList,
  Paper,
} from "@mui/material";
import { DeleteForever, PlayArrow, Stop, MoreVert } from "@mui/icons-material";
import { format } from "date-fns";
import React, { useState, MouseEvent } from "react";
import { useDeleteSchedule } from "@gql/hooks/useDeleteSchedule";
import { useQueryClient } from "react-query";

// * TYPES
type Props = {
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
      permission: number;
      status: number;
    }[];
    title: string;
    detail: string;
    tsStart: number;
    tsEnd: number;
    tsCreated: number;
    tsLastUpdated: number;
  };
};

const ScheduleCard = ({ schedule }: Props) => {
  // * STATES
  // These are for the menu popups
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

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

  // * HOOKS
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    isError,
    mutate: deleteSchedule,
  } = useDeleteSchedule(schedule.creator._id, queryClient);

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
            <MenuList sx={{ width: 160 }}>
              <MenuItem onClick={onDeleteScheduleClick}>
                <ListItemIcon>
                  <DeleteForever fontSize="medium" />
                </ListItemIcon>
                <Typography fontSize="medium">Delete</Typography>
              </MenuItem>
            </MenuList>
          </Menu>
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
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column">
            <Divider />
            <DateDisplay tsStart={schedule.tsStart} tsEnd={schedule.tsEnd} />
            <Box display="flex">
              <Typography>{schedule.detail}</Typography>
            </Box>
            <Divider />
            <Box mt={1} display="flex" gap={1} justifyContent="right">
              <Button variant="contained">Accept</Button>
              <Button>Reject</Button>
            </Box>
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

export default ScheduleCard;
