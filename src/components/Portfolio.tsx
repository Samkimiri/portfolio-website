import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { trackPageView } from "../lib/trackView";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Footer from "./Footer";

// A standalone, personal-voice portfolio — separate from the Stackfen
// company home page, meant to be shared directly (e.g. with a specific
// client or employer) without the surrounding company framing.
export default function Portfolio() {
  const { profile } = useSiteData();

  useEffect(() => {
    trackPageView("/portfolio");
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <header className="border-b border-slate-200 px-6 py-4 dark:border-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft size={16} />
            Back to Stackfen
          </Link>
          <Link
            to="/resume"
            className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-amber-600/50 hover:text-amber-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-400/50 dark:hover:text-amber-400"
          >
            View Resume
          </Link>
        </div>
      </header>

      <section className="px-6 pt-16 pb-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
            Portfolio
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-50">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{profile.role}</p>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">{profile.tagline}</p>

          <div className="mt-6 flex items-center gap-5 text-slate-500 dark:text-slate-500">
            {profile.social.whatsapp && (
              <a
                href={`https://wa.me/${profile.social.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
              >
                <WhatsappIcon size={20} />
              </a>
            )}
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href={`mailto:${profile.social.email}`}
              aria-label="Email"
              className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </section>

      <About />
      <Skills />
      <Projects />
      <Experience />
      <Footer />
    </div>
  );
}
