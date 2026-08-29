import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-neutral-50">About</h2>
        <p className="mt-6 max-w-2xl text-neutral-400 leading-relaxed">{profile.about}</p>
        <p className="mt-4 text-sm text-neutral-500">{profile.location}</p>
      </div>
    </section>
  );
}
