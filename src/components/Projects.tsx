import { useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useSiteData } from "../context/SiteDataContext";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";

// Only tags shared by more than one project become filters — otherwise a
// site with lots of one-off tech tags ends up with a wall of filters that
// each show a single project, which defeats the point of filtering.
const MIN_PROJECTS_PER_FILTER = 2;

export default function Projects() {
  const { projects } = useSiteData();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tag of project.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .filter(([, count]) => count >= MIN_PROJECTS_PER_FILTER)
      .map(([tag]) => tag)
      .sort();
  }, [projects]);

  const visibleProjects = filter ? projects.filter((p) => p.tags.includes(filter)) : projects;

  const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24, filter: reduceMotion ? "none" : "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0.2 : 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section id="projects" className="border-t border-neutral-200 px-6 py-24 dark:border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-neutral-950 dark:text-neutral-50">Projects</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Products I&apos;ve built and shipped for real users, not demos.
          </p>
        </Reveal>

        {filters.length > 0 && (
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter(null)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === null
                    ? "bg-emerald-500 text-neutral-950"
                    : "border border-neutral-300 text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400"
                }`}
              >
                All
              </button>
              {filters.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilter(tag)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    filter === tag
                      ? "bg-emerald-500 text-neutral-950"
                      : "border border-neutral-300 text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        <motion.div
          key={filter ?? "all"}
          className="mt-8 grid gap-8 sm:grid-cols-2"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {visibleProjects.map((project) => (
            <motion.div key={project.id} variants={card} whileHover={{ y: -6 }}>
              <ProjectCard project={project} onOpen={setActiveProject} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
