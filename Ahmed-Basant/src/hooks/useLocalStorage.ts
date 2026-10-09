import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        return mergeDeep(initialValue, parsed) as T;
      }
    } catch {
      /* ignore */
    }
    return initialValue;
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue =
          value instanceof Function ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(newValue));
        } catch {
          /* ignore quota errors */
        }
        return newValue;
      });
    },
    [key]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // placeholder for potential global escape handling
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return [storedValue, setValue];
}

function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function mergeDeep<T>(target: T, source: Partial<T>): T {
  if (!isObject(target) || !isObject(source)) {
    return (source ?? target) as T;
  }
  const result: Record<string, unknown> = { ...target };
  const targetRecord = target as Record<string, unknown>;
  const sourceRecord = source as Record<string, unknown>;
  for (const key of Object.keys(source)) {
    if (isObject(targetRecord[key]) && isObject(sourceRecord[key])) {
      result[key] = mergeDeep(targetRecord[key], sourceRecord[key]);
    } else if (sourceRecord[key] !== undefined) {
      result[key] = sourceRecord[key];
    }
  }
  return result as T;
}
