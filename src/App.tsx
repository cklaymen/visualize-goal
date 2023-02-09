import { Box } from "@mui/material";

import ListAwards from "./components/awards/ListAwards";
import Actions from "./components/actions";
import Income from "./components/income/Income";

function App() {
  return (
    <Box sx={{ display: "grid", height: 1, gridTemplateRows: "auto 1fr auto" }}>
      <Income />
      <ListAwards />
      <Actions />
    </Box>
  );
}

export default App;
