import { useCallback } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";

import {
  ScheduleSettings as ScheduleSettingsData,
  scheduleService,
  useStore,
} from "../../../store";
import { useNotification } from "../../notification";
import dayjs, { Dayjs } from "dayjs";

const ScheduleSettings: React.FC = () => {
  const scheduleSettings = useStore((store) => store.scheduleSettings);
  const { handleSubmit, control } = useForm<ScheduleSettingsData>({
    defaultValues: scheduleSettings,
  });
  const { showFeedback } = useNotification();

  const changeSettings = useCallback(
    (scheduleSettings: ScheduleSettingsData) => {
      console.log(scheduleSettings);
      // scheduleService.changeSettings(scheduleSettings);
      showFeedback({ message: "Zapisano!" });
    },
    []
  );

  return (
    <Stack component="form" onSubmit={handleSubmit(changeSettings)} gap={1}>
      <Stack gap={1} direction="column">
        <Controller
          control={control}
          name="firstDayDate"
          render={({ field }) => (
            <DatePicker
              label="Data rozpoczęcia"
              inputFormat="YYYY-MM-DD"
              renderInput={(params) => <TextField {...params} />}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="startTime"
          render={({ field: { onChange, value, ...restField } }) => {
            return (
              <TimePicker
                label="Start"
                inputFormat="HH:mm"
                ampm={false}
                renderInput={(params) => <TextField {...params} />}
                onChange={(newValue) => onChange(newValue?.format("HH:mm"))}
                value={dayjs(value, "HH:mm")}
                {...restField}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="endTime"
          render={({ field: { onChange, value, ...restField } }) => (
            <TimePicker<Dayjs>
              label="Koniec"
              inputFormat="HH:mm"
              ampm={false}
              renderInput={(params) => <TextField {...params} />}
              onChange={(newValue) => onChange(newValue?.format("HH:mm"))}
              value={dayjs(value, "HH:mm")}
              {...restField}
            />
          )}
        />
      </Stack>
      <Button type="submit" variant="contained">
        Zapisz
      </Button>
    </Stack>
  );
};

export default ScheduleSettings;
