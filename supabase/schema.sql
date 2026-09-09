-- Run this in the Supabase SQL editor for your project.
-- Safe to re-run any time — every statement is idempotent (tables/columns
-- use IF NOT EXISTS, policies are dropped and recreated).

-- =====================================================================
-- site_content — all editable page content (profile, skills, experience,
-- projects), one JSON row per section, edited from /admin. The public
-- site reads this table directly; falls back to src/data/*.ts if empty.
-- =====================================================================

create table if not exists site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

drop policy if exists "Allow public read" on site_content;
create policy "Allow public read"
  on site_content
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Allow authenticated write" on site_content;
create policy "Allow authenticated write"
  on site_content
  for insert
  to authenticated
  with check (true);

drop policy if exists "Allow authenticated update" on site_content;
create policy "Allow authenticated update"
  on site_content
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Allow authenticated delete" on site_content;
create policy "Allow authenticated delete"
  on site_content
  for delete
  to authenticated
  using (true);

-- After running this, seed the four rows with your current content (or
-- just open /admin and hit "Save" on each tab once you're signed in —
-- that inserts the row for you).

-- =====================================================================
-- contact_submissions — messages sent through the site's Contact form.
-- Anyone can submit; only a signed-in admin can read/manage them (via
-- the Messages tab in /admin).
-- =====================================================================

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_submissions add column if not exists read boolean not null default false;

alter table contact_submissions enable row level security;

-- Keep payloads bounded — cheap protection against abusive submissions.
alter table contact_submissions drop constraint if exists contact_submissions_name_length;
alter table contact_submissions add constraint contact_submissions_name_length check (char_length(name) between 1 and 200);

alter table contact_submissions drop constraint if exists contact_submissions_email_length;
alter table contact_submissions add constraint contact_submissions_email_length check (char_length(email) between 3 and 200);

alter table contact_submissions drop constraint if exists contact_submissions_message_length;
alter table contact_submissions add constraint contact_submissions_message_length check (char_length(message) between 1 and 5000);

-- Server-side rate limit: the Contact form's honeypot is client-side JS
-- only, so a script hitting the REST API directly bypasses it entirely.
-- This blocks basic flooding (each accepted row also sends an email via
-- notify-contact, so unlimited inserts means unlimited emails) without
-- needing to capture IP addresses. 5/minute is generous for a real visitor
-- but stops a naive spam script cold.
create or replace function contact_submissions_rate_limit() returns trigger as $$
begin
  if (select count(*) from contact_submissions where created_at > now() - interval '1 minute') >= 5 then
    raise exception 'Too many messages sent recently. Please wait a bit and try again.';
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists contact_submissions_rate_limit_trigger on contact_submissions;
create trigger contact_submissions_rate_limit_trigger
before insert on contact_submissions
for each row execute function contact_submissions_rate_limit();

-- `authenticated` is included too so a signed-in admin testing the form
-- (or any logged-in visitor) isn't blocked — Supabase's client sends the
-- session's role automatically, not just the anon key, whenever one exists.
drop policy if exists "Allow public inserts" on contact_submissions;
create policy "Allow public inserts"
  on contact_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow authenticated read" on contact_submissions;
create policy "Allow authenticated read"
  on contact_submissions
  for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated update" on contact_submissions;
create policy "Allow authenticated update"
  on contact_submissions
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Allow authenticated delete" on contact_submissions;
create policy "Allow authenticated delete"
  on contact_submissions
  for delete
  to authenticated
  using (true);

-- =====================================================================
-- Storage — lets you upload project screenshots from /admin instead of
-- pasting external image URLs. Bucket is public-read (screenshots are
-- meant to be visible on the site); only a signed-in admin can upload,
-- replace, or delete files in it.
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('project-screenshots', 'project-screenshots', true)
on conflict (id) do nothing;

drop policy if exists "Public read project screenshots" on storage.objects;
create policy "Public read project screenshots"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'project-screenshots');

drop policy if exists "Authenticated upload project screenshots" on storage.objects;
create policy "Authenticated upload project screenshots"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-screenshots');

drop policy if exists "Authenticated update project screenshots" on storage.objects;
create policy "Authenticated update project screenshots"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-screenshots')
  with check (bucket_id = 'project-screenshots');

drop policy if exists "Authenticated delete project screenshots" on storage.objects;
create policy "Authenticated delete project screenshots"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-screenshots');

-- =====================================================================
-- Contact notification — fires the `notify-contact` Edge Function (see
-- supabase/functions/notify-contact) whenever a new contact_submissions
-- row is inserted, which emails the site owner via Resend.
--
-- DO NOT paste this as-is: replace YOUR_WEBHOOK_SECRET with the actual
-- value set via `supabase secrets set WEBHOOK_SECRET=...` for this
-- project. This file is public — the real secret must never be committed,
-- only ever pasted directly into the SQL editor when (re-)creating this
-- trigger.
-- =====================================================================

create or replace trigger "notify_contact_submission"
after insert on public.contact_submissions
for each row execute function supabase_functions.http_request(
  'https://vhhfxcibpqjbulxohcxv.supabase.co/functions/v1/notify-contact',
  'POST',
  '{"Content-type":"application/json","x-webhook-secret":"YOUR_WEBHOOK_SECRET"}',
  '{}',
  '5000'
);

-- =====================================================================
-- page_views — lightweight, privacy-conscious visit tracking for the
-- Analytics tab in /admin. Deliberately minimal: just which page and
-- which browser, no IP addresses, no user-agent fingerprinting, no way
-- to identify who a visitor actually is. Anyone can write (it fires on
-- every page load); only the signed-in admin can read the results back.
-- =====================================================================

create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  browser text not null,
  created_at timestamptz not null default now()
);

alter table page_views enable row level security;

drop policy if exists "Allow public inserts" on page_views;
create policy "Allow public inserts"
  on page_views
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow authenticated read" on page_views;
create policy "Allow authenticated read"
  on page_views
  for select
  to authenticated
  using (true);
