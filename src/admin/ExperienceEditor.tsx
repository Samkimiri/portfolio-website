import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { saveSiteContent } from "../lib/siteContent";
import type { ExperienceItem } from "../types";
import { cardClasses, inputClasses, labelClasses, SaveBar, IconButton } from "./shared";

function newItem(): ExperienceItem {
  return {
    id: `item-${Date.now()}`,
    period: "",
    title: "",
    org: "",
    description: "",
  };
}

export default function ExperienceEditor() {
  const { experience, refresh } = useSiteData();
  const [form, setForm] = useState<ExperienceItem[]>(experience);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(index: number, item: ExperienceItem) {
    const next = [...form];
    next[index] = item;
    setForm(next);
    setSaved(false);
  }

  function addItem() {
    setForm([...form, newItem()]);
  }

  function removeItem(index: number) {
    setForm(form.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const { error } = await saveSiteContent("experience", form);
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
      {form.map((item, index) => (
        <div key={item.id} className={cardClasses}>
          <div className="flex items-start justify-between gap-3">
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClasses}>Period label</label>
                <input
                  className={inputClasses}
                  value={item.period}
                  onChange={(e) => update(index, { ...item, period: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClasses}>Title</label>
                <input
                  className={inputClasses}
                  value={item.title}
                  onChange={(e) => update(index, { ...item, title: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClasses}>Organization</label>
                <input
                  className={inputClasses}
                  value={item.org}
                  onChange={(e) => update(index, { ...item, org: e.target.value })}
                />
              </div>
            </div>
            <IconButton label="Remove" onClick={() => removeItem(index)} />
          </div>

          <div className="mt-3">
            <label className={labelClasses}>Description</label>
            <textarea
              className={inputClasses}
              rows={2}
              value={item.description}
              onChange={(e) => update(index, { ...item, description: e.target.value })}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="rounded-full border border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-400"
      >
        + Add entry
      </button>

      <SaveBar onSave={handleSave} saving={saving} error={error} saved={saved} />
    </div>
  );
}
