import { useSiteData } from "../context/SiteDataContext";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface AboutProps {
  // "company" (default) is the Stackfen-voiced copy used on the home page.
  // "personal" is Sam's own bio, used on /portfolio and /resume.
  variant?: "company" | "personal";
  eyebrow?: string;
}

export default function About({ variant = "company", eyebrow = "02 · About" }: AboutProps) {
  const { profile } = useSiteData();
  const paragraphs = variant === "personal" ? profile.about : profile.companyAbout;

  return (
    <section id="about" className="border-t border-slate-200 px-6 py-24 dark:border-slate-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title="About" />
          <div className="mt-6 max-w-2xl space-y-4 text-slate-600 dark:text-slate-400">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">{profile.location}</p>
        </Reveal>
      </div>
    </section>
  );
}
