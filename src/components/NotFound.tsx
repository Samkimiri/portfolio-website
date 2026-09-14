import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center dark:bg-slate-950">
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-yellow-700 dark:text-yellow-400">
        404
      </p>
      <h1 className="font-display text-3xl font-bold text-slate-950 dark:text-slate-50">Page not found</h1>
      <p className="max-w-sm text-slate-600 dark:text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center rounded-full bg-yellow-600 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-yellow-400"
      >
        Back to home
      </Link>
    </div>
  );
}
