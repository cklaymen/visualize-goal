import dayjs, { Dayjs } from "dayjs";

import { scheduleService, ScheduleSettings } from "../../../../../store";
import { HoursSchedule } from "../../../../../store/models/scheduleSettings";

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

function getDateWorkTime(
  scheduleSettings: ScheduleSettings,
  date: Dayjs
): number {
  const dateWorkHoursSchedule = getDateWorkHoursSchedule(
    scheduleSettings,
    date
  );
  if (!dateWorkHoursSchedule) {
    return 0;
  }
  const { startTime, endTime } = dateWorkHoursSchedule;
  const dateStartTime = setDateTime(date, startTime);
  const dateEndTime = setDateTime(date, endTime);
  return dateEndTime.diff(dateStartTime);
}

function getFullDayDateRangeTime(
  scheduleSettings: ScheduleSettings,
  fromDate: Dayjs,
  toDate: Dayjs
): number {
  let totalTime = 0;
  const daysDiff = toDate.diff(fromDate, "days");
  const iterableDate = fromDate.clone();
  totalTime += getDateWorkTime(scheduleSettings, iterableDate);
  for (let i = 1; i <= daysDiff; i++) {
    totalTime += getDateWorkTime(scheduleSettings, iterableDate.add(i, "days"));
  }
  return totalTime;
}

export function getPastDaysWorkedTime(scheduleSettings?: ScheduleSettings) {
  if (!scheduleSettings) {
    return 0;
  }

  const firstDay = dayjs(scheduleSettings.firstDayDate, "YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day");
  return getFullDayDateRangeTime(scheduleSettings, firstDay, yesterday);
}

export function getTodayWorkedTime(scheduleSettings?: ScheduleSettings) {
  if (!scheduleSettings) {
    return 0;
  }
  const now = dayjs();
  const dateWorkHoursSchedule = getDateWorkHoursSchedule(scheduleSettings, now);
  if (!dateWorkHoursSchedule) {
    return 0;
  }
  const { startTime, endTime } = dateWorkHoursSchedule;
  const toStart = setDateTime(now, startTime);
  if (now.isBefore(toStart)) {
    return 0;
  }
  const toEnd = setDateTime(now, endTime);

  if (now.isBefore(toEnd)) {
    return now.diff(toStart);
  }
  return toEnd.diff(toStart);
}

function getDateWorkHoursSchedule(
  scheduleSettings: ScheduleSettings,
  date: Dayjs
): HoursSchedule | null {
  if (!getIsWorkingDate(date)) {
    return null;
  }
  const { startTime, endTime, customDays } = scheduleSettings;
  const customDay = customDays.find((it) => date.isSame(it.date, "date"));
  if (customDay) {
    if (scheduleService.isCustomHoursDay(customDay)) {
      return {
        startTime: customDay.startTime,
        endTime: customDay.endTime,
      };
    }
    return null;
  }
  return {
    startTime,
    endTime,
  };
}
