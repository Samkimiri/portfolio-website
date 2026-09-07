export const inputClasses =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";

export const labelClasses = "mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400";

export const cardClasses =
  "rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900";

interface SaveBarProps {
  onSave: () => void;
  saving: boolean;
  error: string | null;
  saved: boolean;
}

export function SaveBar({ onSave, saving, error, saved }: SaveBarProps) {
  return (
    <div className="sticky bottom-0 flex items-center gap-4 border-t border-neutral-200 bg-white/90 px-1 py-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
      {saved && <span className="text-sm text-emerald-600 dark:text-emerald-400">Saved.</span>}
      {error && <span className="text-sm text-red-600 dark:text-red-400">{error}</span>}
    </div>
  );
}

export function IconButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-600 transition-colors hover:border-red-400 hover:text-red-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-red-500 dark:hover:text-red-400"
    >
      {label}
    </button>
  );
}
