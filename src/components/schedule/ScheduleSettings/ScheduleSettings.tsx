import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  ScheduleSettings as ScheduleSettingsData,
  scheduleService,
  useStore,
} from "../../../store";


const ScheduleSettings: React.FC = () => {
  const [feedback, showFeedback] = useState(false);
  const scheduleSettings = useStore((store) => store.scheduleSettings);
  const { register, handleSubmit } = useForm<ScheduleSettingsData>({
    defaultValues: scheduleSettings,
  });

  const changeSettings = useCallback((scheduleSettings: ScheduleSettingsData) => {
    scheduleService.changeSettings(scheduleSettings)
    showFeedback(true);
  }, [])

  return (
    <Stack component="form" onSubmit={handleSubmit(changeSettings)} gap={1}>
      <Stack gap={1} direction="row">
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
      </Stack>
      <Button type="submit" variant="contained">
        Zapisz
      </Button>
      <Snackbar open={feedback} onClose={() => showFeedback(false)} autoHideDuration={2000}><Alert severity="success">Zapisano!</Alert></Snackbar>
    </Stack>
  );
};

export default ScheduleSettings;
