import { useEffect, useMemo, useState } from "react";

import { useStore } from "../../../../store";

import {
  getPastDaysWorkedTime,
  getTodayWorkedTime,
} from "./helpers/getWorkedTime";

const useWorkedTime = (updateIntervalInMs = 1000) => {
  const scheduleSettings = useStore((value) => value.scheduleSettings);
  const [todayWorkedTime, setTodayWorkedTime] = useState<number>(
    getTodayWorkedTime()
  );
  const pastDaysWorkedTime = useMemo(
    () => getPastDaysWorkedTime(scheduleSettings),
    [scheduleSettings]
  );

  useEffect(() => {
    const t = setInterval(() => {
      setTodayWorkedTime(getTodayWorkedTime(scheduleSettings));
    }, updateIntervalInMs);
    return () => clearInterval(t);
  }, [scheduleSettings, updateIntervalInMs]);

  return pastDaysWorkedTime + todayWorkedTime;
};

export default useWorkedTime;
