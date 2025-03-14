import React from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react"; // Modern icon set

export function ModeToggle() {
  const { theme, toggleTheme } = useTheme();


  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-lightSecondary dark:bg-darkSecondary transition-all duration-300"
    >
      {theme === "light" ? (
        <Sun className="w-6 h-6 text-lightPrimary" />
      ) : (
        <Moon className="w-6 h-6 text-darkPrimary" />
      )}
    </button>
  );
  
}
