// hooks/useTheme.tsx
import { useState, useEffect } from "react";
import { useAppEvent } from "./useAppEvent";

/**
 * Returns the current theme and a function to toggle the theme.
 *
 * The initial theme is determined by the value of the "theme" key in
 * `localStorage`. If the key does not exist, the initial theme is
 * "dark".
 *
 * The `toggleTheme` function is used to switch between the "dark" and
 * "light" themes. It sets the new theme in `localStorage` and dispatches
 * the "onThemeChange" event with the new theme as the event detail.
 *
 * @returns An object with two properties: `theme` and `toggleTheme`.
 * `theme` is the current theme, a string that is either "dark" or "light".
 * `toggleTheme` is a function that toggles the theme.
 */
const useTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">(
    (localStorage.getItem("theme") as "dark" | "light") || "dark"
  );
  const { dispatch } = useAppEvent("onThemeChange");

  // Listen for theme changes
  useAppEvent("onThemeChange", (newTheme: "dark" | "light") => {
    setTheme(newTheme);
  });

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    dispatch(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
