import { profile } from "../data/profile";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="border-t border-neutral-200 px-6 py-24 dark:border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-neutral-950 dark:text-neutral-50">About</h2>
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
