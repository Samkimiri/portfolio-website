import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, ImageOff, X } from "lucide-react";
import type { Project } from "../types";
import { accentClasses } from "../lib/accent";
import { GithubIcon } from "./icons";
import BrowserFrame from "./BrowserFrame";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            >
              <X size={16} />
            </button>

            <div className="mb-6 aspect-video overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <BrowserFrame url={project.liveUrl}>
                {project.screenshot ? (
                  <img
                    src={project.screenshot}
                    alt={`${project.name} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center gap-2 text-sm text-neutral-400 dark:text-neutral-600">
                    <ImageOff size={16} />
                    [SCREENSHOT]
                  </span>
                )}
              </BrowserFrame>
            </div>

            <div className="flex items-start justify-between gap-3 pr-8">
              <h3 id="project-modal-title" className="font-display text-2xl font-bold text-neutral-950 dark:text-neutral-50">
                {project.name}
              </h3>
              {project.tagline && (
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${accentClasses[project.accent].border} ${accentClasses[project.accent].bg} ${accentClasses[project.accent].text}`}
                >
                  {project.tagline}
                </span>
              )}
            </div>

            <p className="mt-4 text-neutral-600 dark:text-neutral-400">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 border-t border-neutral-200 pt-6 text-sm font-medium dark:border-neutral-800">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-neutral-950 transition-colors hover:bg-emerald-400"
                >
                  Live site <ExternalLink size={14} />
                </a>
              ) : (
                <span className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
                  [LIVE LINK]
                </span>
              )}

              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-700"
                >
                  <GithubIcon size={14} /> Source
                </a>
              ) : (
                <span className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
                  [GITHUB LINK]
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
