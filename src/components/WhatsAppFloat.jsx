import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsappLogo, X } from "@phosphor-icons/react";
import { waLink } from "../lib/site.js";

const BUBBLE_KEY = "ee-wa-bubble";

export default function WhatsAppFloat({ ready }) {
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    if (!ready) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(BUBBLE_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setBubble(true), 7000);
    return () => clearTimeout(t);
  }, [ready]);

  const close = () => {
    setBubble(false);
    try {
      sessionStorage.setItem(BUBBLE_KEY, "1");
    } catch {}
  };

  const href = waLink(
    "Hello! I'd like to talk about my athlete and which Eternal Eleven program fits. Could you help?"
  );

  return (
    <AnimatePresence>
      {ready && (
        <motion.div
          className="wa-float"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                className="wa-bubble"
                role="status"
                initial={{ opacity: 0, x: 16, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <a href={href} target="_blank" rel="noopener noreferrer" onClick={close}>
                  <b>Questions about your athlete?</b>
                  Our team answers on WhatsApp.
                </a>
                <button className="wa-bubble-close" onClick={close} aria-label="Dismiss message">
                  <X size={16} weight="bold" aria-hidden="true" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <a className="wa-btn" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with Eternal Eleven on WhatsApp" onClick={close}>
            <WhatsappLogo size={34} weight="fill" aria-hidden="true" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
