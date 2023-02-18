import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { Award, awardsService } from "../../../store";
import { useNotification } from "../../notification";

type AwardProps = Omit<Award, "id">;

const AddAward: React.FC = () => {
  const { showFeedback } = useNotification();
  const { register, handleSubmit, reset } = useForm<AwardProps>();

  const addAward = useCallback(
    (award: AwardProps) => {
      awardsService.add(award);
      showFeedback({ message: "Dodano cel!" });
      reset();
    },
    [reset, showFeedback]
  );

  return (
    <Box
      component="form"
      display="grid"
      gap={1}
      onSubmit={handleSubmit(addAward)}
    >
      <TextField label="Tytuł" {...register("title", { required: true })} />
      <TextField
        label="Koszt"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
        }}
        inputProps={{ step: "0.01" }}
        {...register("cost", { valueAsNumber: true, required: true })}
      />
      <TextField
        label="Obrazek"
        placeholder="URL"
        {...register("imageUrl", { required: true })}
      />
      <Button type="submit" variant="contained">
        Dodaj
      </Button>
    </Box>
  );
};

export default AddAward;
