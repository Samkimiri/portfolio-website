import type { Project } from "../types";

// Written as fully static strings (not template-built) so Tailwind's
// class scanner can find them.
export const accentClasses: Record<Project["accent"], { text: string; border: string; bg: string }> = {
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
  },
  sky: {
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-500/40",
    bg: "bg-sky-500/10",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
  },
};
