import React from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react"; // Modern icon set

export function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 transition-all duration-300"
    >
      {theme === "light" ? <Sun className="w-6 h-6 text-blue-500" /> : <Moon className="w-6 h-6 text-gray-300" />}
    </button>
  );
}
