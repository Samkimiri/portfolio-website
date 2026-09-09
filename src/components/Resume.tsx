import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Download, ArrowLeft } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { GithubIcon, LinkedinIcon } from "./icons";
import { trackPageView } from "../lib/trackView";

// Rendered live from the same site_content that /admin edits — this page
// (and anything printed/saved from it) is always in sync with the actual
// site, never a separately-maintained file that can drift out of date.
const MAX_FEATURED_PROJECTS = 5;

export default function Resume() {
  const { profile, skillGroups, experience, projects } = useSiteData();
  const featuredProjects = projects.slice(0, MAX_FEATURED_PROJECTS);

  useEffect(() => {
    trackPageView("/resume");
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 py-10 print:bg-white print:py-0">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 pb-6 print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400"
        >
          <Download size={16} />
          Download as PDF
        </button>
      </div>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl print:rounded-none print:shadow-none">
        {/* Header */}
        <div className="bg-neutral-950 px-8 py-10 text-white sm:px-12">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{profile.name}</h1>
          <p className="mt-1 text-lg font-medium text-emerald-400">{profile.role}</p>
          <p className="mt-4 max-w-2xl text-sm text-neutral-300">{profile.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {profile.location}
            </span>
            <a href={`mailto:${profile.social.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail size={14} /> {profile.social.email}
            </a>
            {profile.social.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone size={14} /> {profile.social.phone}
              </span>
            )}
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <GithubIcon size={14} /> {profile.social.github.replace("https://", "")}
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              <LinkedinIcon size={14} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-10 px-8 py-10 sm:px-12 sm:grid-cols-3">
          <div className="space-y-10 sm:col-span-2">
            <section>
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Profile</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-neutral-700">
                {profile.about.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Experience
              </h2>
              <div className="mt-4 space-y-6">
                {experience.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-display text-sm font-semibold text-neutral-950">{item.title}</h3>
                      <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">{item.org}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Selected Projects
              </h2>
              <div className="mt-4 space-y-5">
                {featuredProjects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-display text-sm font-semibold text-neutral-950">
                      {project.name}
                      {project.tagline && <span className="font-normal text-neutral-500"> — {project.tagline}</span>}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-700">{project.description}</p>
                    <p className="mt-1.5 text-xs text-neutral-500">{project.tags.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Skills</h2>
              <div className="mt-3 space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      {group.category}
                    </p>
                    <p className="mt-1 text-sm text-neutral-700">{group.skills.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Education
              </h2>
              <p className="mt-3 text-sm font-semibold text-neutral-950">
                BSc, Mining &amp; Mineral Processing Engineering
              </p>
              <p className="mt-1 text-sm text-neutral-700">
                Jomo Kenyatta University of Agriculture and Technology (JKUAT)
              </p>
            </section>

            <section>
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Links</h2>
              <div className="mt-3 space-y-2 text-sm">
                <a href="/" className="block text-emerald-700 hover:underline">
                  Portfolio
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-emerald-700 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-emerald-700 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
