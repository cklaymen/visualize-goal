import { Store as StoreClass, createUseStore } from "./core";
import { Award, IncomeSettings, ScheduleSettings } from "./models";

export interface StoreValue {
  awards: Array<Award>;
  scheduleSettings?: ScheduleSettings;
  incomeSettings?: IncomeSettings;
}

const LS_CACHE_KEY = "store_cache";
const rawStoreCache = localStorage.getItem(LS_CACHE_KEY);
const storeCache = rawStoreCache && JSON.parse(rawStoreCache);
const initialValue: StoreValue = { awards: [] };

export const store = new StoreClass<StoreValue>(storeCache || initialValue);
store.subscribe((updatedValue) =>
  localStorage.setItem(LS_CACHE_KEY, JSON.stringify(updatedValue))
);
export type Store = StoreClass<StoreValue>;
export const useStore = createUseStore<StoreValue>(store);
