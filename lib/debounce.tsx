import { useRef, useState } from "react";

export function useDebounce() {
  const [loading, setLoading] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  function debounce(fn: (arg: string) => void, delay: number) {
    return function (arg: string) {
      if (timeout.current) clearTimeout(timeout.current);
      if (arg.length >= 2) setLoading(true);
      timeout.current = setTimeout(() => {
        fn(arg);
        timeout.current = null;
        setLoading(false);
      }, delay);
    };
  }

  return { debounce, loading };
}
