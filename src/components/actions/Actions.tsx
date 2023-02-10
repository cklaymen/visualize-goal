import { useCallback, useState } from "react";
import { Box, Card, Fab, Modal } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import CalendarIcon from "@mui/icons-material/CalendarMonth";

import AddAward from "../awards/AddAward";
import ScheduleSettings from "../schedule/ScheduleSettings";

const Actions = () => {
  const [isAddAwardOpen, setAddAwardOpen] = useState(false);
  const openAddAward = useCallback(
    () => setAddAwardOpen(true),
    [setAddAwardOpen]
  );
  const closeAddAward = useCallback(
    () => setAddAwardOpen(false),
    [setAddAwardOpen]
  );
  const [isScheduleOpen, setScheduleOpen] = useState(false);
  const openSchedule = useCallback(
    () => setScheduleOpen(true),
    [setScheduleOpen]
  );
  const closeSchedule = useCallback(
    () => setScheduleOpen(false),
    [setScheduleOpen]
  );

  return (
    <>
      <Modal onClose={closeAddAward} open={isAddAwardOpen} >
        <Card sx={{ m: 1, p: 1 }}>
          <AddAward />
        </Card>
      </Modal>
      <Modal onClose={closeSchedule} open={isScheduleOpen}>
        <Card sx={{ m: 1, p: 1 }}>
          <ScheduleSettings />
        </Card>
      </Modal>
      <Box
        position="sticky"
        display="flex"
        justifyContent="end"
        right={0}
        bottom={0}
        p={1}
        gap={1}
      >
        <Fab
          onClick={openAddAward}
          color="primary"
          variant="extended"
          aria-label="add"
        >
          <FlagIcon sx={{ mr: 1 }} /> Dodaj cel
        </Fab>
        <Fab
          onClick={openSchedule}
          color="primary"
          variant="extended"
          aria-label="add"
        >
          <CalendarIcon sx={{ mr: 1 }} /> Harmonogram
        </Fab>
      </Box>
    </>
  );
};

export default Actions;
