import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { saveSiteContent } from "../lib/siteContent";
import type { SkillGroup } from "../types";
import { cardClasses, inputClasses, labelClasses, SaveBar, IconButton } from "./shared";

export default function SkillsEditor() {
  const { skillGroups, refresh } = useSiteData();
  const [form, setForm] = useState<SkillGroup[]>(skillGroups);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function updateGroup(index: number, group: SkillGroup) {
    const next = [...form];
    next[index] = group;
    setForm(next);
    setSaved(false);
  }

  function addGroup() {
    setForm([...form, { category: "New category", skills: [] }]);
  }

  function removeGroup(index: number) {
    setForm(form.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const { error } = await saveSiteContent("skills", form);
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
      {form.map((group, index) => (
        <div key={index} className={cardClasses}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <label className={labelClasses}>Category name</label>
              <input
                className={inputClasses}
                value={group.category}
                onChange={(e) => updateGroup(index, { ...group, category: e.target.value })}
              />
            </div>
            <IconButton label="Remove category" onClick={() => removeGroup(index)} />
          </div>

          <div className="mt-3">
            <label className={labelClasses}>Skills (comma-separated)</label>
            <input
              className={inputClasses}
              value={group.skills.join(", ")}
              onChange={(e) =>
                updateGroup(index, {
                  ...group,
                  skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                })
              }
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addGroup}
        className="rounded-full border border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-400"
      >
        + Add category
      </button>

      <SaveBar onSave={handleSave} saving={saving} error={error} saved={saved} />
    </div>
  );
}
