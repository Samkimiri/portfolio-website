import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { projects } from "../data/projects";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

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

        <motion.div
          className="mt-12 grid gap-8 sm:grid-cols-2"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project) => (
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
