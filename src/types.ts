export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone?: string;
  // Digits only, with country code, no "+" or spaces (e.g. "254712345678") —
  // used to build a wa.me chat link.
  whatsapp?: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  location: string;
  about: string[];
  social: SocialLinks;
  // The public brand identity (e.g. "Stackfen") — kept separate from `name`
  // so the personal /resume page always shows the real name, never the
  // studio brand, regardless of how the marketing site is branded.
  brandName: string;
  brandTagline: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  tags: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  screenshot: string | null;
  accent: "emerald" | "sky" | "amber" | "violet";
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  org: string;
  description: string;
}
