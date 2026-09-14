import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { trackPageView } from "../lib/trackView";

const LAST_UPDATED = "September 2026";

export default function Privacy() {
  const { profile } = useSiteData();

  useEffect(() => {
    trackPageView("/privacy");
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
        <h1 className="font-display text-3xl font-bold text-slate-950 dark:text-slate-50">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-8 text-slate-600 dark:text-slate-400">
          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              What this covers
            </h2>
            <p className="mt-2 leading-relaxed">
              This policy describes what happens to your data when you visit this website ({profile.brandName}),
              not any work delivered under a separate client engagement, which is governed by that engagement&apos;s own
              agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              Information you provide
            </h2>
            <p className="mt-2 leading-relaxed">
              If you use the Contact form, we store the name, email address, and message you submit, solely to
              reply to you. We don&apos;t sell it, share it with third parties for marketing, or use it for anything
              else. Submitting the form also triggers a one-time email notification to the site owner via our
              email provider, Resend, containing your message.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              Information collected automatically
            </h2>
            <p className="mt-2 leading-relaxed">
              We keep a lightweight, privacy-conscious record of page visits — which page was viewed and a coarse
              browser family (e.g. &quot;Chrome&quot;, &quot;Safari&quot;) — used only to understand traffic at an aggregate level. We
              do not log IP addresses, do not fingerprint your device, and cannot identify who a given visit
              belongs to. We also use Vercel Web Analytics, which is designed to be cookieless and reports
              anonymized, aggregated traffic statistics.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              WhatsApp
            </h2>
            <p className="mt-2 leading-relaxed">
              The WhatsApp links on this site open a conversation directly in WhatsApp using your own account.
              Nothing about that conversation passes through or is stored by this website — it&apos;s governed by
              WhatsApp&apos;s own privacy policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">
              Where data is stored
            </h2>
            <p className="mt-2 leading-relaxed">
              Data is stored with Supabase (database and file storage) and this site is hosted on Vercel. Both are
              reputable infrastructure providers used to run the site itself — we don&apos;t use them to sell or
              broker your data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">Your rights</h2>
            <p className="mt-2 leading-relaxed">
              You can ask us to see, correct, or delete any information you&apos;ve submitted through this site by
              emailing{" "}
              <a href={`mailto:${profile.social.email}`} className="text-amber-700 hover:underline dark:text-amber-400">
                {profile.social.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-slate-50">Changes</h2>
            <p className="mt-2 leading-relaxed">
              If this policy changes, the &quot;Last updated&quot; date at the top of this page will change with it.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
