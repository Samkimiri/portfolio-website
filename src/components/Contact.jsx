import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-neutral-50">Get in touch</h2>
        <p className="mt-4 max-w-xl text-neutral-400">
          Have a project in mind or just want to say hi? My inbox is open.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-400 transition-colors"
        >
          {profile.email}
        </a>
      </div>
    </section>
  );
}
