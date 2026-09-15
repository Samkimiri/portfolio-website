import { useState, type ChangeEvent } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { saveSiteContent } from "../lib/siteContent";
import { uploadPartnerLogo } from "../lib/storage";
import type { Partner } from "../types";
import { cardClasses, inputClasses, labelClasses, SaveBar, IconButton } from "./shared";

function newPartner(): Partner {
  return { id: `partner-${Date.now()}`, name: "", logo: null, url: null };
}

export default function PartnersEditor() {
  const { partners, refresh } = useSiteData();
  const [form, setForm] = useState<Partner[]>(partners);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [uploadState, setUploadState] = useState<Record<string, { uploading: boolean; error: string | null }>>({});

  function update(index: number, partner: Partner) {
    const next = [...form];
    next[index] = partner;
    setForm(next);
    setSaved(false);
  }

  function addPartner() {
    setForm([...form, newPartner()]);
  }

  function removePartner(index: number) {
    setForm(form.filter((_, i) => i !== index));
  }

  async function handleFileChange(index: number, partner: Partner, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploadState((prev) => ({ ...prev, [partner.id]: { uploading: true, error: null } }));

    const { url, error } = await uploadPartnerLogo(partner.id, file);

    setUploadState((prev) => ({ ...prev, [partner.id]: { uploading: false, error } }));

    if (url) update(index, { ...partner, logo: url });
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const { error } = await saveSiteContent("partners", form);
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
      <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-neutral-700 dark:text-neutral-300">
        Shown as a &quot;Partners&quot; section on the home page. The section stays hidden entirely while this list
        is empty.
      </p>

      {form.map((partner, index) => (
        <div key={partner.id} className={cardClasses}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              {partner.name || "Untitled partner"}
            </h3>
            <IconButton label="Remove" onClick={() => removePartner(index)} />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>Name</label>
              <input
                className={inputClasses}
                value={partner.name}
                onChange={(e) => update(index, { ...partner, name: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClasses}>Website URL (optional)</label>
              <input
                className={inputClasses}
                placeholder="https://..."
                value={partner.url ?? ""}
                onChange={(e) => update(index, { ...partner, url: e.target.value || null })}
              />
            </div>
          </div>

          <div className="mt-3">
            <label className={labelClasses}>Logo</label>
            <div className="flex items-center gap-2">
              {partner.logo && (
                <img src={partner.logo} alt="" className="h-9 w-9 shrink-0 rounded bg-white object-contain" />
              )}
              <input
                className={inputClasses}
                placeholder="Paste a URL, or upload →"
                value={partner.logo ?? ""}
                onChange={(e) => update(index, { ...partner, logo: e.target.value || null })}
              />
              <label className="shrink-0 cursor-pointer rounded-full border border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-600 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-400">
                {uploadState[partner.id]?.uploading ? "Uploading…" : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploadState[partner.id]?.uploading}
                  onChange={(e) => handleFileChange(index, partner, e)}
                />
              </label>
            </div>
            {uploadState[partner.id]?.error && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">{uploadState[partner.id]?.error}</p>
            )}
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
              No logo yet? Leave blank — the site shows the partner&apos;s initials as a placeholder until one is
              added.
            </p>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addPartner}
        className="rounded-full border border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-400"
      >
        + Add partner
      </button>

      <SaveBar onSave={handleSave} saving={saving} error={error} saved={saved} />
    </div>
  );
}
