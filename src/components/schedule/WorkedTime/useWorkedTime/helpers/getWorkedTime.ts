import dayjs, { Dayjs } from "dayjs";

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

function getDateTime(date: Dayjs): number | null {
  const day = date.get("day");
  const sunday = 0;
  const saturday = 6;
  const isWeekend = day === sunday || day === saturday;
  if (isWeekend) {
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

export default function getWorkedTime(
  firstDayDate: Dayjs,
  startTime: string,
  endTime: string
) {
  const now = dayjs();
  const todayStart = setDateTime(dayjs(), startTime);
  const todayEnd = setDateTime(dayjs(), endTime);
  const defaultDayWorkedTime = todayEnd.diff(todayStart);

  if (now.isBefore(todayEnd)) {
    const yesterday = dayjs().subtract(1, "day");
    let totalTime = getFullDayDateRangeTime(
      firstDayDate,
      yesterday,
      defaultDayWorkedTime
    );
    totalTime += now.diff(todayStart);
    return totalTime;
  }

  return getFullDayDateRangeTime(firstDayDate, now, defaultDayWorkedTime);
}
