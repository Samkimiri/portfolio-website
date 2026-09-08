interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <>
      <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-bold text-neutral-950 sm:text-3xl dark:text-neutral-50">{title}</h2>
      {description && <p className="mt-2 text-neutral-600 dark:text-neutral-400">{description}</p>}
    </>
  );
}
