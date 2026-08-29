# Portfolio Website

A personal portfolio site showcasing websites and web apps I've built. Built with React, Vite, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Editing content

All editable content lives in `src/data/`:

- `src/data/profile.js` — name, role, tagline, about text, email, social links.
- `src/data/projects.js` — the list of projects shown in the Projects section (title, description, tags, links, screenshot).

Drop project screenshots into `src/assets/projects/`, import them in `projects.js`, and set them as each project's `image`.

## Project structure

```
src/
  components/   UI sections (Navbar, Hero, Projects, About, Contact, Footer)
  data/         Editable content (profile, projects)
  App.jsx       Page layout
```

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.
