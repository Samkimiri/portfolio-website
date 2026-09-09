import { useEffect, useState } from "react";
import { getAnalyticsSummary, type AnalyticsSummary } from "../lib/analytics";
import { cardClasses } from "./shared";

export default function AnalyticsTab() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await getAnalyticsSummary();
    setSummary(data);
    setError(error);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading analytics…</p>;

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-800 dark:text-red-300">
        Couldn&apos;t load analytics: {error}
        {error.toLowerCase().includes("does not exist") && (
          <p className="mt-1">
            The <code className="font-mono">page_views</code> table doesn&apos;t exist yet — run{" "}
            <code className="font-mono">supabase/schema.sql</code> in your Supabase SQL editor.
          </p>
        )}
      </div>
    );
  }

  if (!summary) return null;

  const totalViews = summary.browserCounts.reduce((sum, b) => sum + b.count, 0);

  return (
    <div className="space-y-6">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Coarse, privacy-conscious counts only — no IP addresses, no way to identify who a visitor actually is, just
        page and browser.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={cardClasses}>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Home page visits
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-neutral-950 dark:text-neutral-50">
            {summary.homeViews.toLocaleString()}
          </p>
        </div>
        <div className={cardClasses}>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Resume views
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-neutral-950 dark:text-neutral-50">
            {summary.resumeViews.toLocaleString()}
          </p>
        </div>
      </div>

      <div className={cardClasses}>
        <h3 className="font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">
          Browsers visitors are using
        </h3>
        <div className="mt-4 space-y-3">
          {summary.browserCounts.length === 0 && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No visits recorded yet.</p>
          )}
          {summary.browserCounts.map(({ browser, count }) => {
            const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;
            return (
              <div key={browser}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-neutral-700 dark:text-neutral-300">{browser}</span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {count.toLocaleString()} ({pct}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={load}
        className="rounded-full border border-neutral-300 px-4 py-1.5 text-sm text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400"
      >
        Refresh
      </button>
    </div>
  );
}
