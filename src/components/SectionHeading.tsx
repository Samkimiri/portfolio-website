interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <>
      <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-bold text-slate-950 sm:text-3xl dark:text-slate-50">{title}</h2>
      {description && <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>}
    </>
  );
}
