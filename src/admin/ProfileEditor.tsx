import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { saveSiteContent } from "../lib/siteContent";
import type { Profile } from "../types";
import { cardClasses, inputClasses, labelClasses, SaveBar } from "./shared";

export default function ProfileEditor() {
  const { profile, refresh } = useSiteData();
  const [form, setForm] = useState<Profile>(profile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  function updateAbout(index: number, value: string) {
    const about = [...form.about];
    about[index] = value;
    update("about", about);
  }

  function addAboutParagraph() {
    update("about", [...form.about, ""]);
  }

  function removeAboutParagraph(index: number) {
    update(
      "about",
      form.about.filter((_, i) => i !== index),
    );
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const { error } = await saveSiteContent("profile", form);
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
      <div className={cardClasses}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Full name</label>
            <input className={inputClasses} value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div>
            <label className={labelClasses}>Short name</label>
            <input
              className={inputClasses}
              value={form.shortName}
              onChange={(e) => update("shortName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Role</label>
            <input className={inputClasses} value={form.role} onChange={(e) => update("role", e.target.value)} />
          </div>
          <div>
            <label className={labelClasses}>Location</label>
            <input
              className={inputClasses}
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClasses}>Tagline</label>
          <textarea
            className={inputClasses}
            rows={2}
            value={form.tagline}
            onChange={(e) => update("tagline", e.target.value)}
          />
        </div>
      </div>

      <div className={cardClasses}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">About paragraphs</h3>
          <button type="button" onClick={addAboutParagraph} className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400">
            + Add paragraph
          </button>
        </div>
        <div className="space-y-3">
          {form.about.map((paragraph, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                className={inputClasses}
                rows={3}
                value={paragraph}
                onChange={(e) => updateAbout(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeAboutParagraph(index)}
                className="shrink-0 self-start rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-500 hover:border-red-400 hover:text-red-600 dark:border-neutral-700 dark:text-neutral-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={cardClasses}>
        <h3 className="mb-3 font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">Social & contact</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>GitHub URL</label>
            <input
              className={inputClasses}
              value={form.social.github}
              onChange={(e) => update("social", { ...form.social, github: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClasses}>LinkedIn URL</label>
            <input
              className={inputClasses}
              value={form.social.linkedin}
              onChange={(e) => update("social", { ...form.social, linkedin: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClasses}>Email</label>
            <input
              className={inputClasses}
              value={form.social.email}
              onChange={(e) => update("social", { ...form.social, email: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClasses}>Phone (optional)</label>
            <input
              className={inputClasses}
              value={form.social.phone ?? ""}
              onChange={(e) => update("social", { ...form.social, phone: e.target.value || undefined })}
            />
          </div>
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} error={error} saved={saved} />
    </div>
  );
}
