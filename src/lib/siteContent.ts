import { supabase } from "./supabase";
import type { ExperienceItem, Profile, Project, SkillGroup } from "../types";

// All editable page content lives in one `site_content` table: one row per
// section, keyed by name, holding a JSON blob shaped like the section's
// type. See supabase/schema.sql for the table + RLS policies. Falling back
// to the static `src/data/*` files (passed in by the caller) means the site
// still renders correctly before Supabase is configured or seeded.

export interface SiteContent {
  profile: Profile;
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: Project[];
}

export type SiteContentKey = keyof SiteContent;

export interface FetchResult<T> {
  data: T | null;
  // Set only for a real failure (network/config/RLS issue) — not for the
  // expected "no row yet" case, which is `{ data: null, error: null }` and
  // means "not seeded, use the fallback" rather than "something's wrong."
  error: string | null;
}

const TABLE = "site_content";
const RETRY_DELAYS_MS = [500, 1500];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchSiteContent<K extends SiteContentKey>(
  key: K,
): Promise<FetchResult<SiteContent[K]>> {
  if (!supabase) return { data: null, error: null };

  let lastError: string | null = null;

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    if (attempt > 0) await delay(RETRY_DELAYS_MS[attempt - 1]);

    const { data, error } = await supabase.from(TABLE).select("value").eq("key", key).maybeSingle();

    if (!error) {
      return { data: (data?.value as SiteContent[K]) ?? null, error: null };
    }

    lastError = error.message;
  }

  return { data: null, error: lastError };
}

export async function saveSiteContent<K extends SiteContentKey>(
  key: K,
  value: SiteContent[K],
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase isn't configured." };

  const { error } = await supabase.from(TABLE).upsert({ key, value, updated_at: new Date().toISOString() });

  return { error: error?.message ?? null };
}
