import { useCallback, useState } from "react";
import { Box, Card, Dialog, Fab, Modal, SxProps, Theme } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import MoneyIcon from "@mui/icons-material/AttachMoney";

import AddAward from "../awards/AddAward";
import ScheduleSettings from "../schedule/ScheduleSettings";
import IncomeSettings from "../income/IncomeSettings";

const cardSx: SxProps<Theme> = (theme) => ({
  m: 1,
  p: 1,
  position: "absolute",
  bottom: 72,
  right: 0,
  maxWidth: `calc(100% - 2 * ${theme.spacing(1)})`,
});

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

  const [isIncomeSettingsOpen, setIncomeSettingsOpen] = useState(false);
  const openIncomeSettings = useCallback(
    () => setIncomeSettingsOpen(true),
    [setIncomeSettingsOpen]
  );
  const closeIncomeSettings = useCallback(
    () => setIncomeSettingsOpen(false),
    [setIncomeSettingsOpen]
  );

  return (
    <>
      <Modal onClose={closeAddAward} open={isAddAwardOpen}>
        <Card sx={cardSx}>
          <AddAward />
        </Card>
      </Modal>

      <Dialog open={isScheduleOpen} onClose={closeSchedule}>
        <ScheduleSettings />
      </Dialog>

      <Modal onClose={closeIncomeSettings} open={isIncomeSettingsOpen}>
        <Card sx={cardSx}>
          <IncomeSettings />
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
        <Fab onClick={openAddAward} color="primary" aria-label="dodaj cel">
          <FlagIcon />
        </Fab>
        <Fab onClick={openSchedule} color="primary" aria-label="harmonogram">
          <CalendarIcon />
        </Fab>
        <Fab onClick={openIncomeSettings} color="primary" aria-label="dochód">
          <MoneyIcon />
        </Fab>
      </Box>
    </>
  );
};

export default Actions;
