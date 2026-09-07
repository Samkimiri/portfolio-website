-- Run this in the Supabase SQL editor for your project.
-- Backs the admin panel: all editable page content (profile, skills,
-- experience, projects) lives here as one JSON row per section, so the
-- site never needs a code change or redeploy to update content.

create table if not exists site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

-- Anyone can read the site content (it's what renders the public site).
create policy "Allow public read"
  on site_content
  for select
  to anon, authenticated
  using (true);

-- Only signed-in users (i.e. you, via the admin panel) can write.
create policy "Allow authenticated write"
  on site_content
  for insert
  to authenticated
  with check (true);

create policy "Allow authenticated update"
  on site_content
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Allow authenticated delete"
  on site_content
  for delete
  to authenticated
  using (true);

-- After running this, seed the four rows with your current content (or
-- just open /admin and hit "Save" on each tab once you're signed in —
-- that inserts the row for you).
