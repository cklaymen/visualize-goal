import { ScheduleSettings } from "../models";
import { CustomDay, CustomHoursDay, FreeDay } from "../models/scheduleSettings";
import { store, Store } from "../setup";

class ScheduleService {
  constructor(private store: Store) {}

  changeSettings(scheduleSettings: ScheduleSettings) {
    this.store.setValue((value) => ({
      ...value,
      scheduleSettings,
    }));
  }

  isFreeDay(customDay: CustomDay): customDay is FreeDay {
    return !("startTime" in customDay);
  }

  isCustomHoursDay(customDay: CustomDay): customDay is CustomHoursDay {
    return "startTime" in customDay;
  }
}

export const scheduleService = new ScheduleService(store);
