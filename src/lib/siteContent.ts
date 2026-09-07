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

const TABLE = "site_content";

export async function fetchSiteContent<K extends SiteContentKey>(
  key: K,
): Promise<SiteContent[K] | null> {
  if (!supabase) return null;

  const { data, error } = await supabase.from(TABLE).select("value").eq("key", key).maybeSingle();

  if (error || !data) return null;
  return data.value as SiteContent[K];
}

export async function saveSiteContent<K extends SiteContentKey>(
  key: K,
  value: SiteContent[K],
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase isn't configured." };

  const { error } = await supabase.from(TABLE).upsert({ key, value, updated_at: new Date().toISOString() });

  return { error: error?.message ?? null };
}
