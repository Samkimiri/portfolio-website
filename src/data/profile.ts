import type { Profile } from "../types";

// TODO: drop your resume PDF into public/resume.pdf (or wherever you like)
// and set resumeUrl below. The "Download Resume" button hides itself while
// this is null.
const resumeUrl: string | null = null;

export const profile: Profile = {
  name: "Samuel Ndung'u Kimiri",
  shortName: "Sam Kimiri",
  role: "Fullstack Software Engineer",
  tagline:
    "I build and ship production fintech, marketplace, and AI-driven products for the East African market — from an M-Pesa-integrated rent platform to a multi-agent AI lending system.",
  location: "Nairobi, Kenya",
  about: [
    "I started in mining and mineral processing engineering — a BSc from JKUAT that taught me to reason about systems, constraints, and failure modes before writing a line of code. I've carried that discipline straight into software.",
    "Today I build fullstack products, mostly fintech and AI-driven tools aimed at real markets rather than demos. Under Imara Capital I'm building microloan and AI lending infrastructure for informal-sector traders in Kenya. Alongside that, I run Sam Creative Design School (SCDS), an online creative and technical training institution where I've also taught, and Sam Creative Graphics, a brand design agency.",
    "What I care about is shipping things people actually use: payments that clear, dashboards that hold up under real data, and interfaces that don't fall over on a mid-range Android phone on a patchy connection.",
  ],
  resumeUrl,
  social: {
    github: "https://github.com/Samkimiri",
    linkedin: "https://linkedin.com/in/samuel-ndung-u-kimiri-a85a41267",
    email: "samkimiri550307@gmail.com",
    // TODO: add a public phone number here if you want it shown, e.g. "+254 7XX XXX XXX"
    phone: undefined,
    whatsapp: "254743475247",
  },
};
