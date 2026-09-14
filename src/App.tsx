import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { SiteDataProvider } from "./context/SiteDataContext";
import { trackPageView } from "./lib/trackView";

// Routes most visitors never touch (admin tooling, the personal
// portfolio/resume) are code-split out of the main bundle so a first-time
// visitor to "/" only downloads what the home page actually needs.
const AdminApp = lazy(() => import("./admin/AdminApp"));
const Resume = lazy(() => import("./components/Resume"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const NotFound = lazy(() => import("./components/NotFound"));
const Privacy = lazy(() => import("./components/Privacy"));
const Terms = lazy(() => import("./components/Terms"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-sm text-slate-400 dark:bg-slate-950 dark:text-slate-600">
      Loading…
    </div>
  );
}

function MainSite() {
  useEffect(() => {
    trackPageView("/");
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects eyebrow="03 · Projects" />
        <Contact eyebrow="04 · Contact" />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Analytics />
    </SiteDataProvider>
  );
}
