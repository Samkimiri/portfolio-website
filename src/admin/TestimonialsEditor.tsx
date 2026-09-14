import { useState } from "react";
import { useSiteData } from "../context/SiteDataContext";
import { saveSiteContent } from "../lib/siteContent";
import type { Testimonial } from "../types";
import { cardClasses, inputClasses, labelClasses, SaveBar, IconButton } from "./shared";

function newTestimonial(): Testimonial {
  return {
    id: `testimonial-${Date.now()}`,
    quote: "",
    author: "",
    role: "",
    organization: "",
  };
}

export default function TestimonialsEditor() {
  const { testimonials, refresh } = useSiteData();
  const [form, setForm] = useState<Testimonial[]>(testimonials);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(index: number, item: Testimonial) {
    const next = [...form];
    next[index] = item;
    setForm(next);
    setSaved(false);
  }

  function addTestimonial() {
    setForm([...form, newTestimonial()]);
  }

  function removeTestimonial(index: number) {
    setForm(form.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const { error } = await saveSiteContent("testimonials", form);
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
        Only add quotes you actually have permission to publish. The Testimonials section on the home page stays
        hidden entirely while this list is empty — it never shows placeholder content.
      </p>

      {form.map((item, index) => (
        <div key={item.id} className={cardClasses}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <label className={labelClasses}>Quote</label>
              <textarea
                className={inputClasses}
                rows={3}
                value={item.quote}
                onChange={(e) => update(index, { ...item, quote: e.target.value })}
              />
            </div>
            <IconButton label="Remove" onClick={() => removeTestimonial(index)} />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <label className={labelClasses}>Author name</label>
              <input
                className={inputClasses}
                value={item.author}
                onChange={(e) => update(index, { ...item, author: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClasses}>Role (optional)</label>
              <input
                className={inputClasses}
                value={item.role ?? ""}
                onChange={(e) => update(index, { ...item, role: e.target.value || undefined })}
              />
            </div>
            <div>
              <label className={labelClasses}>Organization (optional)</label>
              <input
                className={inputClasses}
                value={item.organization ?? ""}
                onChange={(e) => update(index, { ...item, organization: e.target.value || undefined })}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addTestimonial}
        className="rounded-full border border-dashed border-neutral-300 px-4 py-2 text-sm text-neutral-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-400"
      >
        + Add testimonial
      </button>

      <SaveBar onSave={handleSave} saving={saving} error={error} saved={saved} />
    </div>
  );
}
