import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("marketplace-theme-mode");
    return savedTheme || "dark";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem("marketplace-theme-mode", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    applyThemeMode(theme);
  }, [theme]);

  const applyThemeMode = (mode) => {
    const root = document.documentElement;
    
    if (mode === 'dark') {
      root.style.setProperty("--background", "#050507");
      root.style.setProperty("--foreground", "#ffffff");
    } else {
      root.style.setProperty("--background", "#f8fafc");
      root.style.setProperty("--foreground", "#0f172a");
    }
  };

  const toggleTheme = () => {
    setIsTransitioning(true);
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const value = {
    theme,
    toggleTheme,
    isTransitioning,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
