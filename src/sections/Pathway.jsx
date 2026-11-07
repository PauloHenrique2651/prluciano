import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Img, RevealLines } from "../components/ui.jsx";

/** The pathway is a real sequence, so the stages are numbered. A chalk line draws itself as you scroll and the ball travels it. */
const STAGES = [
  {
    title: "Develop the whole player",
    text: "Private and small-group sessions across the five pillars, with position-specific work for defenders, midfielders and strikers, led by Luciano Emilio.",
    img: "drills",
    alt: "Young players running an agility drill under evening lights while a coach instructs",
  },
  {
    title: "Get seen in the United States",
    text: "The International Week brings daily training, a tournament, tactical sessions and sports psychology to the US. Editions have included Washington, D.C., New York and Miami.",
    img: "stadium-kick",
    alt: "A player strikes the ball in a floodlit stadium",
  },
  {
    title: "Build the record coaches read",
    text: "An academic and athletic résumé, a hosted profile and a highlight reel, kept current month by month. Universities do not recruit what they cannot see.",
    img: "study-desk",
    alt: "A student-athlete studying at a desk with football boots beside him",
  },
  {
    title: "Step up to the next level",
    text: "Through the partnership with Dictionary Academy, players have advanced to D.C. United Academy, and some have gone on to first-team debuts in MLS. Others take the college soccer route with their academic record intact.",
    img: "dc-united",
    alt: "Luciano Emilio with two young players and a coach in D.C. United training gear",
  },
];

export default function Pathway() {
  const track = useRef(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 70%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const ballTop = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <section className="section" id="pathway" aria-labelledby="pathway-title">
      <div className="wrap">
        <div className="pathway-head">
          <p className="kicker">The pathway</p>
          <RevealLines as="h2" className="display d-l" lines={["From youth development", "to professional opportunity."]} />
          <p className="lede" id="pathway-title-desc" style={{ marginTop: 24 }}>
            Every athlete moves along the same line. Where they step off depends on their talent, their grades and the work they put in.
          </p>
        </div>

        <div className="pathway-track" ref={track}>
          <svg className="pathway-svg" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(237,231,214,.14)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" />
            <motion.line
              x1="1" y1="0" x2="1" y2="100"
              stroke="#ecca7a" strokeWidth="2" vectorEffect="non-scaling-stroke"
              style={{ pathLength: p }}
            />
          </svg>
          <motion.span className="pathway-ball" style={{ top: ballTop }} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7.2l3.6 2.6-1.4 4.3H9.8L8.4 9.8z" /></svg>
          </motion.span>

          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {STAGES.map((s, i) => (
              <Stage key={s.title} s={s} i={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Stage({ s, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 40%"] });
  const o = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  return (
    <li ref={ref} className="stage">
      <motion.span className="stage-marker" style={{ opacity: o }}>
        <span className="num">{i + 1}</span>
      </motion.span>
      <motion.div className="stage-body" style={{ opacity: o }}>
        <div>
          <h3 className="display d-m">{s.title}</h3>
          <p className="body">{s.text}</p>
        </div>
        <motion.div className="stage-media" style={{ clipPath: clip }}>
          <motion.div style={{ scale: imgScale, height: "100%" }}>
            <Img name={s.img} alt={s.alt} sizes="(max-width: 860px) 90vw, 40vw" />
          </motion.div>
        </motion.div>
      </motion.div>
    </li>
  );
}
