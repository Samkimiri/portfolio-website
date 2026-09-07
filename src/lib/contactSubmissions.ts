import { supabase } from "./supabase";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export async function countUnreadSubmissions(): Promise<number> {
  if (!supabase) return 0;
  const { count } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("read", false);
  return count ?? 0;
}

export async function listContactSubmissions(): Promise<{ data: ContactSubmission[]; error: string | null }> {
  if (!supabase) return { data: [], error: "Supabase isn't configured." };

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return { data: (data as ContactSubmission[]) ?? [], error: error?.message ?? null };
}

export async function setSubmissionRead(id: string, read: boolean): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase isn't configured." };
  const { error } = await supabase.from("contact_submissions").update({ read }).eq("id", id);
  return { error: error?.message ?? null };
}

export async function deleteSubmission(id: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Supabase isn't configured." };
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  return { error: error?.message ?? null };
}
