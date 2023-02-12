import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  ScheduleSettings as ScheduleSettingsData,
  incomeSettingsService,
  useStore,
} from "../../../store";

function onSubmit(scheduleSettings: ScheduleSettingsData) {
  incomeSettingsService.set(scheduleSettings);
}

const ScheduleSettings: React.FC = () => {
  const scheduleSettings = useStore((store) => store.scheduleSettings);
  const { register, handleSubmit } = useForm<ScheduleSettingsData>({
    defaultValues: scheduleSettings,
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="grid" gap={1}>
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
        Zapisz
      </Button>
    </Box>
  );
};

export default ScheduleSettings;
