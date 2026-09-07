import type { ReactNode } from "react";

interface BrowserFrameProps {
  url?: string | null;
  children: ReactNode;
}

function hostnameOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default function BrowserFrame({ url, children }: BrowserFrameProps) {
  const hostname = hostnameOf(url);

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-1.5 bg-neutral-200/80 px-3 py-2 dark:bg-neutral-800/80">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        {hostname && (
          <span className="ml-2 truncate rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] text-neutral-500 dark:bg-neutral-900/60 dark:text-neutral-400">
            {hostname}
          </span>
        )}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
