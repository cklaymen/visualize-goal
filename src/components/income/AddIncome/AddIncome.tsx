import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  IncomeSettings,
  incomeSettingsService,
  useStore,
} from "../../../store";

function onSubmit(incomeSettings: IncomeSettings) {
  incomeSettingsService.set(incomeSettings);
}

const AddIncome: React.FC = () => {
  const incomeSettings = useStore((store) => store.incomeSettings);
  const { register, handleSubmit } = useForm<IncomeSettings>({
    defaultValues: incomeSettings,
  });
  
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" gap={1}>
        <TextField
          type="date"
          label="Data rozpoczęcia"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("firstDayDate")}
        />
        <TextField
          type="time"
          label="Start"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("startTime")}
        />
        <TextField
          type="time"
          label="Koniec"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("endTime")}
        />
      </Box>
      <Button type="submit" variant="contained">
        Ustaw
      </Button>
      {JSON.stringify(incomeSettings)}
    </Box>
  );
};

export default AddIncome;
