import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { profile as staticProfile } from "../data/profile";
import { skillGroups as staticSkills } from "../data/skills";
import { experience as staticExperience } from "../data/experience";
import { projects as staticProjects } from "../data/projects";
import { fetchSiteContent, type SiteContent } from "../lib/siteContent";
import type { ExperienceItem, Profile, Project, SkillGroup } from "../types";

interface SiteDataValue {
  profile: Profile;
  skillGroups: SkillGroup[];
  experience: ExperienceItem[];
  projects: Project[];
  loading: boolean;
  refresh: () => void;
}

const SiteDataContext = createContext<SiteDataValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(staticProfile);
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(staticSkills);
  const [experience, setExperience] = useState<ExperienceItem[]>(staticExperience);
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      const [remoteProfile, remoteSkills, remoteExperience, remoteProjects] = await Promise.all([
        fetchSiteContent("profile"),
        fetchSiteContent("skills"),
        fetchSiteContent("experience"),
        fetchSiteContent("projects"),
      ]);

      if (cancelled) return;

      if (remoteProfile) setProfile(remoteProfile as SiteContent["profile"]);
      if (remoteSkills) setSkillGroups(remoteSkills as SiteContent["skills"]);
      if (remoteExperience) setExperience(remoteExperience as SiteContent["experience"]);
      if (remoteProjects) setProjects(remoteProjects as SiteContent["projects"]);

      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [version]);

  const value = useMemo(
    () => ({ profile, skillGroups, experience, projects, loading, refresh }),
    [profile, skillGroups, experience, projects, loading, refresh],
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteDataValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within a SiteDataProvider");
  return ctx;
}
