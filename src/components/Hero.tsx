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
    <section id="top" className="relative overflow-hidden pt-40 pb-28 px-6">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 text-slate-900/[0.04] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:text-white/[0.04]"
      />

      {/* Ambient gradient orbs — pure CSS/decorative, respects reduced motion */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-amber-600/20 blur-[110px] dark:bg-amber-600/15"
        animate={reduceMotion ? undefined : { y: [0, 24, 0], x: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-40 left-[-8%] h-[360px] w-[360px] rounded-full bg-amber-500/15 blur-[100px] dark:bg-amber-500/10"
        animate={reduceMotion ? undefined : { y: [0, -20, 0], x: [0, 14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative mx-auto max-w-5xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-slate-600 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
        >
          <span className="relative flex h-2 w-2">
            {!reduceMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-600" />
          </span>
          {profile.location}
        </motion.div>

        <motion.p variants={item} className="mb-4 font-medium text-amber-700 dark:text-amber-400">
          {profile.brandTagline}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-3xl bg-gradient-to-br from-slate-950 to-slate-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl dark:from-slate-50 dark:to-slate-400"
        >
          {profile.brandName}
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-400">
          {profile.tagline}
        </motion.p>

        <motion.p variants={item} className="mt-3 text-sm text-slate-500 dark:text-slate-500">
          Founded by <span className="font-medium text-slate-700 dark:text-slate-300">{profile.name}</span>
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-amber-600/25 transition-colors hover:bg-amber-500 hover:shadow-amber-600/40"
          >
            View Projects
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-amber-600/50 hover:text-amber-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-amber-400/50 dark:hover:text-amber-400"
          >
            Contact Me
          </motion.a>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex items-center gap-5 text-slate-500 dark:text-slate-500">
          {profile.social.whatsapp && (
            <a
              href={`https://wa.me/${profile.social.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
            >
              <WhatsappIcon size={20} />
            </a>
          )}
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href={`mailto:${profile.social.email}`}
            aria-label="Email"
            className="transition-colors hover:text-slate-900 dark:hover:text-slate-100"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
