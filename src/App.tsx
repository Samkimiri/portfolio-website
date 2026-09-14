import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";
import Resume from "./components/Resume";
import Portfolio from "./components/Portfolio";
import NotFound from "./components/NotFound";
import { SiteDataProvider } from "./context/SiteDataContext";
import { trackPageView } from "./lib/trackView";

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
        <Experience eyebrow="04 · Experience" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </SiteDataProvider>
  );
}
