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

  function updateParagraph(field: "about" | "companyAbout", index: number, value: string) {
    const paragraphs = [...form[field]];
    paragraphs[index] = value;
    update(field, paragraphs);
  }

  function addParagraph(field: "about" | "companyAbout") {
    update(field, [...form[field], ""]);
  }

  function removeParagraph(field: "about" | "companyAbout", index: number) {
    update(
      field,
      form[field].filter((_, i) => i !== index),
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
        <h3 className="mb-3 font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">
          Brand identity (shown on the public site)
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Brand / studio name</label>
            <input
              className={inputClasses}
              value={form.brandName}
              onChange={(e) => update("brandName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClasses}>Brand tagline (Hero eyebrow)</label>
            <input
              className={inputClasses}
              value={form.brandTagline}
              onChange={(e) => update("brandTagline", e.target.value)}
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-500">
          This is the name shown in the Hero, Navbar, and page title — separate from your personal name below, which
          always stays accurate on the /resume page regardless of how the site is branded.
        </p>
      </div>

      <div className={cardClasses}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Full name (used on your resume)</label>
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
          <div>
            <h3 className="font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              Company About (home page)
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Stackfen-voiced — no personal narrative. Shown on the home page&apos;s About section.
            </p>
          </div>
          <button
            type="button"
            onClick={() => addParagraph("companyAbout")}
            className="shrink-0 text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            + Add paragraph
          </button>
        </div>
        <div className="space-y-3">
          {form.companyAbout.map((paragraph, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                className={inputClasses}
                rows={3}
                value={paragraph}
                onChange={(e) => updateParagraph("companyAbout", index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeParagraph("companyAbout", index)}
                className="shrink-0 self-start rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-500 hover:border-red-400 hover:text-red-600 dark:border-neutral-700 dark:text-neutral-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={cardClasses}>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              Personal About (Portfolio &amp; Resume)
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Your own voice and story. Shown on /portfolio and /resume, never on the home page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => addParagraph("about")}
            className="shrink-0 text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
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
                onChange={(e) => updateParagraph("about", index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeParagraph("about", index)}
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
