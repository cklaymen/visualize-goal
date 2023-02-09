import { useSyncExternalStore } from "react";

import Store from "./Store";

type Selector<T, StoreValue> = (value: StoreValue) => T;

function createUseStore<StoreValue>(store: Store<StoreValue>) {
  return function useStore<T = StoreValue>(
    selector: Selector<T, StoreValue> | Selector<StoreValue, StoreValue> = (
      store
    ) => store
  ) {
    return useSyncExternalStore(
      store.subscribe.bind(store),
      () => selector(store.getValue()) as T
    );
  };
}

export default createUseStore;
