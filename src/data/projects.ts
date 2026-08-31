import type { Project } from "../types";

// Fields left `null` are placeholders — drop in the real link, repo, or
// screenshot and the UI will pick it up automatically. Until then the
// card shows a clearly-marked [LIVE LINK] / [GITHUB LINK] / [SCREENSHOT] tag.
export const projects: Project[] = [
  {
    id: "renziy",
    name: "Renziy",
    tagline: "Rent, managed.",
    description:
      "A Kenya-first property management app that gives landlords and tenants a shared, transparent way to handle rent. Payments run through M-Pesa integration on a Supabase backend, deployed on Vercel and Netlify.",
    tags: ["React", "Supabase", "M-Pesa", "Vercel", "Netlify"],
    liveUrl: null, // TODO: [LIVE LINK]
    repoUrl: null, // TODO: [GITHUB LINK]
    screenshot: null, // TODO: [SCREENSHOT]
    accent: "emerald",
  },
  {
    id: "imara-finance-ai",
    name: "Imara Finance AI",
    description:
      "A responsible microloan platform built for informal-sector traders in Kenya, part of Imara Capital's AI Pride Ecosystem — a multi-agent AI lending framework. Includes an interactive analytics dashboard for tracking loan and portfolio performance.",
    tags: ["Fintech", "Multi-agent AI", "React", "Supabase"],
    liveUrl: null, // TODO: [LIVE LINK]
    repoUrl: null, // TODO: [GITHUB LINK]
    screenshot: null, // TODO: [SCREENSHOT]
    accent: "sky",
  },
  {
    id: "payment-records-app",
    name: "Payment Records App",
    description:
      "A unified payment-tracking application serving two businesses — Sam Creative Design School and Sam Creative Graphics — from a single interface, while keeping each business's financial records and audit logs separate. Built with a fintech-grade UI.",
    tags: ["React", "Tailwind CSS", "Supabase", "Vercel"],
    liveUrl: null, // TODO: [LIVE LINK]
    repoUrl: null, // TODO: [GITHUB LINK]
    screenshot: null, // TODO: [SCREENSHOT]
    accent: "violet",
  },
  {
    id: "scds-learning-platform",
    name: "SCDS Learning Platform",
    description:
      "The learning management system powering Sam Creative Design School, handling courses and student access for the institution. Includes a volunteer registration system backed by Supabase.",
    tags: ["LMS", "React", "Supabase"],
    liveUrl: "https://sam-creative-design-school.vercel.app",
    repoUrl: null, // TODO: [GITHUB LINK]
    screenshot: null, // TODO: [SCREENSHOT]
    accent: "amber",
  },
];
