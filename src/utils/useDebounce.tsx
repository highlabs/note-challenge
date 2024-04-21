import { useEffect, useState, useCallback } from "react";

function useDebounce<T>(value: T, delay?: number): [T, () => void] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => setDebouncedValue(value), delay || 500);
    setTimer(newTimer);

    return () => {
      if (newTimer) clearTimeout(newTimer);
    };
  }, [value, delay]);

  const cancel = useCallback(() => {
    if (timer) clearTimeout(timer);
    setTimer(null);
  }, [timer]);

  return [debouncedValue, cancel];
}

export default useDebounce;
