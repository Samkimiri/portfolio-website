import { supabase } from "./supabase";

export interface AnalyticsSummary {
  homeViews: number;
  resumeViews: number;
  browserCounts: { browser: string; count: number }[];
}

const FETCH_LIMIT = 10000;

export async function getAnalyticsSummary(): Promise<{ data: AnalyticsSummary | null; error: string | null }> {
  if (!supabase) return { data: null, error: "Supabase isn't configured." };

  const { data, error } = await supabase
    .from("page_views")
    .select("path, browser")
    .order("created_at", { ascending: false })
    .limit(FETCH_LIMIT);

  if (error) return { data: null, error: error.message };

  const rows = data ?? [];
  const browserTally = new Map<string, number>();
  let homeViews = 0;
  let resumeViews = 0;

  for (const row of rows) {
    if (row.path === "/") homeViews++;
    if (row.path === "/resume") resumeViews++;
    browserTally.set(row.browser, (browserTally.get(row.browser) ?? 0) + 1);
  }

  const browserCounts = Array.from(browserTally.entries())
    .map(([browser, count]) => ({ browser, count }))
    .sort((a, b) => b.count - a.count);

  return { data: { homeViews, resumeViews, browserCounts }, error: null };
}
