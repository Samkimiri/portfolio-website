import { motion } from "framer-motion";
import { useSiteData } from "../context/SiteDataContext";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const { skillGroups } = useSiteData();
  return (
    <section id="skills" className="border-t border-neutral-200 px-6 py-24 dark:border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="02 · Skills"
            title="Skills"
            description="What I build with, and what I'm building toward."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 0.08}>
              <div className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-neutral-800 dark:bg-neutral-900/50">
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
