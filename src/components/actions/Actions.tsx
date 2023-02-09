import { useCallback, useState } from "react";
import { Box, Card, Fab, Modal } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import MoneyIcon from "@mui/icons-material/AttachMoney";

import AddAward from "../awards/AddAward";
import AddIncome from "../income/AddIncome";

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
  const [isMoneySourceOpen, setMoneySourceOpen] = useState(false);
  const openMoneySource = useCallback(
    () => setMoneySourceOpen(true),
    [setMoneySourceOpen]
  );
  const closeMoneySource = useCallback(
    () => setMoneySourceOpen(false),
    [setMoneySourceOpen]
  );

  return (
    <>
      <Modal onClose={closeAddAward} open={isAddAwardOpen}>
        <Card sx={{ m: 1, p: 1 }}>
          <AddAward />
        </Card>
      </Modal>
      <Modal onClose={closeMoneySource} open={isMoneySourceOpen}>
        <Card sx={{ m: 1, p: 1 }}>
          <AddIncome />
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
          onClick={openMoneySource}
          color="primary"
          variant="extended"
          aria-label="add"
        >
          <MoneyIcon sx={{ mr: 1 }} /> Dodaj PLN
        </Fab>
      </Box>
    </>
  );
};

export default Actions;
