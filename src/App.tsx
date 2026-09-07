import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";
import { SiteDataProvider } from "./context/SiteDataContext";

function MainSite() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
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
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </SiteDataProvider>
  );
}
