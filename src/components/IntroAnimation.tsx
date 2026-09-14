import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSiteData } from "../context/SiteDataContext";

const MS_PER_CHAR = 24;
const PAUSE_AFTER_TYPING_MS = 700;
const BRAND_HOLD_MS = 1800;
const FOUNDER_HOLD_MS = 2400;

const LINES = [
  "$ whoami",
  "Stackfen — Software Engineering Company",
  "",
  "$ stackfen --init",
  "✓ Loading fintech expertise...",
  "✓ Loading AI / LLM integrations...",
  "✓ Compiling trust...",
  "✓ Deploying your next product...",
  "",
  "$ stackfen --status",
  "STATUS: READY.",
];

const FULL_SCRIPT = LINES.join("\n");

type Phase = "typing" | "brand" | "founder" | "done";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const { profile } = useSiteData();
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (reduceMotion) {
      onComplete();
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTyped(FULL_SCRIPT.slice(0, index));
      if (index >= FULL_SCRIPT.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("brand"), PAUSE_AFTER_TYPING_MS);
      }
    }, MS_PER_CHAR);

    return () => clearInterval(interval);
    // Runs once on mount — intentionally not re-keyed on reduceMotion changes mid-animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === "brand") {
      const timeout = setTimeout(() => setPhase("founder"), BRAND_HOLD_MS);
      return () => clearTimeout(timeout);
    }
    if (phase === "founder") {
      const timeout = setTimeout(() => setPhase("done"), FOUNDER_HOLD_MS);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            type="button"
            onClick={onComplete}
            className="absolute right-6 top-6 text-xs font-medium text-slate-500 transition-colors hover:text-slate-300"
          >
            Skip intro →
          </button>

          <AnimatePresence mode="wait">
            {phase === "typing" && (
              <motion.div
                key="terminal"
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
              >
                <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-800/60 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[10px] text-slate-500">stackfen — zsh</span>
                </div>
                <pre className="min-h-[220px] whitespace-pre-wrap break-words p-5 font-mono text-[13px] leading-relaxed text-emerald-400 sm:text-sm">
                  {typed}
                  <span className="animate-pulse">▍</span>
                </pre>
              </motion.div>
            )}

            {phase === "brand" && (
              <motion.div
                key="brand"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-center"
              >
                <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                  Introducing
                </p>
                <h1 className="bg-gradient-to-br from-slate-50 to-slate-400 bg-clip-text font-display text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
                  STACKFEN
                </h1>
                <p className="mt-4 text-base text-slate-400 sm:text-lg">
                  Your go-to software engineering company.
                </p>
              </motion.div>
            )}

            {phase === "founder" && (
              <motion.div
                key="founder"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex flex-col items-center text-center"
              >
                <img
                  src="/founder-photo.webp"
                  alt=""
                  className="h-28 w-28 rounded-full border-2 border-amber-500/40 object-cover shadow-lg sm:h-32 sm:w-32"
                />
                <p className="mt-5 font-display text-2xl font-bold text-slate-50 sm:text-3xl">{profile.name}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">Founder</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
