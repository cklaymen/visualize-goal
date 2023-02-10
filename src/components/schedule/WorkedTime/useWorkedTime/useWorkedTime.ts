import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useStore } from "../../../../store";

import getWorkedTime from "./helpers/getWorkedTime";

const useWorkedTime = (updateIntervalInMs = 1000) => {
  const scheduleSettings = useStore((value) => value.scheduleSettings);
  const [workedHours, setWorkedHours] = useState<number>();

  useEffect(() => {
    if (!scheduleSettings) {
      return undefined;
    }
    function updateWorkedHours() {
      const currentWorkedHours = getWorkedTime(
        dayjs(scheduleSettings!.firstDayDate, "YYYY-MM-DD"),
        scheduleSettings!.startTime,
        scheduleSettings!.endTime
      );
      setWorkedHours(currentWorkedHours);
    }
    const t = setInterval(updateWorkedHours, updateIntervalInMs);
    return () => clearInterval(t);
  }, [scheduleSettings, updateIntervalInMs]);

  return workedHours;
};

export default useWorkedTime;
