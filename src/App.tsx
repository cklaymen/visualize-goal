import { Box } from "@mui/material";

import ListAwards from "./components/awards/ListAwards";
import Actions from "./components/actions";
import WorkedTime from "./components/schedule/WorkedTime/WorkedTime";

function App() {
  return (
    <Box sx={{ display: "grid", height: 1, gridTemplateRows: "auto 1fr auto" }}>
      <Box><WorkedTime /></Box>
      <ListAwards />
      <Actions />
    </Box>
  );
}

export default App;
