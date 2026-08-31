# Sam Kimiri — Portfolio

Personal portfolio for Samuel Ndung'u Kimiri (Sam), fullstack software engineer. React + TypeScript + Tailwind CSS, animated with Framer Motion, contact form backed by Supabase, deployed on Vercel.

## Stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS v4 (class-based dark mode, toggle in the navbar)
- Framer Motion — scroll-reveal, hero entrance, hover/tap micro-interactions, respects `prefers-reduced-motion`
- Supabase — stores contact form submissions
- Single scrolling page with anchor nav (`#about`, `#skills`, `#projects`, `#experience`, `#contact`); project details open in a modal rather than a separate route

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase values (see below)
npm run dev
```

Open http://localhost:5173.

Other scripts: `npm run build` (typecheck + production build), `npm run typecheck`, `npm run lint`, `npm run preview`.

## Project structure

```
src/
  components/     UI sections and pieces (Navbar, Hero, About, Skills,
                   Projects, ProjectCard, ProjectModal, Experience,
                   Contact, Footer, ThemeToggle, Reveal, icons)
  data/           Editable content — profile.ts, skills.ts, projects.ts,
                   experience.ts
  hooks/          useTheme (dark/light mode, persisted to localStorage)
  lib/            supabase.ts (client), accent.ts (project accent colors)
  types.ts        Shared content types
```

All real content lives in `src/data/` — edit those files, not the components, to update your bio, skills, projects, or timeline.

## Things you still need to plug in

- **Resume PDF** — drop it in `public/resume.pdf` (or wherever) and set `resumeUrl` in `src/data/profile.ts`. The "Download Resume" button is hidden until this is set.
- **Phone number** (optional) — set `social.phone` in `src/data/profile.ts` to show it in Contact/Hero.
- **Project links, repos, screenshots** — in `src/data/projects.ts`, each project has `liveUrl` / `repoUrl` / `screenshot`. While `null`, the project card shows a clearly marked `[LIVE LINK]` / `[GITHUB LINK]` / `[SCREENSHOT]` placeholder so it's obvious what's missing.
- **OG image** — `index.html` references `/og-image.png` for social share previews (1200×630 recommended). Add that file to `public/`.
- **Supabase project** — see below.

## Supabase setup (contact form)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run:

   ```sql
   create table contact_submissions (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null,
     message text not null,
     created_at timestamptz not null default now()
   );

   alter table contact_submissions enable row level security;

   -- Anyone can submit the form, but only you (via the dashboard, using
   -- the service role) can read submissions back — no public select policy.
   create policy "Allow public inserts"
     on contact_submissions
     for insert
     to anon
     with check (true);
   ```

3. In Project Settings → API, copy the **Project URL** and **anon public key**.
4. Put them in `.env.local` (copy `.env.example`):

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

Until these are set, the contact form stays visibly disabled with a note explaining why, instead of silently failing.

## Deploying to Vercel

1. Push this repo to GitHub (or import it directly from your local Git in the Vercel dashboard).
2. In Vercel, "Add New Project" → import the repo. Framework preset "Vite" is auto-detected; no build config changes needed.
3. Add the two Supabase env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) under Project Settings → Environment Variables.
4. Deploy. Every push to `main` redeploys automatically.

## Notes on the animation approach

Framer Motion only animates `opacity`, `transform`, and `filter` — none of these trigger layout, so they don't affect CLS. All scroll-reveal and entrance animations check `useReducedMotion()` and collapse to a fast, motion-free fade when the visitor has reduced motion enabled at the OS level.
