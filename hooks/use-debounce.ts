import { useState, useEffect } from "react";

// Custom hook to debounce a value
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // Cleanup timeout
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
