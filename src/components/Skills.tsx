import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-neutral-200 px-6 py-24 dark:border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-neutral-950 dark:text-neutral-50">Skills</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">What I build with, and what I&apos;m building toward.</p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 0.08}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ y: -2 }}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-neutral-700 transition-colors hover:border-emerald-500/50 hover:text-emerald-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:text-emerald-400"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
