import { useSiteData } from "../context/SiteDataContext";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { profile } = useSiteData();
  return (
    <section id="about" className="border-t border-neutral-200 px-6 py-24 dark:border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow="01 · About" title="About" />
          <div className="mt-6 max-w-2xl space-y-4 text-neutral-600 dark:text-neutral-400">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-500">{profile.location}</p>
        </Reveal>
      </div>
    </section>
  );
}
