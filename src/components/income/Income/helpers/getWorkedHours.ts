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

export default function getWorkedHours(
  firstDayDate: Dayjs,
  startTime: string,
  endTime: string
) {
  const now = dayjs();
  const todayStart = setDateTime(dayjs(), startTime);
  const todayEnd = setDateTime(dayjs(), endTime);
  const defaultDayWorkedHours = todayEnd.diff(todayStart, "hours");

  let totalHours = 0;
  if (now.isBefore(todayEnd)) {
    const yesterday = dayjs().subtract(1, "day");
    totalHours += yesterday.diff(firstDayDate, "days") * defaultDayWorkedHours;
    totalHours += now.diff(todayStart) / 1000 / 60 / 60;
    return totalHours;
  }
  return now.diff(firstDayDate, "days") * defaultDayWorkedHours;
}
