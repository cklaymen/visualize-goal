import { Box } from "@mui/material";

import { Award, useStore } from "../../../store";
import { Money } from "../../../store/models/common";
import useIncome from "../../income/Income/useIncome";

import ListItem from "./ListItem";

function getCoveredCost(income: Money, awards: Award[], index: number): Money {
  const previousAwardsCost = awards.slice(0, index).reduce((a, b) => a + b.cost, 0)
  return Math.max(0, income - previousAwardsCost);
}

const ListAwards: React.FC = () => {
  const awards = useStore((value) => value.awards);
  const income = useIncome();
  const taxedIncome = income?.taxed;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
      {awards.map((award, i) => (
        <ListItem key={award.id} award={award} flexGrow={awards.length - i} coveredCost={taxedIncome ? getCoveredCost(taxedIncome, awards, i) : 0} />
      ))}
    </Box>
  );
};

export default ListAwards;
