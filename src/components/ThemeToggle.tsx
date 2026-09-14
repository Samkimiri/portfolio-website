import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-100"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
