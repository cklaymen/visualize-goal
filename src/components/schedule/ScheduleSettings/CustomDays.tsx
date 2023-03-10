import {
  Stack,
  Paper,
  FormControlLabel,
  Switch,
  IconButton,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

import { scheduleService, ScheduleSettings } from "../../../store";
import { CustomHoursDay } from "../../../store/models/scheduleSettings";

const CustomDays: React.FC = () => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<ScheduleSettings>();
  const {
    fields: customDaysFields,
    prepend: addCustomDay,
    remove: removeCustomDay,
    update: updateCustomDay,
  } = useFieldArray({
    control,
    name: "customDays",
    rules: {
      validate: {
        unique: (values) => {
          console.log(values);
          if (
            values.some(
              (value) =>
                values.filter((it) => it.date === value.date).length > 1
            )
          ) {
            return "Daty nie mogą się powtarzać.";
          }
          return undefined;
        },
      },
    },
  });
  const errorMessage = errors.customDays?.root?.message;
  return (
    <Stack gap={1} overflow="hidden">
      <Button
        onClick={() => addCustomDay({ date: dayjs().format("YYYY-MM-DD") })}
      >
        Dodaj niestandardowy dzień
      </Button>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Stack gap={1} overflow="auto">
        {customDaysFields.map((customDayField, index) => {
          const isCustomHoursDay =
            scheduleService.isCustomHoursDay(customDayField);
          const toggleCustomHoursDay = () => {
            if (isCustomHoursDay) {
              updateCustomDay(index, { date: customDayField.date });
            } else {
              updateCustomDay(index, {
                ...customDayField,
                startTime: getValues("startTime"),
                endTime: getValues("endTime"),
              } as CustomHoursDay);
            }
          };
          return (
            <Stack
              key={customDayField.id}
              gap={1}
              component={Paper}
              elevation={1}
              p={1}
              direction="column"
            >
              <Stack gap={1} direction="row" justifyContent="space-between">
                <FormControlLabel
                  control={
                    <Switch
                      onChange={toggleCustomHoursDay}
                      checked={!isCustomHoursDay}
                    />
                  }
                  label="dzień wolny"
                />
                <IconButton
                  onClick={() => removeCustomDay(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
              <Controller
                control={control}
                name={`customDays.${index}.date`}
                rules={{ required: true }}
                render={({
                  field: { value, onChange, ...restField },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    label="Data"
                    inputFormat="YYYY-MM-DD"
                    value={value || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                    onChange={(newValue: Dayjs | null) => {
                      onChange(newValue?.format("YYYY-MM-DD"));
                    }}
                    {...restField}
                  />
                )}
              />
              {isCustomHoursDay && (
                <>
                  <Controller
                    control={control}
                    name={`customDays.${index}.startTime`}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value, ...restField },
                      fieldState: { error },
                    }) => {
                      return (
                        <TimePicker
                          label="Początek"
                          inputFormat="HH:mm"
                          ampm={false}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                          onChange={(newValue) =>
                            onChange(newValue?.format("HH:mm"))
                          }
                          value={value ? dayjs(value, "HH:mm") : null}
                          {...restField}
                        />
                      );
                    }}
                  />
                  <Controller
                    control={control}
                    name={`customDays.${index}.endTime`}
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value, ...restField },
                      fieldState: { error },
                    }) => {
                      return (
                        <TimePicker
                          label="Koniec"
                          inputFormat="HH:mm"
                          ampm={false}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              error={!!error}
                              helperText={error?.message}
                            />
                          )}
                          onChange={(newValue) =>
                            onChange(newValue?.format("HH:mm"))
                          }
                          value={value ? dayjs(value, "HH:mm") : null}
                          {...restField}
                        />
                      );
                    }}
                  />
                </>
              )}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default CustomDays;
