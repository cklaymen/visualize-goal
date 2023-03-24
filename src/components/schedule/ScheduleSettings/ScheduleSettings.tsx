import { useCallback } from "react";
import {
  Button,
  DialogContent,
  DialogProps,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Controller, FormProvider, useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

import {
  ScheduleSettings as ScheduleSettingsData,
  scheduleService,
  useStore,
} from "../../../store";
import { useNotification } from "../../notification";
import CustomDays from "./CustomDays";

const ScheduleSettings: React.FC = () => {
  const scheduleSettings = useStore((store) => store.scheduleSettings);
  const form = useForm<ScheduleSettingsData>({
    defaultValues: scheduleSettings,
  });
  const { handleSubmit, control } = form;
  const { showFeedback } = useNotification();

  const changeSettings = useCallback(
    (scheduleSettings: ScheduleSettingsData) => {
      scheduleService.changeSettings({
        ...scheduleSettings,
        customDays: scheduleSettings.customDays.sort((a, b) =>
          dayjs(b.date).diff(dayjs(a.date), "days")
        ),
      });
      showFeedback({ message: "Zapisano!" });
    },
    [showFeedback]
  );

  return (
    <DialogContent sx={{ display: "grid" }}>
      <FormProvider {...form}>
        <Stack
          component="form"
          onSubmit={handleSubmit(changeSettings)}
          gap={2}
          overflow="hidden"
        >
          <Stack
            gap={1}
            direction="column"
            overflow="hidden"
            sx={{ flexShrink: 0, pt: 1 }}
          >
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
          <CustomDays />
          <Button type="submit" variant="contained">
            Zapisz
          </Button>
        </Stack>
      </FormProvider>
    </DialogContent>
  );
};

export default ScheduleSettings;
