import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { trackPageView } from "../lib/trackView";

const LAST_UPDATED = "September 2026";

export default function Terms() {
  const { profile } = useSiteData();

  useEffect(() => {
    trackPageView("/terms");
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <header className="border-b border-slate-200 px-6 py-4 dark:border-slate-900">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft size={16} />
            Back to {profile.brandName}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-bold text-slate-950 dark:text-slate-50">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-8 text-slate-600 dark:text-slate-400">
          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">Scope</h2>
            <p className="mt-2 leading-relaxed">
              These terms govern your use of this website. They don&apos;t cover the scope, deliverables, pricing, or
              ownership terms of any actual engineering work — those are agreed separately, in writing, before any
              paid engagement begins.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              About {profile.brandName}
            </h2>
            <p className="mt-2 leading-relaxed">
              {profile.brandName} is a software engineering company founded by {profile.name}, based in{" "}
              {profile.location}. This site exists to showcase our work and let you get in touch — it is not
              itself a paid product or subscription service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              Site content
            </h2>
            <p className="mt-2 leading-relaxed">
              The text, design, and project descriptions on this site belong to {profile.brandName} unless
              otherwise noted. Screenshots and names of client/partner projects shown here are used to describe
              real work completed — they don&apos;t imply that those organizations endorse or are affiliated with{" "}
              {profile.brandName} beyond that work.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              No warranty on the site itself
            </h2>
            <p className="mt-2 leading-relaxed">
              This website is provided as-is. We aim to keep it accurate and available, but don&apos;t guarantee
              uninterrupted uptime or that every detail stays current at every moment — if you spot something
              stale or broken, we&apos;d genuinely appreciate you flagging it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              Third-party links
            </h2>
            <p className="mt-2 leading-relaxed">
              Links to project demos, GitHub, LinkedIn, and WhatsApp take you to third-party services with their
              own terms and privacy practices, which we don&apos;t control.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              Limitation of liability
            </h2>
            <p className="mt-2 leading-relaxed">
              To the extent permitted by law, {profile.brandName} isn&apos;t liable for indirect or incidental damages
              arising from your use of this website. This doesn&apos;t limit liability under any separate, signed
              engagement agreement for actual delivered work.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              Governing law
            </h2>
            <p className="mt-2 leading-relaxed">These terms are governed by the laws of Kenya.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about these terms — reach us at{" "}
              <a href={`mailto:${profile.social.email}`} className="text-amber-700 hover:underline dark:text-amber-400">
                {profile.social.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
