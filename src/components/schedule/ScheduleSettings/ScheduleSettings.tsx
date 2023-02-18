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
      scheduleService.changeSettings(scheduleSettings);
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
          rules={{ required: true }}
          render={({
            field: { value, ...restField },
            fieldState: { error },
          }) => (
            <DatePicker
              label="Data rozpoczęcia"
              inputFormat="YYYY-MM-DD"
              value={value || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
              {...restField}
            />
          )}
        />
        <Controller
          control={control}
          name="startTime"
          rules={{ required: true }}
          render={({
            field: { onChange, value, ...restField },
            fieldState: { error },
          }) => {
            return (
              <TimePicker
                label="Start"
                inputFormat="HH:mm"
                ampm={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
                onChange={(newValue) => onChange(newValue?.format("HH:mm"))}
                value={value ? dayjs(value, "HH:mm") : null}
                {...restField}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="endTime"
          rules={{ required: true }}
          render={({
            field: { onChange, value, ...restField },
            fieldState: { error },
          }) => (
            <TimePicker<Dayjs>
              label="Koniec"
              inputFormat="HH:mm"
              ampm={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
              onChange={(newValue) => onChange(newValue?.format("HH:mm"))}
              value={value ? dayjs(value, "HH:mm") : null}
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
