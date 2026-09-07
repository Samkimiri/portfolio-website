import { supabase } from "./supabase";

export async function generateProjectScreenshot(
  projectId: string,
  prompt: string,
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) return { url: null, error: "Supabase isn't configured." };

  const { data, error } = await supabase.functions.invoke<{ url?: string; error?: string }>("generate-image", {
    body: { prompt, projectId },
  });

  if (error) return { url: null, error: error.message };
  if (data?.error) return { url: null, error: data.error };
  return { url: data?.url ?? null, error: null };
}
