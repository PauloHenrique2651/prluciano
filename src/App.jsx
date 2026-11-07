import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
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
  const [introDone, setIntroDone] = useState(() => {
    try {
      return reduce || sessionStorage.getItem("ee-kickoff") === "1" || location.pathname !== "/";
    } catch {
      return true;
    }
  });

  useSmoothScroll(!reduce);

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
    try {
      sessionStorage.setItem("ee-kickoff", "1");
    } catch {}
    setIntroDone(true);
  };

  return (
    <MotionConfig reducedMotion="user">
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Page>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFloat ready={introDone} />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
