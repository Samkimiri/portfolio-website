import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-neutral-50">Projects</h2>
        <p className="mt-2 text-neutral-400">
          A selection of websites and web apps I've built.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
