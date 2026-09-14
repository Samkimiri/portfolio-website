import { Code2, Coins, Sparkles, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Code2,
    title: "Fullstack Web & Mobile Development",
    description:
      "End-to-end product builds — React and React Native/Expo on the front end, Node.js and Supabase on the back, shipped to real users rather than left as demos.",
  },
  {
    icon: Coins,
    title: "Fintech & Payments Integration",
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
    icon: ShieldCheck,
    title: "APIs, Webhooks & Security",
    description:
      "REST APIs, webhook signature verification, row-level security, and rate limiting — the infrastructure that keeps a product trustworthy under real traffic.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-slate-200 px-6 py-24 dark:border-slate-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="01 · Services"
            title="Services"
            description="Work spans fintech, education, and creative industries — including engagements with Imara Capital, Sam Creative Design School, and Sam Creative Graphics."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/40 hover:shadow-lg hover:shadow-amber-600/5 dark:border-slate-800 dark:bg-slate-900/50">
                <service.icon size={22} className="text-amber-700 dark:text-amber-400" />
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
