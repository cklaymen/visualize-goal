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

function getWorkedTime(
  from: Dayjs,
  to: Dayjs,
  startTime: string,
  endTime: string
) {
  const toStart = setDateTime(to.clone(), startTime);
  const toEnd = setDateTime(to.clone(), endTime);
  const defaultDayWorkedTime = toEnd.diff(toStart);

  if (to.isBefore(toEnd)) {
    const dayBeforeToDate = dayjs().subtract(1, "day");
    let totalTime = getFullDayDateRangeTime(
      from,
      dayBeforeToDate,
      defaultDayWorkedTime
    );
    totalTime += getDateTime(to) ?? to.diff(toStart);
    return totalTime;
  }

  return getFullDayDateRangeTime(from, to, defaultDayWorkedTime);
}

export function getPastDaysWorkedTime(scheduleSettings?: ScheduleSettings) {
  if (!scheduleSettings) {
    return 0;
  }
  return getWorkedTime(
    dayjs(scheduleSettings.firstDayDate, "YYYY-MM-DD"),
    dayjs().subtract(1, "day").endOf("day"),
    scheduleSettings.startTime,
    scheduleSettings.endTime
  );
}

export function getTodayWorkedTime(scheduleSettings?: ScheduleSettings) {
  if (!scheduleSettings) {
    return 0;
  }
  return getWorkedTime(
    dayjs().startOf("day"),
    dayjs(),
    scheduleSettings.startTime,
    scheduleSettings.endTime
  );
}

// export function timeToStartWork(): number | null {
//   const now = dayjs();
//   const isWorkingDate = getIsWorkingDate(now);
//   if (!isWorkingDate) {

//   }
// }
