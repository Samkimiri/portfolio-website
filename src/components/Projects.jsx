import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

const grid = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-2xl font-bold text-neutral-50">Projects</h2>
          <p className="mt-2 text-neutral-400">
            A selection of websites and web apps I've built.
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
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
