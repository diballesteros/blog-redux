import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme";
const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function getInitialIsDark(): boolean {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark");
  }

  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;

    return Boolean(
      window.matchMedia && window.matchMedia(COLOR_SCHEME_QUERY).matches
    );
  }

  return false;
}

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => getInitialIsDark());

  const apply = useCallback((next: boolean) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next);
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    apply(isDarkMode);
  }, [apply, isDarkMode]);

  const api = useMemo(
    () => ({
      isDarkMode,
      toggle: () => setIsDarkMode((prev) => !prev),
      enable: () => setIsDarkMode(true),
      disable: () => setIsDarkMode(false),
    }),
    [isDarkMode]
  );

  return api;
}
