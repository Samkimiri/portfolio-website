// Called from /admin (Projects tab -> "Generate with AI"). Requires a
// valid Supabase session JWT (deployed WITH JWT verification), so only a
// signed-in admin can trigger a (paid) generation.
//
// Flow: submit a prompt to Higgsfield -> poll until done -> download the
// result (Higgsfield only guarantees the file exists for ~7 days) ->
// re-upload it into the project-screenshots bucket for a permanent URL.
//
// Secrets (set via `supabase secrets set`, never committed):
//   HF_API_KEY_ID, HF_API_KEY_SECRET — from cloud.higgsfield.ai
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are auto-provided by Supabase
// to every Edge Function; no need to set them manually.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const HF_API_KEY_ID = Deno.env.get("HF_API_KEY_ID")!;
const HF_API_KEY_SECRET = Deno.env.get("HF_API_KEY_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const BUCKET = "project-screenshots";
const HF_AUTH = `Key ${HF_API_KEY_ID}:${HF_API_KEY_SECRET}`;
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 30; // ~60s ceiling; images typically finish in a few seconds

// Only the site itself (and local dev) should ever call this — it's
// gated by JWT anyway, but there's no reason to also allow arbitrary
// origins to attempt it.
const ALLOWED_ORIGINS = new Set([
  "https://portfolio-website-pi-henna-13.vercel.app",
  "http://localhost:5173",
]);

function corsHeadersFor(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "null",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    Vary: "Origin",
  };
}

function json(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeadersFor(req), "Content-Type": "application/json" },
  });
}

interface HiggsfieldJob {
  status: "queued" | "in_progress" | "completed" | "failed" | "nsfw" | "canceled";
  status_url: string;
  images?: { url: string }[];
  error?: string;
}

const TERMINAL_STATUSES = new Set(["completed", "failed", "nsfw", "canceled"]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeadersFor(req) });

  try {
    const { prompt, projectId } = await req.json();
    if (!prompt || !projectId) {
      return json(req, { error: "prompt and projectId are required" }, 400);
    }

    const submitResponse = await fetch("https://api.higgsfield.ai/higgsfield-ai/soul/v2/standard", {
      method: "POST",
      headers: { Authorization: HF_AUTH, "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!submitResponse.ok) {
      return json(req, { error: `Higgsfield request failed: ${await submitResponse.text()}` }, 502);
    }

    let job: HiggsfieldJob = await submitResponse.json();

    for (let attempt = 0; !TERMINAL_STATUSES.has(job.status) && attempt < MAX_POLL_ATTEMPTS; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
      const statusResponse = await fetch(job.status_url, { headers: { Authorization: HF_AUTH } });
      job = await statusResponse.json();
    }

    const imageUrl = job.images?.[0]?.url;
    if (job.status !== "completed" || !imageUrl) {
      return json(req, { error: `Image generation ${job.status}${job.error ? `: ${job.error}` : ""}` }, 502);
    }

    const imageResponse = await fetch(imageUrl);
    const contentType = imageResponse.headers.get("content-type") ?? "image/png";
    const ext = contentType.includes("png") ? "png" : "jpg";
    const path = `${projectId}-ai-${Date.now()}.${ext}`;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, await imageResponse.blob(), { contentType, upsert: true });

    if (uploadError) return json(req, { error: `Storage upload failed: ${uploadError.message}` }, 500);

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return json(req, { url: data.publicUrl });
  } catch (err) {
    return json(req, { error: String(err) }, 500);
  }
});
