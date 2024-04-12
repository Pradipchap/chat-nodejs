import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const fn = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(fn);
    };
  }, [value, delay]);
  console.log(debouncedValue);
  return debouncedValue;
};
