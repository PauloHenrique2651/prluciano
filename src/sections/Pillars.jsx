import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useReducedMotion, blurIn, blurOut } from "../lib/device.js";
import { Barbell, SoccerBall, Strategy, Brain, UsersThree } from "@phosphor-icons/react";
import { PILLARS } from "../lib/site.js";
import { getLenis } from "../lib/scroll.js";
import { EASE } from "../components/ui.jsx";

const ICONS = { physical: Barbell, technical: SoccerBall, tactical: Strategy, psychological: Brain, human: UsersThree };

function DotIcon({ k }) {
  const I = ICONS[k];
  return <I size={18} weight="bold" aria-hidden="true" />;
}

function PitchLines({ progress }) {
  const draw = useTransform(progress, [0, 0.12], [0, 1]);
  const common = { fill: "none", stroke: "rgba(237,231,214,.5)", strokeWidth: 0.35, vectorEffect: "non-scaling-stroke", style: { pathLength: draw } };
  return (
    <svg className="pitch-lines" viewBox="0 0 80 68" preserveAspectRatio="none" aria-hidden="true">
      <g transform="matrix(0 1 1 0 0 0)">
      <motion.rect x="1" y="1" width="66" height="78" {...common} />
      <motion.path d="M1 1 H67" {...common} />
      <motion.circle cx="34" cy="1" r="9.15" {...common} />
      <motion.rect x="13.84" y="62.5" width="40.32" height="16.5" {...common} />
      <motion.rect x="24.84" y="73.5" width="18.32" height="5.5" {...common} />
      <motion.path d="M26.7 62.5 A9.15 9.15 0 0 1 41.3 62.5" {...common} />
      <motion.circle cx="34" cy="68" r="0.5" {...common} />
      </g>
    </svg>
  );
}

const N = PILLARS.length;
const at = (pos) => [pos[1], pos[0]];
const clamp01 = (v) => Math.min(1, Math.max(0, v));
// Pentagon around the pitch, in perimeter order, for the moment all five pillars connect.
const RING = ["physical", "technical", "psychological", "human", "tactical"].map((k) => PILLARS.find((p) => p.key === k)?.pos).filter(Boolean).map(at);

/** One pass between two pillars, drawn as the ball travels it. */
function PassLine({ from, to, k, flow }) {
  const len = useTransform(flow, (v) => clamp01(v - k));
  return (
    <motion.line
      x1={at(from)[0]} y1={at(from)[1]} x2={at(to)[0]} y2={at(to)[1]}
      stroke="#c9a04a" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke"
      style={{ pathLength: len }}
    />
  );
}

/** Tactics-board layer: a ball passed from pillar to pillar, the passes it leaves, and the shape they make together. */
function PassNetwork({ flow }) {
  const left = useTransform(flow, (v) => {
    const k = Math.min(N - 2, Math.floor(v));
    const t = clamp01(v - k);
    const a = at(PILLARS[k].pos), b = at(PILLARS[k + 1].pos);
    return `${a[0] + (b[0] - a[0]) * t}%`;
  });
  const top = useTransform(flow, (v) => {
    const k = Math.min(N - 2, Math.floor(v));
    const t = clamp01(v - k);
    // a slight lift mid-pass, like a ball in the air
    const lift = Math.sin(t * Math.PI) * 3.5;
    const a = at(PILLARS[k].pos), b = at(PILLARS[k + 1].pos);
    return `${a[1] + (b[1] - a[1]) * t - lift}%`;
  });
  const spin = useTransform(flow, (v) => v * 540);
  const ring = useTransform(flow, [N - 1.25, N - 1], [0, 1]);
  return (
    <>
      <svg className="pitch-passes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.polygon
          points={RING.map((p) => p.join(",")).join(" ")}
          fill="rgba(201,160,74,0.08)" stroke="#ecca7a" strokeWidth="1" strokeDasharray="4 5" vectorEffect="non-scaling-stroke"
          style={{ opacity: ring }}
        />
        {PILLARS.slice(0, -1).map((p, k) => (
          <PassLine key={p.key} from={p.pos} to={PILLARS[k + 1].pos} k={k} flow={flow} />
        ))}
      </svg>
      <motion.span className="pitch-ball" style={{ left, top }} aria-hidden="true">
        <motion.span style={{ rotate: spin, display: "grid" }}>
          <SoccerBall size={22} weight="fill" />
        </motion.span>
      </motion.span>
    </>
  );
}

export default function Pillars() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  // Continuous position along the five pillars (0 → 4), used to move the ball between them.
  const flow = useTransform(scrollYProgress, (p) => Math.min(N - 1, Math.max(0, ((p - 0.06) / 0.88) * N - 0.5)));

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
                  initial={reduce ? false : { opacity: 0, y: 26, ...blurIn(6) }}
                  animate={{ opacity: 1, y: 0, ...blurOut }}
                  exit={reduce ? undefined : { opacity: 0, y: -18, ...blurIn(4), transition: { duration: 0.25 } }}
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
            <div className="pitch-turf" aria-hidden="true" />
            <PitchLines progress={scrollYProgress} />
            <PassNetwork flow={flow} />
            {PILLARS.map((p, i) => {
              const on = i === active;
              const done = i < active;
              return (
                <button
                  key={p.key}
                  className="pitch-dot"
                  style={{ left: `${at(p.pos)[0]}%`, top: `${at(p.pos)[1]}%` }}
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
                      borderColor: on || done ? "#ecca7a" : "rgba(237,231,214,0.7)",
                      color: on || done ? "#06100b" : "#ede7d6",
                      scale: on ? 1.25 : 1,
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <DotIcon k={p.key} />
                  </motion.i>
                  <motion.span className="pitch-label" initial={false} animate={{ opacity: on ? 1 : 0.7, color: on ? "#ecca7a" : "#ede7d6" }}>
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
