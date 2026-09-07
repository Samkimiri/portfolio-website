import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center dark:bg-neutral-950">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
        404
      </p>
      <h1 className="font-display text-3xl font-bold text-neutral-950 dark:text-neutral-50">Page not found</h1>
      <p className="max-w-sm text-neutral-600 dark:text-neutral-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400"
      >
        Back to home
      </Link>
    </div>
  );
}
