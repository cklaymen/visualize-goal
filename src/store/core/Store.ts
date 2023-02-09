class Store<T> {
  private value;
  private listeners: Set<(newValue: T) => void> = new Set();

  constructor(initialValue: T) {
    this.value = initialValue;
    this.listeners = new Set();
  }

  setValue(newValue: T | ((currentValue: T) => T)) {
    if (newValue instanceof Function) {
      this.value = newValue(this.value);
    } else {
      this.value = newValue;
    }
    this.listeners.forEach((listener) => {
      listener(this.value);
    });
  }

  subscribe(listener: (newValue: T) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getValue() {
    return this.value;
  }
}

export function createStore<T>(initialValue: T) {
  let value = initialValue;
  const listeners: Set<(newValue: T) => void> = new Set();

  return {
    getValue: () => value,
    setValue: (newValue: T | ((currentValue: T) => T)) => {
      if (newValue instanceof Function) {
        value = newValue(value);
      } else {
        value = newValue;
      }
      listeners.forEach((listener) => {
        listener(value);
      });
    },
    subscribe: (listener: (newValue: T) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export default Store;
