# Sam Kimiri — Portfolio

Personal portfolio for Samuel Ndung'u Kimiri (Sam), fullstack software engineer. React + TypeScript + Tailwind CSS, animated with Framer Motion, contact form and all page content backed by Supabase, deployed on Vercel. Includes a password-protected `/admin` panel for editing every section of the site — profile, skills, experience, projects — without touching code.

## Stack

- React 18 + TypeScript, built with Vite
- React Router — `/` is the public site, `/admin` is the content editor
- Tailwind CSS v4 (class-based dark mode, toggle in the navbar)
- Framer Motion — scroll-reveal, hero entrance, hover/tap micro-interactions, respects `prefers-reduced-motion`
- Supabase — stores contact form submissions, all editable page content, and admin authentication
- Single scrolling public page with anchor nav (`#about`, `#skills`, `#projects`, `#experience`, `#contact`); project details open in a modal rather than a separate route

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
  admin/          The /admin panel — Login, Dashboard, and one editor per
                   section (Profile, Skills, Experience, Projects,
                   Messages — the contact form inbox)
  components/     UI sections and pieces (Navbar, Hero, About, Skills,
                   Projects, ProjectCard, ProjectModal, Experience,
                   Contact, Footer, ThemeToggle, Reveal, icons)
  context/        SiteDataContext — loads content from Supabase (falling
                   back to src/data/ if unset or empty), retries failed
                   fetches, and shares the result with every component
  data/           Seed/fallback content — profile.ts, skills.ts,
                   projects.ts, experience.ts (only used until Supabase
                   has real rows — see "Editing content" below)
  hooks/          useTheme (dark/light mode, persisted to localStorage)
  lib/            supabase.ts (client), auth.ts (admin sign-in),
                   siteContent.ts (read/write site_content table, with
                   retry), contactSubmissions.ts (read/manage contact
                   form messages), storage.ts (upload project
                   screenshots), accent.ts (project accent colors)
  types.ts        Shared content types
supabase/
  schema.sql      Run in the Supabase SQL editor (safe to re-run anytime)
                   — creates every table, storage bucket, and RLS policy
                   this app needs: site_content, contact_submissions, and
                   the project-screenshots storage bucket
```

## Editing content

Once Supabase is set up (below) and you've signed in, go to `/admin` and edit any section — Profile, Skills, Experience, or Projects — then hit "Save changes". That writes straight to the database; the public site picks it up on next load. No code changes, no redeploy.

Until Supabase is configured (or a section has never been saved), the site falls back to the static files in `src/data/` — useful for local development without a database.

Project screenshots can either be a pasted URL or uploaded directly — the Projects tab has an "Upload" button next to the screenshot field that stores the image in Supabase Storage and fills in the URL for you.

The **Messages** tab shows everyone who's submitted the Contact form, newest first, with unread highlighted. Mark a message read/unread or delete it — no more digging through the Supabase dashboard to see who's reached out.

If live content ever fails to load (network issue, misconfigured env vars, etc.), `/admin` shows a red banner naming exactly which section failed and why, with a Retry button — the public site itself stays silent and just serves the last-known-good fallback rather than showing visitors an error.

## Things you still need to plug in

- **Resume PDF** — drop it in `public/resume.pdf` (or wherever) and set `resumeUrl` in `src/data/profile.ts`. The "Download Resume" button is hidden until this is set.
- **Phone number** (optional) — set `social.phone` in `src/data/profile.ts` to show it in Contact/Hero.
- **Project links, repos, screenshots** — edit these in `/admin` → Projects once Supabase is set up (screenshots can be uploaded directly there), or in `src/data/projects.ts` beforehand. While a field is `null`, the project card shows a clearly marked `[LIVE LINK]` / `[GITHUB LINK]` / `[SCREENSHOT]` placeholder so it's obvious what's missing.
- **OG image** — `index.html` references `/og-image.png` for social share previews (1200×630 recommended). Add that file to `public/`.
- **Supabase project** — see below.

## Supabase setup

One Supabase project backs the contact form, all editable content, and the admin panel.

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run everything in [`supabase/schema.sql`](supabase/schema.sql). It's a single, idempotent file (safe to run again later after a pull) that sets up:
   - `site_content` — one JSON row per section (profile, skills, experience, projects), public read, admin-only write.
   - `contact_submissions` — anyone can submit, only a signed-in admin can read/manage (via the Messages tab).
   - a `project-screenshots` storage bucket — public read, admin-only upload, for the screenshot upload button in the Projects tab.
3. In Project Settings → API, copy the **Project URL** and **anon public key**, and put them in `.env.local` (copy `.env.example`):

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

   Until these are set, the contact form stays visibly disabled with a note explaining why, instead of silently failing, and `/admin` shows a setup notice instead of a login form.
4. Create yourself an admin account: **Authentication → Users → Add user** in the Supabase dashboard. Set a password directly (skip "send invite"). There's no public sign-up — only accounts you create here can sign in.
5. Go to `/admin` on your site (locally: `http://localhost:5173/admin`), sign in, and open each of Profile/Skills/Experience/Projects and hit **Save changes** once — this seeds `site_content` with your current data so the database becomes the source of truth. From then on, edit directly in `/admin`.

## Deploying to Vercel

1. Push this repo to GitHub (or import it directly from your local Git in the Vercel dashboard).
2. In Vercel, "Add New Project" → import the repo. Framework preset "Vite" is auto-detected; no build config changes needed.
3. Add the two Supabase env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) under Project Settings → Environment Variables.
4. Deploy. Every push to `main` redeploys automatically.

## Notes on the animation approach

Framer Motion only animates `opacity`, `transform`, and `filter` — none of these trigger layout, so they don't affect CLS. All scroll-reveal and entrance animations check `useReducedMotion()` and collapse to a fast, motion-free fade when the visitor has reduced motion enabled at the OS level.
