import { IncomeSettings } from "../models";
import { store, Store } from "../setup";

class IncomeSettingsService {
  constructor(private store: Store) {}

  set(incomeSettings: IncomeSettings) {
    this.store.setValue((value) => ({ ...value, incomeSettings }));
  }
}

export const incomeSettingsService = new IncomeSettingsService(store);
