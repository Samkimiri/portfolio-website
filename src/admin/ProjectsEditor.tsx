import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { saveSiteContent } from "../lib/siteContent";
import type { Project } from "../types";
import { cardClasses, inputClasses, labelClasses, SaveBar, IconButton } from "./shared";

const accents: Project["accent"][] = ["emerald", "sky", "amber", "violet"];

function newProject(): Project {
  return {
    id: `project-${Date.now()}`,
    name: "",
    tagline: "",
    description: "",
    tags: [],
    liveUrl: null,
    repoUrl: null,
    screenshot: null,
    accent: "emerald",
  };
}

export default function ProjectsEditor() {
  const { projects, refresh } = useSiteData();
  const [form, setForm] = useState<Project[]>(projects);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(index: number, project: Project) {
    const next = [...form];
    next[index] = project;
    setForm(next);
    setSaved(false);
  }

  function addProject() {
    setForm([...form, newProject()]);
  }

  function removeProject(index: number) {
    setForm(form.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= form.length) return;
    const next = [...form];
    [next[index], next[target]] = [next[target], next[index]];
    setForm(next);
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const { error } = await saveSiteContent("projects", form);
    setSaving(false);
    if (error) {
      setError(error);
      return;
    }
    setSaved(true);
    refresh();
  }

  return (
    <div className="space-y-6">
      {form.map((project, index) => (
        <div key={project.id} className={cardClasses}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              {project.name || "Untitled project"}
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="rounded-full border border-neutral-300 px-2 py-1 text-xs text-neutral-500 disabled:opacity-30 dark:border-neutral-700 dark:text-neutral-400"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === form.length - 1}
                className="rounded-full border border-neutral-300 px-2 py-1 text-xs text-neutral-500 disabled:opacity-30 dark:border-neutral-700 dark:text-neutral-400"
              >
                ↓
              </button>
              <IconButton label="Remove" onClick={() => removeProject(index)} />
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>Name</label>
              <input className={inputClasses} value={project.name} onChange={(e) => update(index, { ...project, name: e.target.value })} />
            </div>
            <div>
              <label className={labelClasses}>Tagline (badge, optional)</label>
              <input
                className={inputClasses}
                value={project.tagline ?? ""}
                onChange={(e) => update(index, { ...project, tagline: e.target.value || undefined })}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className={labelClasses}>Description</label>
            <textarea
              className={inputClasses}
              rows={3}
              value={project.description}
              onChange={(e) => update(index, { ...project, description: e.target.value })}
            />
          </div>

          <div className="mt-3">
            <label className={labelClasses}>Tags (comma-separated)</label>
            <input
              className={inputClasses}
              value={project.tags.join(", ")}
              onChange={(e) =>
                update(index, { ...project, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
              }
            />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>Live URL</label>
              <input
                className={inputClasses}
                value={project.liveUrl ?? ""}
                onChange={(e) => update(index, { ...project, liveUrl: e.target.value || null })}
              />
            </div>
            <div>
              <label className={labelClasses}>Repo URL</label>
              <input
                className={inputClasses}
                value={project.repoUrl ?? ""}
                onChange={(e) => update(index, { ...project, repoUrl: e.target.value || null })}
              />
            </div>
            <div>
              <label className={labelClasses}>Screenshot URL</label>
              <input
                className={inputClasses}
                value={project.screenshot ?? ""}
                onChange={(e) => update(index, { ...project, screenshot: e.target.value || null })}
              />
            </div>
            <div>
              <label className={labelClasses}>Accent color</label>
              <select
                className={inputClasses}
                value={project.accent}
                onChange={(e) => update(index, { ...project, accent: e.target.value as Project["accent"] })}
              >
                {accents.map((accent) => (
                  <option key={accent} value={accent}>
                    {accent}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="rounded-full border border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-400"
      >
        + Add project
      </button>

      <SaveBar onSave={handleSave} saving={saving} error={error} saved={saved} />
    </div>
  );
}
