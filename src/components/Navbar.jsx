import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur border-b border-neutral-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight text-neutral-100">
          {profile.name}
        </a>
        <ul className="flex items-center gap-6 text-sm text-neutral-400">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-neutral-100 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
