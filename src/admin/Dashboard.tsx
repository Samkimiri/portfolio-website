import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../lib/auth";
import { useSiteData } from "../context/SiteDataContext";
import ProfileEditor from "./ProfileEditor";
import SkillsEditor from "./SkillsEditor";
import ExperienceEditor from "./ExperienceEditor";
import ProjectsEditor from "./ProjectsEditor";

type Tab = "profile" | "skills" | "experience" | "projects";

const tabs: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("projects");
  const { loading } = useSiteData();

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
            </button>
          ))}
        </nav>

        {loading ? (
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
