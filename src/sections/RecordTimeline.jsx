import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Trophy, Tent, SoccerBall, Flag, Buildings, SortDescending, ListNumbers } from "@phosphor-icons/react";
import { RECORD_TIMELINE, JOSE_GRADES } from "../lib/pricing.js";
import { Img, RevealLines, Reveal, ScrollIcon, Stagger, CountUp, EASE } from "../components/ui.jsx";

const TAG_ICON = { School: GraduationCap, Tournament: Trophy, Camp: Tent, Clinic: Flag, League: SoccerBall, Academy: Buildings };

const FILTERS = [
  { key: "all", label: "Everything", tags: null },
  { key: "school", label: "School", tags: ["School"] },
  { key: "football", label: "Leagues & academy", tags: ["League", "Academy"] },
  { key: "camps", label: "Camps & clinics", tags: ["Camp", "Clinic"] },
  { key: "tournaments", label: "Tournaments", tags: ["Tournament"] },
];

const SCALE_MIN = 80; // bars run from 80 to 100 so the differences between subjects are visible

/** José Armando's profile: the numbers, an interactive report card and a filterable record. */
export default function RecordTimeline() {
  return (
    <section className="section day" id="sample-record" aria-label="Athlete profile: José Armando Rodríguez Chacón">
      <div className="wrap">
        <div className="rt-head">
          <div>
            <p className="kicker">Sample athlete profile</p>
            <RevealLines as="h2" className="display d-l" lines={["What the record", "actually looks like."]} />
            <Reveal as="p" className="body" style={{ marginTop: 20 }}>
              José Armando Rodríguez Chacón is in Grade 5, in the 2025–2026 school year. This is the record we keep for him: grades, conduct, football and every camp and tournament, the way a college coach will read it.
            </Reveal>
          </div>
          <Reveal className="rt-photo" delay={0.1}>
            <Img
              name="record-academic"
              alt="José Armando Rodríguez Chacón, student-athlete, Grade 5, 2025–2026 school year"
              sizes="(max-width: 860px) 92vw, 44vw"
              width={1264}
              height={843}
            />
          </Reveal>
        </div>

        <Stagger className="jf-facts" gap={0.08}>
          <Stagger.Item className="jf-fact jf-fact-lead">
            <span className="num"><CountUp from={0} to={97} duration={1.4} /><small>/100</small></span>
            <span>Average across twelve subjects, 2025–2026</span>
          </Stagger.Item>
          <Stagger.Item className="jf-fact">
            <span className="num">0</span>
            <span>Absences all year</span>
          </Stagger.Item>
          <Stagger.Item className="jf-fact">
            <span className="num">0</span>
            <span>Tardies all year</span>
          </Stagger.Item>
          <Stagger.Item className="jf-fact">
            <span className="jf-word">Outstanding</span>
            <span>Conduct record</span>
          </Stagger.Item>
          <Stagger.Item className="jf-fact">
            <span className="num"><CountUp from={2000} to={2019} duration={1.4} /></span>
            <span>In a youth academy and his school team since</span>
          </Stagger.Item>
          <Stagger.Item className="jf-fact">
            <span className="num"><CountUp from={0} to={5} duration={1} /></span>
            <span>Camps and clinics, from Barcelona to Honduras</span>
          </Stagger.Item>
        </Stagger>

        <ReportCard />
        <Journey />
      </div>
    </section>
  );
}

