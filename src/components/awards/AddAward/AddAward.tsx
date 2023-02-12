import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { Award, awardsService } from "../../../store";

type AwardProps = Omit<Award, "id">;

function onSubmit(award: AwardProps) {
  console.log(award);
  // awardsService.add(award);
}

const AddAward: React.FC = () => {
  const { register, handleSubmit } = useForm<AwardProps>();

  return (
    <Box
      component="form"
      display="grid"
      gap={1}
      onSubmit={handleSubmit(onSubmit)}
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
    </Box>
  );
};

export default AddAward;
