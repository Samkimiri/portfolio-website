import { Coins, Database, GitBranch, Globe, ShieldCheck, Smartphone, Sparkles, Webhook } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "Fullstack web apps built end-to-end — React on the front end, Node.js and PostgreSQL/Supabase on the back — shipped to real users, not left as demos.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native-feel apps with React Native and Expo, including offline-first architecture for real-world conditions like weak signal or limited data.",
  },
  {
    icon: Coins,
    title: "Fintech & Payments Engineering",
    description:
      "M-Pesa integration, payment tracking, and financial dashboards built for real transaction volume and audit requirements, not just a sandbox flow.",
  },
  {
    icon: Sparkles,
    title: "AI & LLM Integration",
    description:
      "Multi-agent AI systems and third-party model integration — wiring AI capability into a product without it feeling bolted on.",
  },
  {
    icon: Webhook,
    title: "API & Third-Party Integrations",
    description:
      "REST APIs, webhook handling, and third-party service integration — the connective tissue that lets a product talk to the rest of the world reliably.",
  },
  {
    icon: Database,
    title: "Database & Backend Architecture",
    description:
      "Relational schema design, row-level security, and backend infrastructure built to hold up under real data, not just pass a demo.",
  },
  {
    icon: ShieldCheck,
    title: "Security Hardening",
    description:
      "Webhook signature verification, rate limiting, and security headers — the guardrails that keep a product trustworthy under real traffic.",
  },
  {
    icon: GitBranch,
    title: "DevOps & Deployment Automation",
    description: "CI/CD pipelines and automated deployment workflows, so shipping a change is routine, not risky.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-slate-200 px-6 py-24 dark:border-slate-900">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="01 · Services"
            title="Services"
            description="Work spans fintech, education, and creative industries — including engagements with Imara Capital, Sam Creative Design School, and Sam Creative Graphics."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40 hover:shadow-lg hover:shadow-amber-600/5 dark:border-slate-800 dark:bg-slate-900/50">
                <span className="absolute right-5 top-5 font-display text-xs font-semibold text-slate-300 dark:text-slate-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="inline-flex rounded-xl bg-amber-500/10 p-2.5">
                  <service.icon size={20} className="text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-slate-950 dark:text-slate-50">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
