import dayjs from "dayjs";
import { useMemo } from "react";

import { useStore } from "../../../store";
import { Money } from "../../../store/models/common";
import { useWorkedTime } from "../../schedule/WorkedTime";

interface ReturnValue {
  netto: Money;
  taxed: Money;
}

const useIncome = (): ReturnValue | null => {
  const incomeSettings = useStore((value) => value.incomeSettings);
  const taxedHourlyRate = useMemo(() => {
    if (!incomeSettings) {
      return null;
    }
    return incomeSettings.hourlyRate * ((100 - incomeSettings.tax) / 100);
  }, [incomeSettings]);
  const updateTimeIntervalInMs = useMemo(
    () =>
      taxedHourlyRate
        ? (1 * 60 * 60 * 1000) / (taxedHourlyRate * 100)
        : undefined,
    [taxedHourlyRate]
  );
  const workedTime = useWorkedTime(updateTimeIntervalInMs);

  return useMemo<ReturnValue | null>(() => {
    if (!workedTime || !incomeSettings) {
      return null;
    }
    const workedHours = dayjs.duration(workedTime).asHours();
    return {
      netto: incomeSettings.hourlyRate * workedHours,
      taxed: taxedHourlyRate! * workedHours,
    };
  }, [workedTime, taxedHourlyRate]);
};

export default useIncome;
