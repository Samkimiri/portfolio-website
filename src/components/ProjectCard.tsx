import { ExternalLink, ImageOff } from "lucide-react";
import type { Project } from "../types";
import { accentClasses } from "../lib/accent";
import { GithubIcon } from "./icons";
import BrowserFrame from "./BrowserFrame";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const accent = accentClasses[project.accent];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700">
      <button type="button" onClick={() => onOpen(project)} className="block aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
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
      </button>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-neutral-950 dark:text-neutral-50">
            {project.name}
          </h3>
          {project.tagline && (
            <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${accent.border} ${accent.bg} ${accent.text}`}>
              {project.tagline}
            </span>
          )}
        </div>

        <p className="mt-2 flex-1 text-sm text-neutral-600 dark:text-neutral-400">{project.description}</p>

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

        <div className="mt-6 flex items-center gap-4 text-sm font-medium">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
            >
              Live site <ExternalLink size={14} />
            </a>
          ) : (
            <span className="text-neutral-400 dark:text-neutral-600">[LIVE LINK]</span>
          )}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              <GithubIcon size={14} /> Source
            </a>
          ) : (
            <span className="text-neutral-400 dark:text-neutral-600">[GITHUB LINK]</span>
          )}

          <button
            type="button"
            onClick={() => onOpen(project)}
            className="ml-auto text-neutral-500 underline-offset-2 transition-colors hover:text-neutral-800 hover:underline dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
