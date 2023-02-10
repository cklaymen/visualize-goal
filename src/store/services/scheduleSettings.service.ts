import { ScheduleSettings } from "../models";
import { store, Store } from "../setup";

class ScheduleSettingsService {
  constructor(private store: Store) {}

  set(incomeSettings: ScheduleSettings) {
    this.store.setValue((value) => ({
      ...value,
      scheduleSettings: incomeSettings,
    }));
  }
}

export const scheduleSettingsService = new ScheduleSettingsService(store);
