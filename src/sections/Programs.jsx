import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react";
import { PROGRAMS, waLink } from "../lib/site.js";
import { Img, RevealLines, SmartLink, ScrollIcon, Reveal } from "../components/ui.jsx";

/** Programs stack like cards dealt onto the table: each one pins, and the one beneath recedes. */
export default function Programs() {
  return (
    <section className="section" id="programs" aria-labelledby="programs-title" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="programs-head">
          <div>
            <p className="kicker">Our programs</p>
            <RevealLines as="h2" className="display d-l" lines={["Choose the program", "you want to start with."]} />
          </div>
          <Reveal as="p" className="body">
            Four ways in, and each starts the same way: you apply for the program you want, we read it, and we come back with what it involves and what it costs before anything is paid.
          </Reveal>
        </div>
        <ProgramStack />
      </div>
    </section>
  );
}

function ProgramStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="program-stack">
      {PROGRAMS.map((p, i) => (
        <Card key={p.key} p={p} i={i} total={PROGRAMS.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function Card({ p, i, total, progress }) {
  const slot = useRef(null);
  const start = i / total;
  const target = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, target]);
  const dim = useTransform(progress, [start + 1 / total, 1], [0, i === total - 1 ? 0 : 0.5]);
  const { scrollYProgress: enter } = useScroll({ target: slot, offset: ["start end", "start start"] });
  const imgScale = useTransform(enter, [0, 1], [1.25, 1]);

  return (
    <div ref={slot} className="program-slot">
      <motion.article className="program-card" style={{ scale, top: `${i * 14}px` }} aria-labelledby={`prog-${p.key}`}>
        <div className="program-copy">
          <div>
            <span className="program-index">
              {String(i + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
            </span>
            <h3 id={`prog-${p.key}`} className="display d-m" style={{ marginTop: 14 }}>
              {p.name}
            </h3>
            <p className="body">{p.text}</p>
            <p className="program-detail">
              <ScrollIcon spin={200}>
                <CheckCircle size={20} weight="fill" aria-hidden="true" />
              </ScrollIcon>
              {p.detail}
            </p>
          </div>
          <div className="btn-row">
            <SmartLink to={`/application-enrollment?program=${p.key === "recruitment" ? "athlete-recruitment" : p.key}`} className="btn btn-gold">
              Apply for this program
            </SmartLink>
            {p.href ? (
              <SmartLink to={p.href} className="text-link">
                See what's included
              </SmartLink>
            ) : (
              <a className="text-link" href={waLink(`Hello! I'd like to know more about the ${p.name} program.`)} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
                Ask about it
              </a>
            )}
          </div>
        </div>
        <div className="program-media">
          <motion.div style={{ scale: imgScale, height: "100%" }}>
            <Img name={p.img} alt="" sizes="(max-width: 860px) 92vw, 50vw" />
          </motion.div>
        </div>
        <motion.div style={{ position: "absolute", inset: 0, background: "#06100b", opacity: dim, pointerEvents: "none" }} aria-hidden="true" />
      </motion.article>
    </div>
  );
}
