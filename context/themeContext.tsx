"use client";
import {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: (value: string) => {},
});

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("");

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (!storedTheme) return;
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
