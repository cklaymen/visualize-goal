import { store, Store } from "../setup";
import { IncomeSettings } from "../models";

class IncomeService {
  constructor(private store: Store) {}

  changeSettings(incomeSettings: IncomeSettings) {
    store.setValue((value) => ({ ...value, incomeSettings }));
  }
}

export const incomeService = new IncomeService(store);
