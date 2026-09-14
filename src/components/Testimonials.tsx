import { Quote } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface TestimonialsProps {
  eyebrow?: string;
}

// Renders nothing until real testimonials exist — never fills the gap with
// placeholder or invented quotes.
export default function Testimonials({ eyebrow = "05 · Testimonials" }: TestimonialsProps) {
  const { testimonials } = useSiteData();

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="border-t border-slate-200 px-6 py-24 dark:border-slate-900">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title="What clients say" />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50">
                <Quote size={22} className="text-amber-600/40 dark:text-amber-400/40" />
                <p className="mt-4 flex-1 leading-relaxed text-slate-700 dark:text-slate-300">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{testimonial.author}</p>
                  {(testimonial.role || testimonial.organization) && (
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {[testimonial.role, testimonial.organization].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
