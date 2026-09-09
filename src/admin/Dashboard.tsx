import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../lib/auth";
import { useSiteData } from "../context/SiteDataContext";
import { countUnreadSubmissions } from "../lib/contactSubmissions";
import ProfileEditor from "./ProfileEditor";
import SkillsEditor from "./SkillsEditor";
import ExperienceEditor from "./ExperienceEditor";
import ProjectsEditor from "./ProjectsEditor";
import MessagesEditor from "./MessagesEditor";
import AnalyticsTab from "./AnalyticsTab";

type Tab = "profile" | "skills" | "experience" | "projects" | "messages" | "analytics";

const tabs: { id: Tab; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "messages", label: "Messages" },
  { id: "analytics", label: "Analytics" },
];

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("projects");
  const { loading, syncErrors, refresh } = useSiteData();
  const errorEntries = Object.entries(syncErrors);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    countUnreadSubmissions().then(setUnread);
  }, [tab]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-lg font-bold text-neutral-950 dark:text-neutral-50">Site admin</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Edit content — no code, no redeploy.</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" target="_blank" className="text-neutral-500 hover:underline dark:text-neutral-400">
              View site
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-full border border-neutral-300 px-4 py-1.5 text-neutral-700 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        {errorEntries.length > 0 && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-800 dark:text-red-300">
            <div>
              <p className="font-medium">Live content failed to sync — showing fallback data.</p>
              <ul className="mt-1 list-inside list-disc">
                {errorEntries.map(([key, message]) => (
                  <li key={key}>
                    {key}: {message}
                  </li>
                ))}
              </ul>
              <p className="mt-1 text-red-700/80 dark:text-red-400/80">
                Edits made now may not reflect what visitors see until this is resolved. Check your Supabase project
                is reachable and the env vars are correct, then retry.
              </p>
            </div>
            <button
              type="button"
              onClick={refresh}
              className="shrink-0 rounded-full border border-red-500/40 px-3 py-1 text-xs font-medium hover:bg-red-500/10"
            >
              Retry
            </button>
          </div>
        )}

        <nav className="mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-emerald-500 text-neutral-950"
                  : "border border-neutral-300 text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400"
              }`}
            >
              {t.label}
              {t.id === "messages" && unread > 0 && (
                <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {unread}
                </span>
              )}
            </button>
          ))}
        </nav>

        {tab === "messages" ? (
          <MessagesEditor />
        ) : tab === "analytics" ? (
          <AnalyticsTab />
        ) : loading ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading content…</p>
        ) : (
          <>
            {tab === "profile" && <ProfileEditor />}
            {tab === "skills" && <SkillsEditor />}
            {tab === "experience" && <ExperienceEditor />}
            {tab === "projects" && <ProjectsEditor />}
          </>
        )}
      </div>
    </div>
  );
}
