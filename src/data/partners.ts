import type { Partner } from "../types";

// This file only seeds the site the first time it loads (no Supabase
// configured yet, or the `site_content` table is empty) — see /admin →
// Partners for the live source of truth, including logo uploads.
export const partners: Partner[] = [
  {
    id: "scds",
    name: "Sam Creative Design School",
    logo: null,
    url: "https://samcreativedesignschool.com/",
  },
  {
    id: "sam-creative-graphics",
    name: "Sam Creative Graphics",
    logo: null,
    url: "https://sam-creative-graphics.vercel.app/",
  },
  {
    id: "power-learn-project",
    name: "Power Learn Project",
    logo: null,
    url: null,
  },
];
