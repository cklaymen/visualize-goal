import { Button, Stack, TextField } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import {
  ScheduleSettings as ScheduleSettingsData,
  scheduleService,
  useStore,
} from "../../../store";
import { useNotification } from "../../notification";

const ScheduleSettings: React.FC = () => {
  const scheduleSettings = useStore((store) => store.scheduleSettings);
  const { register, handleSubmit } = useForm<ScheduleSettingsData>({
    defaultValues: scheduleSettings,
  });
  const { showFeedback } = useNotification();

  const changeSettings = useCallback(
    (scheduleSettings: ScheduleSettingsData) => {
      scheduleService.changeSettings(scheduleSettings);
      showFeedback({ message: "Zapisano!" });
    },
    []
  );

  return (
    <Stack component="form" onSubmit={handleSubmit(changeSettings)} gap={1}>
      <Stack gap={1} direction="row">
        <TextField
          sx={{
            minWidth: "8em",
          }}
          type="date"
          label="Data rozpoczęcia"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("firstDayDate")}
        />
        <TextField
          sx={{ minWidth: "5em" }}
          type="time"
          label="Start"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("startTime")}
        />
        <TextField
          sx={{ minWidth: "5em" }}
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
    </Stack>
  );
};

export default ScheduleSettings;
