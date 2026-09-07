import { useState, type FormEvent } from "react";
import { Mail, Phone } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { supabase } from "../lib/supabase";
import { GithubIcon, LinkedinIcon } from "./icons";
import Reveal from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-600";

export default function Contact() {
  const { profile } = useSiteData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const configured = Boolean(supabase);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setStatus("submitting");
    setErrorMessage("");

    const { error } = await supabase.from("contact_submissions").insert({ name, email, message });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section id="contact" className="border-t border-neutral-200 px-6 py-24 dark:border-neutral-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-neutral-950 dark:text-neutral-50">Get in touch</h2>
          <p className="mt-2 max-w-xl text-neutral-600 dark:text-neutral-400">
            Have a project in mind or just want to say hi? My inbox is open.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <button
                type="submit"
                disabled={!configured || status === "submitting"}
                className="inline-flex items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

              <div aria-live="polite" className="min-h-[1.5rem] text-sm">
                {!configured && (
                  <p className="text-amber-600 dark:text-amber-400">
                    Submissions aren&apos;t connected yet (Supabase env vars aren&apos;t set) — email me directly instead for
                    now. Once <code className="font-mono text-xs">VITE_SUPABASE_URL</code> /{" "}
                    <code className="font-mono text-xs">VITE_SUPABASE_ANON_KEY</code> are set, this form writes
                    straight to the database.
                  </p>
                )}
                {status === "success" && (
                  <p className="text-emerald-600 dark:text-emerald-400">
                    Thanks — your message was saved. I&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && <p className="text-red-600 dark:text-red-400">Something went wrong: {errorMessage}</p>}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <a
                href={`mailto:${profile.social.email}`}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-emerald-500/50 dark:border-neutral-800"
              >
                <Mail size={18} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{profile.social.email}</span>
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-emerald-500/50 dark:border-neutral-800"
              >
                <GithubIcon size={18} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">github.com/Samkimiri</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-emerald-500/50 dark:border-neutral-800"
              >
                <LinkedinIcon size={18} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">LinkedIn</span>
              </a>
              {profile.social.phone && (
                <a
                  href={`tel:${profile.social.phone}`}
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-emerald-500/50 dark:border-neutral-800"
                >
                  <Phone size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{profile.social.phone}</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
