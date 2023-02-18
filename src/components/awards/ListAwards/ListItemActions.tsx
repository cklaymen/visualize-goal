import { useState, useCallback } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";

export interface ListItemActionsProps {
  onDecreaseIndex?(): void;
  onIncreaseIndex?(): void;
  onDelete(): void;
}

const ListItemActions: React.FC<ListItemActionsProps> = ({
  onIncreaseIndex,
  onDecreaseIndex,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const handleOpenDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(true);
    setAnchorEl(null);
  }, []);
  const handleCloseDeleteDialog = useCallback(
    () => setOpenDeleteDialog(false),
    []
  );
  const handleConfirmDeleteDialog = useCallback(() => {
    onDelete();
    setOpenDeleteDialog(true);
  }, [onDelete]);
  const handleIncreaseIndex = useCallback(() => {
    if (onIncreaseIndex) {
      onIncreaseIndex();
      setAnchorEl(null);
    }
  }, [onIncreaseIndex]);
  const handleDecreaseIndex = useCallback(() => {
    if (onDecreaseIndex) {
      onDecreaseIndex();
      setAnchorEl(null);
    }
  }, [onDecreaseIndex]);
  const isOpen = Boolean(anchorEl);
  const isIncreaseIndexDisabled = !onIncreaseIndex;
  const isDecreaseIndexDisabled = !onDecreaseIndex;

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} onClose={handleClose} open={isOpen}>
        <MenuItem
          onClick={handleDecreaseIndex}
          disabled={isDecreaseIndexDisabled}
        >
          <ListItemIcon>
            <ArrowDropUpIcon />
          </ListItemIcon>
          <ListItemText>Przenieś wyżej</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={handleIncreaseIndex}
          disabled={isIncreaseIndexDisabled}
        >
          <ListItemIcon>
            <ArrowDropDownIcon />
          </ListItemIcon>
          <ListItemText>Przenieś niżej</ListItemText>
        </MenuItem>
        <MenuItem
          sx={(theme) => ({ color: theme.palette.error.main })}
          onClick={handleOpenDeleteDialog}
        >
          <ListItemIcon sx={(theme) => ({ color: theme.palette.error.main })}>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Usuń element</ListItemText>
        </MenuItem>
      </Menu>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Usunąć?</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            Usuniętego elementu nie będzie można odzyskać!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Nie</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDeleteDialog}
          >
            Tak
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListItemActions;
