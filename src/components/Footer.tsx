import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";

export default function Footer() {
  const { profile } = useSiteData();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 px-6 py-10 dark:border-slate-900">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row dark:text-slate-500">
          <p className="flex items-center gap-2">
            <img
              src="/logo-icon.png"
              alt=""
              className="h-5 w-5 rounded border border-slate-200 dark:border-slate-800"
            />
            © {year} {profile.brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/portfolio" className="transition-colors hover:text-amber-700 dark:hover:text-amber-400">
              Portfolio
            </Link>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
            >
              GitHub
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.social.email}`}
              className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
            >
              Email
            </a>
          </div>
          <p>Founded by {profile.name}.</p>
        </div>

        <div className="mt-6 flex justify-center gap-6 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:justify-start dark:border-slate-900 dark:text-slate-600">
          <Link to="/privacy" className="transition-colors hover:text-slate-600 dark:hover:text-slate-400">
            Privacy Policy
          </Link>
          <Link to="/terms" className="transition-colors hover:text-slate-600 dark:hover:text-slate-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
