import { alpha, Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";

import { Award, awardsService } from "../../../store";
import { Money } from "../../../store/models/common";
import { useNotification } from "../../notification";
import ListItemActions from "./ListItemActions";

interface ListItemProps {
  award: Award;
  awardIndex: number;
  awardsLength: number;
  coveredCost: Money;
}

const ListItem: React.FC<ListItemProps> = ({
  award,
  awardIndex,
  awardsLength,
  coveredCost,
}) => {
  const { showFeedback } = useNotification();
  const handleDelete = useCallback(() => {
    awardsService.delete(award.id);
    showFeedback({ message: "Usunięto!" });
  }, [award.id, showFeedback]);
  const handleIncreaseIndex = useMemo(() => {
    if (awardIndex >= awardsLength - 1) {
      return undefined;
    }
    return () => {
      const newIndex = awardIndex + 1;
      const assignedIndex = awardsService.changeIndex(award.id, newIndex);
      if (assignedIndex !== newIndex) {
        showFeedback({
          message: "Nie można zmienić kolejności",
          type: "error",
        });
      } else {
        showFeedback({ message: "Zmieniono koleność!" });
      }
    };
  }, [awardIndex, award.id, showFeedback, awardsLength]);
  const handleDecreaseIndex = useMemo(() => {
    if (awardIndex <= 0) {
      return undefined;
    }
    return () => {
      const newIndex = awardIndex - 1;
      const assignedIndex = awardsService.changeIndex(award.id, newIndex);
      if (assignedIndex !== newIndex) {
        showFeedback({
          message: "Nie można zmienić kolejności",
          type: "error",
        });
      } else {
        showFeedback({ message: "Zmieniono koleność!" });
      }
    };
  }, [awardIndex, award.id, showFeedback]);

  return (
    <Box
      sx={{
        backgroundImage: `url('${award.imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flex: awardsLength - awardIndex,
        height: "unset",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.background.default, 0.5),
          backdropFilter: "blur(2px)",
          px: 2,
          py: 1,
        })}
      >
        <LinearProgress
          variant="determinate"
          value={(coveredCost / award.cost) * 100}
        />
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="caption">
              {coveredCost.toFixed(2)} / {award.cost.toFixed(2)} PLN (
              {((coveredCost / award.cost) * 100).toFixed(2)}%)
            </Typography>
            <Typography variant="subtitle2">{award.title}</Typography>
          </Box>
          <Box alignSelf="end">
            <ListItemActions
              onDelete={handleDelete}
              onIncreaseIndex={handleIncreaseIndex}
              onDecreaseIndex={handleDecreaseIndex}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ListItem;
