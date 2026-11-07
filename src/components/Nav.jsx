import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import { NAV, PHONE_DISPLAY, WA_DEFAULT } from "../lib/site.js";
import { SmartLink, EASE } from "./ui.jsx";

export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="wordmark-mark" aria-hidden="true">11</span>
      <span className="wordmark-text">
        <b>ETERNAL ELEVEN</b>
        <small>AGENCY</small>
      </span>
    </span>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const progress = useTransform(useScroll().scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24));
  useEffect(() => setSolid(window.scrollY > 24), [location.pathname]);
  // Home: the header waits off-screen over the hero and slides in once scrolling starts, then stays fixed.
  const hidden = location.pathname === "/" && !solid && !open;

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const isActive = (to) => !to.includes("#") && location.pathname === to;

  return (
    <>
      <header className={`nav ${solid || open ? "is-solid" : ""} ${hidden ? "is-hidden" : ""}`}>
        <motion.span className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
        <div className="wrap nav-inner">
          <SmartLink to="/" aria-label="Eternal Eleven Agency, home">
            <Wordmark />
          </SmartLink>
          <nav className="nav-links" aria-label="Main">
            {NAV.map((n) => (
              <SmartLink key={n.to} to={n.to} className="nav-link" aria-current={isActive(n.to) ? "page" : undefined}>
                {n.label}
              </SmartLink>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="btn btn-ghost btn-sm" href={WA_DEFAULT} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              WhatsApp
            </a>
            <SmartLink to="/application-enrollment" className="btn btn-gold btn-sm">
              Apply now
            </SmartLink>
            <button
              className="menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, ease: [0.83, 0, 0.17, 1] } }}
            transition={{ duration: 0.65, ease: [0.83, 0, 0.17, 1] }}
          >
            <nav className="menu-links" aria-label="Menu">
              {[{ label: "Home", to: "/" }, ...NAV].map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.18 + i * 0.05 }}
                >
                  <SmartLink to={n.to} className="menu-link" onClick={() => setOpen(false)}>
                    {n.label}
                  </SmartLink>
                </motion.div>
              ))}
            </nav>
            <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <SmartLink to="/application-enrollment" className="btn btn-gold btn-lg" onClick={() => setOpen(false)}>
                Start your application
              </SmartLink>
              <a className="btn btn-wa btn-lg" href={WA_DEFAULT} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
