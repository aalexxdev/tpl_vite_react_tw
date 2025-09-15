// src/components/theme-provider.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const initialState = {
  theme: "system",
  setTheme: () => null,
  toggle: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}) {
  const [themeState, setThemeState] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (themeState === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(themeState);
  }, [themeState]);

  const value = useMemo(
    () => ({
      theme: themeState,
      setTheme: (t) => {
        localStorage.setItem(storageKey, t);
        setThemeState(t);
      },
      toggle: () => {
        setThemeState((t) => {
          const next = t === "dark" ? "light" : "dark";
          localStorage.setItem(storageKey, next);
          return next;
        });
      },
    }),
    [themeState, storageKey],
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeProviderContext);
  if (ctx === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};
