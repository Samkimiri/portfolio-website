import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  const socialLinks = Object.entries(profile.social).filter(([, url]) => url);

  return (
    <footer className="py-10 px-6 border-t border-neutral-900">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          {socialLinks.map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="capitalize hover:text-neutral-300 transition-colors"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
