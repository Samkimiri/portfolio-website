import { motion } from "framer-motion";
import { useSiteData } from "../context/SiteDataContext";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface SkillsProps {
  eyebrow?: string;
}

export default function Skills({ eyebrow = "03 · Skills" }: SkillsProps) {
  const { skillGroups } = useSiteData();
  return (
    <section id="skills" className="border-t border-slate-200 px-6 py-24 dark:border-slate-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title="Skills"
            description="What I build with, and what I'm building toward."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 0.08}>
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40 hover:shadow-lg hover:shadow-amber-600/5 dark:border-slate-800 dark:bg-slate-900/50">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -2 }}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm text-slate-700 transition-colors hover:border-amber-600/50 hover:text-amber-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-amber-400"
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
