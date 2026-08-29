import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section id="top" className="pt-40 pb-24 px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-indigo-400 font-medium mb-4">{profile.role}</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-50 max-w-3xl">
          {profile.name}
        </h1>
        <p className="mt-6 text-lg text-neutral-400 max-w-xl">{profile.tagline}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex items-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-400 transition-colors"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 hover:border-neutral-500 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
