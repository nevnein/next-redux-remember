export enum StorageKind {
  local = 'localStorage',
  session = 'sessionStorage',
}

export interface PersistType {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}

const Persist = (storage: StorageKind): PersistType => {
  // next storage fallback (build support)
  const offlineStorage: Record<string, string> = {};

  const setItem = (key: string, value: string) => {
    if (typeof window !== 'undefined' && window instanceof Window) {
      window[storage].setItem(key, value);
    } else {
      offlineStorage[key] = value;
    }
  };

  const getItem = (key: string) => {
    if (typeof window !== 'undefined' && window instanceof Window) {
      return window[storage].getItem(key);
    }
    return offlineStorage[key];
  };

  const removeItem = (key: string) => {
    if (typeof window !== 'undefined' && window instanceof Window) {
      window[storage].removeItem(key);
    } else {
      delete offlineStorage[key];
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default Persist;
