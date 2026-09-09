import type { Project } from "../types";

// This file only seeds the site the first time it loads (no Supabase
// configured yet, or the `site_content` table is empty). Once you sign in
// at /admin and save the Projects tab, the database becomes the source of
// truth and this file stops being read — edit content there instead.
export const projects: Project[] = [
  {
    id: "amani",
    name: "Amani",
    tagline: "Sermon notes and Scripture, together, offline-first",
    description:
      "Amani helps Christians take sermon notes without losing the thread of the service, and read Scripture without needing a connection. Type a shorthand reference like \"2 Cor 5:7\" to insert the full verse instantly, backed by a complete offline KJV Bible — all 66 books, ~31,000 verses — bundled for zero-connectivity use. Notes support inline photos and share as a styled verse-card image, PDF, or plain text.",
    tags: ["React Native", "Expo", "TypeScript", "Offline-first", "In development"],
    liveUrl: "https://amani-app.vercel.app/",
    repoUrl: null,
    screenshot: "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/amani-cover.webp",
    accent: "sky",
  },
  {
    id: "renziy",
    name: "Renziy",
    tagline: "Rent, managed.",
    description:
      "Renziy (formerly Rentza) is a Kenya-first platform aimed at the house-hunting problem — helping tenants actually find and secure a place to live, not just manage one they're already renting. Landlords and tenants share one transparent system for listings, M-Pesa rent payments, and records, built on a full Supabase relational schema and deployed on Vercel and Netlify.",
    tags: ["React", "Supabase", "M-Pesa", "Vercel", "Netlify"],
    liveUrl: "https://renziy-gkni.vercel.app/",
    repoUrl: null,
    screenshot: "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/renziy-cover.webp",
    accent: "emerald",
  },
  {
    id: "imara-finance-ai",
    name: "Imara Finance AI",
    tagline: "AI lending, responsibly.",
    description:
      "A responsible microloan platform built for informal-sector traders in Kenya, part of Imara Capital's AI Pride Ecosystem — a multi-agent AI lending framework. Includes an interactive analytics dashboard for tracking loan and portfolio performance.",
    tags: ["Fintech", "Multi-agent AI", "React", "Supabase"],
    liveUrl: "https://imara-finance-ai.vercel.app/",
    repoUrl: null,
    screenshot:
      "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/imara-finance-ai-cover.webp",
    accent: "sky",
  },
  {
    id: "paytrack",
    name: "PayTrack",
    tagline: "Payments, tracked.",
    description:
      "A unified payment-tracking application serving two businesses — Sam Creative Design School and Sam Creative Graphics — from a single interface, while keeping each business's financial records and audit logs separate. Built with a fintech-grade UI.",
    tags: ["React", "Tailwind CSS", "Supabase", "Vercel"],
    liveUrl: "https://paytrack-gold.vercel.app/",
    repoUrl: null,
    screenshot: "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/paytrack-cover.webp",
    accent: "violet",
  },
  {
    id: "scds-learning-platform",
    name: "SCDS Learning Platform",
    tagline: "Learn, creatively.",
    description:
      "The learning management system powering Sam Creative Design School, handling courses and student access for the institution.",
    tags: ["LMS", "React", "Supabase"],
    liveUrl: "https://samcreativedesignschool.com/",
    repoUrl: null,
    screenshot:
      "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/scds-learning-platform-cover.webp",
    accent: "amber",
  },
  {
    id: "scds-volunteer-registration",
    name: "SCDS Volunteer Registration",
    tagline: "Sign up to help.",
    description:
      "A dedicated volunteer registration system for Sam Creative Design School, letting volunteers apply and get onboarded without manual back-and-forth, backed by Supabase.",
    tags: ["React", "Supabase", "Vercel"],
    liveUrl: "https://publish-scds-volunteer-registration.vercel.app/",
    repoUrl: null,
    screenshot:
      "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/scds-volunteer-registration-cover.webp",
    accent: "emerald",
  },
  {
    id: "sam-creative-graphics",
    name: "Sam Creative Graphics",
    tagline: "Brand, designed.",
    description:
      "The public site for Sam Creative Graphics, a brand design agency — showcasing services and design work for clients.",
    tags: ["React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://sam-creative-graphics.vercel.app/",
    repoUrl: null,
    screenshot:
      "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/sam-creative-graphics-cover.webp",
    accent: "sky",
  },
  {
    id: "ujima-sacco",
    name: "Ujima Sacco",
    tagline: "Save together.",
    description:
      "A digital platform for Ujima Sacco, a savings and credit cooperative, giving members a way to manage contributions and access sacco services online.",
    tags: ["Fintech", "React", "Supabase"],
    liveUrl: "https://ujimasacco-nine.vercel.app/",
    repoUrl: null,
    screenshot: "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/ujima-sacco-cover.webp",
    accent: "violet",
  },
  {
    id: "webhook-verification",
    name: "Webhook Verification Service",
    tagline: "Trust the payload.",
    description:
      "A service for verifying inbound webhook signatures before trusting their payloads — a building block used to keep payment and integration callbacks (e.g. M-Pesa, third-party APIs) tamper-proof.",
    tags: ["Node.js", "Security", "Vercel"],
    liveUrl: "https://webhook-verification.vercel.app/",
    repoUrl: null,
    screenshot:
      "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/webhook-verification-cover.webp",
    accent: "amber",
  },
  {
    id: "reflex-readiness-sprint",
    name: "Reflex",
    tagline: "Readiness Sprint",
    description:
      "A readiness/response-focused web app built during the Readiness Sprint (Group 7) — a collaborative team project delivered under a tight sprint timeline.",
    tags: ["React", "Team project", "Vercel"],
    liveUrl: "https://reflex-the-readiness-sprint-group-7.vercel.app/",
    repoUrl: null,
    screenshot:
      "https://vhhfxcibpqjbulxohcxv.supabase.co/storage/v1/object/public/project-screenshots/reflex-readiness-sprint-cover.webp",
    accent: "emerald",
  },
];
