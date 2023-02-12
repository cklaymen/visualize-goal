import { Alert, Box, Button, InputAdornment, Snackbar, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Award, awardsService } from "../../../store";

type AwardProps = Omit<Award, "id">;

const AddAward: React.FC = () => {
  const [feedback, showFeedback] = useState(false);
  const { register, handleSubmit, reset } = useForm<AwardProps>();

  const addAward = useCallback((award: AwardProps) => {
    awardsService.add(award);
    showFeedback(true);
    reset()
  }, [reset])

  return (
    <Box
      component="form"
      display="grid"
      gap={1}
      onSubmit={handleSubmit(addAward)}
    >
      <TextField label="Tytuł" {...register("title")} />
      <TextField
        label="Koszt"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
        }}
        inputProps={{ step: "0.01" }}
        {...register("cost", { valueAsNumber: true })}
      />
      <TextField label="Obrazek" placeholder="URL" {...register("imageUrl")} />
      <Button type="submit" variant="contained">
        Dodaj
      </Button>
      <Snackbar open={feedback} onClose={() => showFeedback(false)} autoHideDuration={2000}><Alert severity="success">Dodano cel!</Alert></Snackbar>
    </Box>
  );
};

export default AddAward;
