import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useReducedMotion } from "./lib/device.js";
import Lenis from "lenis";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import Kickoff from "./components/Kickoff.jsx";
import Home from "./pages/Home.jsx";
import Recruitment from "./pages/Recruitment.jsx";
import Sponsors from "./pages/Sponsors.jsx";
import Apply from "./pages/Apply.jsx";
import NotFound from "./pages/NotFound.jsx";
import Privacy from "./pages/Privacy.jsx";
import CookieConsent from "./components/CookieConsent.jsx";

import { getLenis, scrollToHash, scrollTop, setLenis } from "./lib/scroll.js";

function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
    setLenis(lenis);
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [enabled]);
}

function Curtain() {
  return (
    <>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1], delay: 0.05 }}
        style={{ transformOrigin: "top" }}
        aria-hidden="true"
      />
    </>
  );
}

function Page({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0, transition: { duration: 0.35 } }}
    >
      {!reduce && <Curtain />}
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const reduce = useReducedMotion();
  // The opening plays on every fresh load of the home page (desktop and mobile alike).
  // Navigating between pages inside the site doesn't replay it: this only runs once per load.
  const [introDone, setIntroDone] = useState(() => {
    const play = location.pathname === "/" && !location.hash;
    if (play) {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    return !play;
  });

  useSmoothScroll(true);

  useEffect(() => {
    document.documentElement.style.overflow = introDone ? "" : "hidden";
    const lenis = getLenis();
    if (lenis) introDone ? lenis.start() : lenis.stop();
  }, [introDone]);

  // Route change: scroll to hash or top, and move focus to main for screen readers.
  useEffect(() => {
    const t = setTimeout(() => {
      if (location.hash) {
        if (!scrollToHash(location.hash, true)) window.scrollTo(0, 0);
      } else {
        scrollTop();
      }
      document.getElementById("main")?.focus({ preventScroll: true });
    }, 360);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  const finishIntro = () => {
    setIntroDone(true);
  };

  return (
    <MotionConfig reducedMotion="never">
      <a className="skip-link" href="#main">Skip to content</a>
      <AnimatePresence>{!introDone && <Kickoff onDone={finishIntro} />}</AnimatePresence>
      <Nav />
      <main id="main" tabIndex={-1} style={{ outline: "none" }}>
        <AnimatePresence mode="wait">
          <Page key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home introDone={introDone} />} />
              <Route path="/athlete-recruitment" element={<Recruitment />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/application-enrollment" element={<Apply />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Page>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat ready={introDone} />
      <CookieConsent ready={introDone} />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
