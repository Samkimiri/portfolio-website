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
  resumeUrl: string | null;
  social: SocialLinks;
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
