import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { profile } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled
          ? "border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <img
            src="/logo-icon.png"
            alt=""
            className="h-8 w-8 rounded-lg border border-slate-200 shadow-sm dark:border-slate-800"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              {profile.brandName}
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-amber-700 transition-colors group-hover:text-amber-600 dark:text-amber-400">
              {profile.brandTagline}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-400 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-amber-700 dark:hover:text-amber-400">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Link
            to="/resume"
            className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-amber-500"
          >
            Resume
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-b border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <ul className="flex flex-col gap-1 px-6 py-4 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-2 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/resume"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-slate-950"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
