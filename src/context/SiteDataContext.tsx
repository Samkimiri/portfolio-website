import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { profile as staticProfile } from "../data/profile";
import { skillGroups as staticSkills } from "../data/skills";
import { experience as staticExperience } from "../data/experience";
import { projects as staticProjects } from "../data/projects";
import { testimonials as staticTestimonials } from "../data/testimonials";
import { fetchSiteContent, type SiteContent, type SiteContentKey } from "../lib/siteContent";
import type { ExperienceItem, Profile, Project, SkillGroup, Testimonial } from "../types";

interface SiteDataValue {
  profile: Profile;
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  projects: Project[];
  testimonials: Testimonial[];
  loading: boolean;
  // Real fetch failures only (network/RLS/config) — not the expected "table
  // empty, using fallback" case. Keyed by section so the admin panel can
  // say exactly what failed to sync.
  syncErrors: Partial<Record<SiteContentKey, string>>;
  refresh: () => void;
}

const SiteDataContext = createContext<SiteDataValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(staticProfile);
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(staticSkills);
  const [experience, setExperience] = useState<ExperienceItem[]>(staticExperience);
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);
  const [loading, setLoading] = useState(true);
  const [syncErrors, setSyncErrors] = useState<Partial<Record<SiteContentKey, string>>>({});
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      const [remoteProfile, remoteSkills, remoteExperience, remoteProjects, remoteTestimonials] = await Promise.all([
        fetchSiteContent("profile"),
        fetchSiteContent("skills"),
        fetchSiteContent("experience"),
        fetchSiteContent("projects"),
        fetchSiteContent("testimonials"),
      ]);

      if (cancelled) return;

      // Merged (not replaced) against the static default so a profile row
      // saved before a new field existed (e.g. heroHeadline) doesn't blank
      // it out on the live site until an admin happens to re-save.
      if (remoteProfile.data) setProfile({ ...staticProfile, ...(remoteProfile.data as SiteContent["profile"]) });
      if (remoteSkills.data) setSkillGroups(remoteSkills.data as SiteContent["skills"]);
      if (remoteExperience.data) setExperience(remoteExperience.data as SiteContent["experience"]);
      if (remoteProjects.data) setProjects(remoteProjects.data as SiteContent["projects"]);
      if (remoteTestimonials.data) setTestimonials(remoteTestimonials.data as SiteContent["testimonials"]);

      const errors: Partial<Record<SiteContentKey, string>> = {};
      if (remoteProfile.error) errors.profile = remoteProfile.error;
      if (remoteSkills.error) errors.skills = remoteSkills.error;
      if (remoteExperience.error) errors.experience = remoteExperience.error;
      if (remoteProjects.error) errors.projects = remoteProjects.error;
      if (remoteTestimonials.error) errors.testimonials = remoteTestimonials.error;

      if (Object.keys(errors).length > 0) {
        console.error("Failed to sync site content from Supabase, showing fallback content:", errors);
      }
      setSyncErrors(errors);

      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [version]);

  const value = useMemo(
    () => ({ profile, skillGroups, experience, projects, testimonials, loading, syncErrors, refresh }),
    [profile, skillGroups, experience, projects, testimonials, loading, syncErrors, refresh],
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteDataValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within a SiteDataProvider");
  return ctx;
}
