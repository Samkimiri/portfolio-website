import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Link as LinkIcon, Mail } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useSiteData } from "../context/SiteDataContext";
import { trackPageView } from "../lib/trackView";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Footer from "./Footer";

// A standalone, personal-voice portfolio — separate from the Stackfen
// company home page, meant to be shared directly (e.g. with a specific
// client or employer) without the surrounding company framing.
//
// This page also carries a bit more animation polish (smooth scroll,
// scroll-linked parallax) than the home page, deliberately — the company
// site stays conservative for a client evaluating trust; this page is more
// of a personal showcase, so a livelier feel is a better fit. Lenis is only
// ever imported here (Portfolio is already a separately-loaded route), so
// none of this adds weight to the home page.
export default function Portfolio() {
  const { profile } = useSiteData();
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const introRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  });
  const introY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const introOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  useEffect(() => {
    trackPageView("/portfolio");
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({ duration: 1.1 });
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduceMotion]);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/portfolio");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (older browsers, insecure context);
      // the URL is still visible in the address bar either way.
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <header className="border-b border-slate-200 px-6 py-4 dark:border-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            <ArrowLeft size={16} />
            Back to Stackfen
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-amber-600/50 hover:text-amber-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-400/50 dark:hover:text-amber-400"
            >
              {copied ? <Check size={14} /> : <LinkIcon size={14} />}
              {copied ? "Link copied" : "Copy link to share"}
            </button>
            <Link
              to="/resume"
              className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-amber-600/50 hover:text-amber-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-400/50 dark:hover:text-amber-400"
            >
              View Resume
            </Link>
          </div>
        </div>
      </header>

      <section ref={introRef} className="px-6 pt-16 pb-8">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-center"
          style={reduceMotion ? undefined : { y: introY, opacity: introOpacity }}
        >
          <img
            src="/founder-photo.webp"
            alt={profile.name}
            className="h-28 w-28 shrink-0 rounded-2xl border border-slate-200 object-cover shadow-lg sm:h-36 sm:w-36 dark:border-slate-800"
          />

          <div>
            <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              Portfolio
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-50">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{profile.role}</p>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">{profile.tagline}</p>

            <div className="mt-6 flex items-center gap-5 text-slate-500 dark:text-slate-500">
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
            </div>
          </div>
        </motion.div>
      </section>

      <About variant="personal" eyebrow="01 · About" />
      <Skills eyebrow="02 · Skills" />
      <Projects eyebrow="03 · Projects" />
      <Experience eyebrow="04 · Experience" />
      <Footer />
    </div>
  );
}
