import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setValue(initialValue);
    } catch {
      console.error(`Unable to remove ${key} from localStorage`);
    }
  }, [key, initialValue]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    try {
      console.log("Key = ", key);
      console.log("Value = ", value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Unable to store ${key} in localStorage`);
    }
  }, [key, value]);

  return {
    value,
    setValue,
    remove,
    reset,
  } as const;
};
