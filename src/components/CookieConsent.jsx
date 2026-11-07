import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "@phosphor-icons/react";
import { CATEGORIES, readConsent, saveConsent } from "../lib/consent.js";
import { SmartLink, EASE } from "./ui.jsx";

/**
 * First visit: a compact bar with three equal choices (accept, reject, customize).
 * "Customize" and the footer link open a panel with one switch per category.
 */
export default function CookieConsent({ ready }) {
  const [stage, setStage] = useState("hidden"); // hidden | bar | panel
  const [choices, setChoices] = useState({ analytics: false, marketing: false });
  const panelRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const saved = readConsent();
    if (saved) setChoices({ analytics: saved.analytics, marketing: saved.marketing });
    else {
      const t = setTimeout(() => setStage("bar"), 1200);
      return () => clearTimeout(t);
    }
  }, [ready]);

  useEffect(() => {
    const open = () => {
      const saved = readConsent();
      if (saved) setChoices({ analytics: saved.analytics, marketing: saved.marketing });
      setStage("panel");
    };
    window.addEventListener("ee-open-cookies", open);
    return () => window.removeEventListener("ee-open-cookies", open);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("cookie-open", stage !== "hidden");
    if (stage !== "panel") return;
    panelRef.current?.querySelector("button, input")?.focus();
    const onKey = (e) => e.key === "Escape" && setStage(readConsent() ? "hidden" : "bar");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage]);

  const decide = (c) => {
    saveConsent(c);
    setChoices({ analytics: !!c.analytics, marketing: !!c.marketing });
    setStage("hidden");
  };

  return (
    <AnimatePresence>
      {stage === "bar" && (
        <motion.section
          key="bar"
          className="cookie-bar"
          role="region"
          aria-label="Cookie consent"
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "120%", opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="cookie-bar-text">
            <Cookie size={26} weight="duotone" aria-hidden="true" className="cookie-icon" />
            <p>
              We use essential storage to run this site. With your permission we'd also use analytics and marketing cookies.{" "}
              <SmartLink to="/privacy" className="text-link">Privacy &amp; cookies</SmartLink>
            </p>
          </div>
          <div className="cookie-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => decide({ analytics: false, marketing: false })}>
              Reject
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setStage("panel")}>
              Customize
            </button>
            <button className="btn btn-gold btn-sm" onClick={() => decide({ analytics: true, marketing: true })}>
              Accept all
            </button>
          </div>
        </motion.section>
      )}

      {stage === "panel" && (
        <motion.div
          key="panel"
          className="cookie-scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && setStage(readConsent() ? "hidden" : "bar")}
        >
          <motion.div
            ref={panelRef}
            className="cookie-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button className="cookie-close" onClick={() => setStage(readConsent() ? "hidden" : "bar")} aria-label="Close cookie settings">
              <X size={20} weight="bold" />
            </button>
            <h2 id="cookie-title" className="display d-s">Cookie settings</h2>
            <p className="micro" style={{ marginTop: 8 }}>
              Choose what this site may store on your device. You can change this at any time from the footer.
            </p>
            <ul className="cookie-list">
              {CATEGORIES.map((c) => {
                const on = c.locked || choices[c.key];
                return (
                  <li key={c.key} className="cookie-row">
                    <div>
                      <b>{c.name}</b>
                      <p>{c.text}</p>
                    </div>
                    <label className={`switch ${c.locked ? "is-locked" : ""}`}>
                      <input
                        type="checkbox"
                        role="switch"
                        checked={on}
                        disabled={c.locked}
                        aria-label={`${c.name} cookies`}
                        onChange={(e) => setChoices((s) => ({ ...s, [c.key]: e.target.checked }))}
                      />
                      <span aria-hidden="true" />
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="cookie-actions cookie-actions-panel">
              <button className="btn btn-ghost btn-sm" onClick={() => decide({ analytics: false, marketing: false })}>
                Reject all
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => decide(choices)}>
                Save choices
              </button>
              <button className="btn btn-gold btn-sm" onClick={() => decide({ analytics: true, marketing: true })}>
                Accept all
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
