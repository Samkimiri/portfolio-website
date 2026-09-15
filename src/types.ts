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
  // Short, punchy company-voiced headline for the home page Hero — `tagline`
  // stays long-form for the personal /portfolio and /resume pages.
  heroHeadline: string;
  // Company-voiced About copy for the home page (no personal narrative) —
  // `about` above stays personal-voice, used only on /portfolio and /resume.
  companyAbout: string[];
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

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  // e.g. "Founder" — the organization, if any, is a separate field so it
  // can be omitted for an individual client with no company affiliation.
  role?: string;
  organization?: string;
}
