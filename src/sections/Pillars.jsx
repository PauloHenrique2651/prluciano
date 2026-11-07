import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Barbell, SoccerBall, Strategy, Brain, UsersThree } from "@phosphor-icons/react";
import { PILLARS } from "../lib/site.js";
import { getLenis } from "../lib/scroll.js";
import { EASE } from "../components/ui.jsx";

const ICONS = { physical: Barbell, technical: SoccerBall, tactical: Strategy, psychological: Brain, human: UsersThree };

function PitchLines({ progress }) {
  const draw = useTransform(progress, [0, 0.12], [0, 1]);
  const common = { fill: "none", stroke: "rgba(237,231,214,.38)", strokeWidth: 0.35, vectorEffect: "non-scaling-stroke", style: { pathLength: draw } };
  return (
    <svg className="pitch-lines" viewBox="0 0 68 80" preserveAspectRatio="none" aria-hidden="true">
      <motion.rect x="1" y="1" width="66" height="78" {...common} />
      <motion.path d="M1 1 H67" {...common} />
      <motion.circle cx="34" cy="1" r="9.15" {...common} />
      <motion.rect x="13.84" y="62.5" width="40.32" height="16.5" {...common} />
      <motion.rect x="24.84" y="73.5" width="18.32" height="5.5" {...common} />
      <motion.path d="M26.7 62.5 A9.15 9.15 0 0 1 41.3 62.5" {...common} />
      <motion.circle cx="34" cy="68" r="0.5" {...common} />
    </svg>
  );
}

export default function Pillars() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(PILLARS.length - 1, Math.max(0, Math.floor(((p - 0.06) / 0.88) * PILLARS.length)));
    setActive(i);
  });

  const jumpTo = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const y = top + range * (0.06 + ((i + 0.5) / PILLARS.length) * 0.88);
    const lenis = getLenis();
    lenis ? lenis.scrollTo(y, { duration: 1 }) : window.scrollTo({ top: y, behavior: "smooth" });
  };

  const P = PILLARS[active];
  const Icon = ICONS[P.key];

  return (
    <section ref={ref} className="pillars" id="five-pillars" aria-labelledby="pillars-title">
      <div className="pillars-sticky">
        <div className="wrap pillars-grid">
          <div className="pillars-head">
            <p className="kicker">Our development model</p>
            <h2 id="pillars-title" className="display d-l">Five pillars. One complete athlete.</h2>
            <p className="body">
              Every athlete develops across the same five foundations, trained together rather than in isolation. A player who is strong in one and weak in another eventually stalls at the next level.
            </p>

            <div className="pillar-stage" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={P.key}
                  className="pillar-card"
                  initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -18, filter: "blur(4px)", transition: { duration: 0.25 } }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <h3 className="display d-m pillar-name">
                    <Icon size={34} weight="light" aria-hidden="true" />
                    {P.name}
                  </h3>
                  <p>{P.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pillar-progress" role="tablist" aria-label="Pillars">
              {PILLARS.map((p, i) => (
                <button key={p.key} role="tab" aria-selected={i === active} aria-label={p.name} onClick={() => jumpTo(i)}>
                  <i>
                    <motion.b initial={false} animate={{ scaleX: i <= active ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} />
                  </i>
                </button>
              ))}
            </div>
          </div>

          <div className="pitch">
            <PitchLines progress={scrollYProgress} />
            {PILLARS.map((p, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <button
                  key={p.key}
                  className="pitch-dot"
                  style={{ left: `${p.pos[0]}%`, top: `${p.pos[1]}%` }}
                  onClick={() => jumpTo(i)}
                  aria-label={`Show the ${p.name} pillar`}
                  tabIndex={-1}
                >
                  <motion.span
                    className="glow"
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  <motion.i
                    initial={false}
                    animate={{
                      backgroundColor: on || done ? "#c9a04a" : "#06100b",
                      borderColor: on || done ? "#ecca7a" : "#ede7d6",
                      scale: on ? 1.35 : 1,
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                  <motion.span initial={false} animate={{ opacity: on ? 1 : 0.55, color: on ? "#ecca7a" : "#ede7d6" }}>
                    {p.name}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
