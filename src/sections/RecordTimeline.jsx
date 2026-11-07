import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Trophy, Tent, SoccerBall, Flag, Buildings } from "@phosphor-icons/react";
import { RECORD_TIMELINE } from "../lib/pricing.js";
import { RevealLines, Reveal, ScrollIcon, Stagger } from "../components/ui.jsx";

const TAG_ICON = { School: GraduationCap, Tournament: Trophy, Camp: Tent, Clinic: Flag, League: SoccerBall, Academy: Buildings };

/** Sample record as a timeline, two years per stop. A gold line draws itself down the years as you scroll. */
export default function RecordTimeline() {
  const track = useRef(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 75%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const dotTop = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <section className="section day" id="sample-record" aria-label="Sample athlete profile">
      <div className="wrap">
        <p className="kicker">Sample athlete profile</p>
        <RevealLines as="h2" className="display d-l" lines={["What the record", "actually looks like."]} />
        <Reveal as="p" className="body" style={{ marginTop: 20 }}>
          The achievements of a Grade 5 athlete, two years at a time. The name, the school and the teacher are withheld: a minor's record is only published with written parental consent.
        </Reveal>

        <div className="rt-track" ref={track}>
          <svg className="rt-line" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(20,19,15,.16)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" />
            <motion.line x1="1" y1="0" x2="1" y2="100" stroke="#8a6a24" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: p }} />
          </svg>
          <motion.span className="rt-dot" style={{ top: dotTop }} aria-hidden="true" />

          <ol className="rt-list">
            {RECORD_TIMELINE.map((band) => (
              <li className="rt-band" key={band.years}>
                <Reveal className="rt-years" y={24}>
                  <span className="num">{band.years}</span>
                </Reveal>
                <Stagger as="ul" className="rt-items" gap={0.07}>
                  {band.items.map((it) => {
                    const Icon = TAG_ICON[it.tag] || Trophy;
                    return (
                      <Stagger.Item as="li" key={it.text} className="rt-item">
                        <ScrollIcon className="rt-icon" spin={120}>
                          <Icon size={22} weight="light" aria-hidden="true" />
                        </ScrollIcon>
                        <span>
                          <small>{it.tag}</small>
                          {it.text}
                        </span>
                      </Stagger.Item>
                    );
                  })}
                </Stagger>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
