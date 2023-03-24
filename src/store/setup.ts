import { Store as StoreClass, createUseStore } from "./core";
import { Award, IncomeSettings, ScheduleSettings } from "./models";

export interface StoreValue {
  awards: Array<Award>;
  scheduleSettings?: ScheduleSettings;
  incomeSettings?: IncomeSettings;
}

const LS_CACHE_KEY = "store_cache";
const initialValue: StoreValue = { awards: [] };

const storeCache = getStoreCache();

export const store = new StoreClass<StoreValue>(storeCache || initialValue);
store.subscribe((updatedValue) => setStoreCache(updatedValue));
export type Store = StoreClass<StoreValue>;
export const useStore = createUseStore<StoreValue>(store);

function setStoreCache(value: StoreValue) {
  localStorage.setItem(LS_CACHE_KEY, JSON.stringify(value));
}

function getStoreCache() {
  const rawStoreCache = localStorage.getItem(LS_CACHE_KEY);
  const storeCache = rawStoreCache && JSON.parse(rawStoreCache);
  const value = updateStoreCacheIfNeeded(storeCache);
  return value;
}

function updateStoreCacheIfNeeded(value: any): any {
  let needUpdate = false;
  if ("scheduleSettings" in value) {
    if (!("customDays" in value.scheduleSettings)) {
      needUpdate = true;
      value = {
        ...value,
        scheduleSettings: {
          ...value.scheduleSettings,
          customDays: [],
        },
      };
    }
  }
  if (needUpdate) {
    setStoreCache(value);
  }
  return value;
}
