import { useSiteData } from "../context/SiteDataContext";

export default function Footer() {
  const { profile } = useSiteData();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 px-6 py-10 dark:border-neutral-900">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-neutral-500 sm:flex-row dark:text-neutral-500">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-300"
          >
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-300"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.social.email}`}
            className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-300"
          >
            Email
          </a>
        </div>
        <p>Built by {profile.shortName}.</p>
      </div>
    </footer>
  );
}
