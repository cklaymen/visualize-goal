export interface ScheduleSettings {
  firstDayDate: string;
  startTime: string;
  endTime: string;
  workingDays: Weekday[];
  customDays: CustomDay[];
}

export type Weekday = number;

export type CustomDay = CustomHoursDay | FreeDay;

export interface FreeDay {
  date: string;
}

export interface CustomHoursDay {
  date: string;
  startTime: string;
  endTime: string;
}
