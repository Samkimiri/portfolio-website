import { useSiteData } from "../context/SiteDataContext";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const { experience } = useSiteData();
  return (
    <section id="experience" className="border-t border-neutral-200 px-6 py-24 dark:border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="04 · Experience"
            title="Experience"
            description="From engineering to shipping software."
          />
        </Reveal>

        <ol className="mt-12 space-y-10 border-l border-neutral-200 pl-8 dark:border-neutral-800">
          {experience.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06} y={16}>
              <li className="relative">
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
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
