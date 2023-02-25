import dayjs, { Dayjs } from "dayjs";

import { ScheduleSettings } from "../../../../../store";

function getHoursAndMinutes(time: string): [number, number] {
  return time.split(":").map(Number) as [number, number];
}

function setDateTime(date: Dayjs, time: string) {
  const [hours, minutes] = getHoursAndMinutes(time);
  return date
    .set("hours", hours)
    .set("minutes", minutes)
    .set("seconds", 0)
    .set("milliseconds", 0);
}

function getIsWorkingDate(date: Dayjs): boolean {
  const day = date.get("day");
  const sunday = 0;
  const saturday = 6;
  const isWeekend = day === sunday || day === saturday;
  return !isWeekend;
}

function getDateTime(date: Dayjs): number | null {
  if (!getIsWorkingDate(date)) {
    return 0;
  }
  return null;
}

function getFullDayDateRangeTime(
  fromDate: Dayjs,
  toDate: Dayjs,
  defaultDayWorkedTime: number
): number {
  let totalTime = 0;
  const daysDiff = toDate.diff(fromDate, "days");
  const iterableDate = fromDate.clone();
  totalTime += getDateTime(iterableDate) ?? defaultDayWorkedTime;
  for (let i = 1; i <= daysDiff; i++) {
    totalTime +=
      getDateTime(iterableDate.add(i, "days")) ?? defaultDayWorkedTime;
  }
  return totalTime;
}

export function getPastDaysWorkedTime(scheduleSettings?: ScheduleSettings) {
  if (!scheduleSettings) {
    return 0;
  }
  const { startTime, endTime } = scheduleSettings;
  const now = dayjs();
  const start = setDateTime(now, startTime);
  const end = setDateTime(now, endTime);
  const defaultDayWorkedTime = end.diff(start);

  const firstDay = dayjs(scheduleSettings.firstDayDate, "YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day");
  return getFullDayDateRangeTime(firstDay, yesterday, defaultDayWorkedTime);
}

export function getTodayWorkedTime(scheduleSettings?: ScheduleSettings) {
  if (!scheduleSettings) {
    return 0;
  }
  const { startTime, endTime } = scheduleSettings;
  const now = dayjs();
  if (!getIsWorkingDate(now)) {
    return 0;
  }
  const toStart = setDateTime(now, startTime);
  const toEnd = setDateTime(now, endTime);

  if (now.isBefore(toEnd)) {
    return toStart.diff(now);
  }
  return toEnd.diff(toStart);
}
