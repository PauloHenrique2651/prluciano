import { useEffect } from "react";
import { motion } from "framer-motion";

/** Opening shot: the stadium lights switch on one bank at a time, then the 11 burns in. ~2.4s, skippable. */
const LIGHTS = [
  { left: "12%", delay: 0.25 },
  { left: "50%", delay: 0.55 },
  { left: "88%", delay: 0.85 },
];

export default function Kickoff({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    const skip = (e) => (e.key === "Escape" || e.key === "Enter" || e.key === " ") && onDone();
    window.addEventListener("keydown", skip);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
    };
  }, [onDone]);

  return (
    <motion.div
      className="kickoff"
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] } }}
      aria-hidden="true"
    >
      <div className="kickoff-lights">
        {LIGHTS.map((l, i) => (
          <motion.span
            key={i}
            className="kickoff-light"
            style={{ left: l.left }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.15, 1, 0.55, 1] }}
            transition={{ duration: 0.75, delay: l.delay, times: [0, 0.15, 0.3, 0.5, 0.7, 1] }}
          />
        ))}
      </div>
      <motion.span
        className="kickoff-eleven num"
        initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        11
      </motion.span>
      <motion.span
        className="kickoff-eleven num"
        style={{ position: "absolute", color: "var(--gold)", WebkitTextStroke: 0 }}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 0.9, delay: 1.45, ease: [0.83, 0, 0.17, 1] }}
      >
        11
      </motion.span>
      <button className="kickoff-skip" onClick={onDone} aria-hidden="false">
        Skip intro
      </button>
    </motion.div>
  );
}
