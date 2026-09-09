import { supabase } from "./supabase";

// Deliberately coarse — a browser family name, not the full user-agent
// string, which is a much stronger fingerprint than needed for a simple
// "what are people browsing with" breakdown.
function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  return "Other";
}

export async function trackPageView(path: string) {
  if (!supabase) return;
  try {
    await supabase.from("page_views").insert({ path, browser: detectBrowser() });
  } catch {
    // Analytics should never break the page for a visitor.
  }
}
