import { supabase } from "./supabase";

const BUCKET = "project-screenshots";
const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadProjectScreenshot(
  projectId: string,
  file: File,
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) return { url: null, error: "Supabase isn't configured." };

  if (!file.type.startsWith("image/")) {
    return { url: null, error: "Please choose an image file." };
  }
  if (file.size > MAX_BYTES) {
    return { url: null, error: "Image is too large (max 5MB)." };
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${projectId}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (uploadError) return { url: null, error: uploadError.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
