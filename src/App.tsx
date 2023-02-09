import { Box } from "@mui/material";

import ListAwards from "./components/awards/ListAwards";
import Actions from "./components/actions";

function App() {
  return (
    <Box sx={{ display: "grid", height: 1, gridTemplateRows: "1fr auto" }}>
      <ListAwards />
      <Actions />
    </Box>
  );
}

export default App;
