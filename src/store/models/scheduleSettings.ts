type SingleNumber0_9 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type SingleNumber0_8 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type SingleNumber1_9 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type SingleNumber0_5 = 0 | 1 | 2 | 3 | 4 | 5;
type Minutes = `${SingleNumber0_5}${SingleNumber0_9}`;
export type Time =
  | `${0 | 1}${SingleNumber0_9}:${Minutes}`
  | `2${0 | 1 | 2 | 3}:${Minutes}`;
type Days28 =
  | `0${SingleNumber1_9}`
  | `1${SingleNumber0_9}`
  | `2${SingleNumber0_8}`;
type Days30 =
  | `0${SingleNumber1_9}`
  | `1${SingleNumber0_9}`
  | `2${SingleNumber0_9}`
  | `30`;
type Days31 = Days30 | "31";
type MM_DD =
  | `${"01" | "03" | "05" | "07" | "08" | "10" | "12"}-${Days31}`
  | `02-${Days28}`
  | `${"04" | "06" | "09" | "11"}-${Days30}`;
export type DateYYYY_MM_DD = `${number}-${MM_DD}`;
// type DateYYYY_MM_DD = "string";
// type Time = "string";

export interface ScheduleSettings {
  firstDayDate: DateYYYY_MM_DD;
  startTime: Time;
  endTime: Time;
  workingDays: Weekday[];
  customDays: CustomDay[];
}

export type Weekday = number;

export interface HoursSchedule {
  startTime: Time;
  endTime: Time;
}

export type CustomDay = CustomHoursDay | FreeDay;

export interface FreeDay {
  date: string;
}

export interface CustomHoursDay extends HoursSchedule {
  date: DateYYYY_MM_DD;
}
