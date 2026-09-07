import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useSiteData } from "../context/SiteDataContext";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";

export default function Hero() {
  const { profile } = useSiteData();
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24, filter: reduceMotion ? "none" : "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0.2 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 px-6">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 text-neutral-900/[0.04] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:text-white/[0.04]"
      />

      <motion.div
        className="relative mx-auto max-w-5xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={item} className="mb-4 font-medium text-emerald-600 dark:text-emerald-400">
          {profile.role}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-3xl text-4xl font-bold tracking-tight text-neutral-950 sm:text-6xl dark:text-neutral-50"
        >
          {profile.name}
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-emerald-400"
          >
            View Projects
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-500"
          >
            Contact Me
          </motion.a>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex items-center gap-5 text-neutral-500 dark:text-neutral-500">
          {profile.social.whatsapp && (
            <a
              href={`https://wa.me/${profile.social.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <WhatsappIcon size={20} />
            </a>
          )}
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href={`mailto:${profile.social.email}`}
            aria-label="Email"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
