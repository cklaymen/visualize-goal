import { Box, LinearProgress, Typography } from "@mui/material";

import useAwardsTotalCost from "../../awards/useAwardsTotalCost";

import useIncome from "./useIncome";

const Income: React.FC = () => {
  const awardsTotalCost = useAwardsTotalCost();
  const income = useIncome();

  if (!income) {
    return null;
  }

  const taxedProgress = (income.taxed / awardsTotalCost) * 100;

  return (
    <Box p={1} pt={0}>
      <Typography variant="subtitle1">
        {Number(income.taxed).toFixed(2)} / {awardsTotalCost} PLN (
        {taxedProgress.toFixed(2)}%)
      </Typography>
      <LinearProgress variant="determinate" value={taxedProgress} />
    </Box>
  );
};

export default Income;
