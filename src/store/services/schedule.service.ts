import { ScheduleSettings } from "../models";
import { store, Store } from "../setup";

class ScheduleService {
  constructor(private store: Store) {}

  changeSettings(scheduleSettings: ScheduleSettings) {
    this.store.setValue((value) => ({
      ...value,
      scheduleSettings,
    }));
  }
}

export const scheduleService = new ScheduleService(store);