/** Twelve subjects as bars that grow into place. Tap or hover a subject to read it; sort by grade or school order. */
function ReportCard() {
  const [sorted, setSorted] = useState(false);
  const [active, setActive] = useState(null);
  const rows = useMemo(
    () => (sorted ? [...JOSE_GRADES].sort((a, b) => b.grade - a.grade) : JOSE_GRADES),
    [sorted]
  );
  const shown = active ? JOSE_GRADES.find((g) => g.subject === active) : null;
  const avgPos = ((97 - SCALE_MIN) / (100 - SCALE_MIN)) * 100;

  return (
    <div className="jf-card">
      <div className="jf-card-head">
        <div>
          <h3 className="display d-s">Report card, 2025–2026</h3>
          <p className="jf-readout" aria-live="polite">
            {shown ? (
              <>
                <b>{shown.subject}</b> <span className="num">{shown.grade}</span>
              </>
            ) : (
              "Tap or hover a subject to read its grade."
            )}
          </p>
        </div>
        <button type="button" className="jf-sort" onClick={() => setSorted((s) => !s)} aria-pressed={sorted}>
          {sorted ? <ListNumbers size={18} weight="bold" aria-hidden="true" /> : <SortDescending size={18} weight="bold" aria-hidden="true" />}
          {sorted ? "School order" : "Sort by grade"}
        </button>
      </div>

      <div className="jf-bars" onMouseLeave={() => setActive(null)}>
        <span className="jf-avg" style={{ left: `calc(var(--label-w) + (100% - var(--label-w)) * ${avgPos / 100})` }} aria-hidden="true">
          <i>Average 97</i>
        </span>
        <ul>
          {rows.map((g, i) => {
            const w = ((g.grade - SCALE_MIN) / (100 - SCALE_MIN)) * 100;
            const on = active === g.subject;
            return (
              <motion.li key={g.subject} layout transition={{ layout: { duration: 0.55, ease: EASE } }}>
                <button
                  type="button"
                  className={`jf-bar ${on ? "is-on" : ""} ${g.grade === 100 ? "is-top" : ""}`}
                  onMouseEnter={() => setActive(g.subject)}
                  onFocus={() => setActive(g.subject)}
                  onClick={() => setActive(on ? null : g.subject)}
                  aria-label={`${g.subject}: ${g.grade} out of 100`}
                >
                  <span className="jf-subject">{g.subject}</span>
                  <span className="jf-track">
                    <motion.span
                      className="jf-fill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: w / 100 }}
                      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.05 }}
                    />
                    <span className="jf-grade num">{g.grade}</span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
        <p className="jf-scale" aria-hidden="true">
          <span>{SCALE_MIN}</span>
          <span>100</span>
        </p>
      </div>
    </div>
  );
}

/** The football and school record, two years per stop, filterable by kind. A gold line draws down the years. */
function Journey() {
  const [filter, setFilter] = useState("all");
  const track = useRef(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 75%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const dotTop = useTransform(p, [0, 1], ["0%", "100%"]);

  const tags = FILTERS.find((f) => f.key === filter).tags;
  const bands = RECORD_TIMELINE.map((b) => ({ ...b, items: tags ? b.items.filter((it) => tags.includes(it.tag)) : b.items })).filter(
    (b) => b.items.length
  );
  const count = (f) => RECORD_TIMELINE.reduce((n, b) => n + b.items.filter((it) => !f.tags || f.tags.includes(it.tag)).length, 0);

  return (
    <div className="jf-journey">
      <div className="jf-journey-head">
        <h3 className="display d-s">Two years at a time</h3>
        <div className="jf-filters" role="group" aria-label="Show part of the record">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`jf-chip ${filter === f.key ? "is-on" : ""}`}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {filter === f.key && <motion.span layoutId="jf-chip-bg" className="jf-chip-bg" transition={{ duration: 0.4, ease: EASE }} />}
              <span className="jf-chip-text">
                {f.label} <small>{count(f)}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rt-track" ref={track}>
        <svg className="rt-line" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(20,19,15,.16)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6 8" />
          <motion.line x1="1" y1="0" x2="1" y2="100" stroke="#8a6a24" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: p }} />
        </svg>
        <motion.span className="rt-dot" style={{ top: dotTop }} aria-hidden="true" />

        <motion.ol className="rt-list" layout>
          <AnimatePresence initial={false} mode="popLayout">
            {bands.map((band) => (
              <motion.li
                className="rt-band"
                key={band.years}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Reveal className="rt-years" y={24}>
                  <span className="num">{band.years}</span>
                </Reveal>
                <ul className="rt-items">
                  <AnimatePresence initial={false} mode="popLayout">
                    {band.items.map((it) => {
                      const Icon = TAG_ICON[it.tag] || Trophy;
                      return (
                        <motion.li
                          key={it.text}
                          className="rt-item"
                          layout
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                          transition={{ duration: 0.4, ease: EASE }}
                        >
                          <ScrollIcon className="rt-icon" spin={120}>
                            <Icon size={22} weight="light" aria-hidden="true" />
                          </ScrollIcon>
                          <span>
                            <small>{it.tag}</small>
                            {it.text}
                          </span>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ol>
      </div>
    </div>
  );
}
