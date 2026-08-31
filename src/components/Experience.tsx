import { experience } from "../data/experience";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-neutral-200 px-6 py-24 dark:border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-neutral-950 dark:text-neutral-50">Experience</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">From engineering to shipping software.</p>
        </Reveal>

        <ol className="mt-12 space-y-10 border-l border-neutral-200 pl-8 dark:border-neutral-800">
          {experience.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06} y={16}>
              <li className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  {item.period}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-neutral-950 dark:text-neutral-50">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-500">{item.org}</p>
                <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">{item.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
