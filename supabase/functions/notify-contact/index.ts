// Triggered by a Database Webhook on `contact_submissions` INSERT (see
// supabase/schema.sql). Sends the site owner an email via Resend so a new
// message doesn't just sit unnoticed in the Messages tab.
//
// Secrets (set via `supabase secrets set`, never committed):
//   RESEND_API_KEY  — from resend.com
//   NOTIFY_EMAIL    — where the notification should land
//   WEBHOOK_SECRET  — shared secret the trigger sends back, checked below
//                     since this function is deployed with --no-verify-jwt
//                     (database webhooks don't carry a Supabase user JWT)

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL")!;
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET")!;

interface ContactSubmissionPayload {
  record?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

Deno.serve(async (req) => {
  if (req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload: ContactSubmissionPayload = await req.json();
  const { name, email, message } = payload.record ?? {};

  if (!name || !email || !message) {
    return new Response("Missing fields in payload", { status: 400 });
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      reply_to: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend API error:", errorText);
    return new Response(`Failed to send email: ${errorText}`, { status: 502 });
  }

  return new Response("OK", { status: 200 });
});
