import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import {
  incomeService,
  IncomeSettings as IncomeSettingsData,
  useStore,
} from "../../../store";
import { useNotification } from "../../notification";

const IncomeSettings: React.FC = () => {
  const incomeSettings = useStore((store) => store.incomeSettings);
  const { register, handleSubmit } = useForm<IncomeSettingsData>({
    defaultValues: incomeSettings,
  });
  const { showFeedback } = useNotification();

  const changeSettings = useCallback((incomeSettings: IncomeSettingsData) => {
    incomeService.changeSettings(incomeSettings);
    showFeedback({ message: "Zapisano!" });
  }, []);

  return (
    <Stack component="form" onSubmit={handleSubmit(changeSettings)} gap={1}>
      <Stack direction="column" gap={1}>
        <TextField
          label="Stawka NETTO"
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">PLN/H</InputAdornment>,
          }}
          inputProps={{ step: "0.01" }}
          {...register("hourlyRate", { valueAsNumber: true, required: true })}
        />
        <TextField
          label="Podatek"
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          {...register("tax", { valueAsNumber: true, required: true })}
        />
        <TextField
          label="Kapitał początkowy"
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
          }}
          inputProps={{ step: "0.01" }}
          {...register("capital", { valueAsNumber: true, required: true })}
        />
      </Stack>
      <Button variant="contained" type="submit">
        Zapisz
      </Button>
    </Stack>
  );
};

export default IncomeSettings;
