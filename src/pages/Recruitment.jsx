import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Globe, FilmSlate, GraduationCap, ArrowsClockwise, MagnifyingGlassPlus, X, WhatsappLogo } from "@phosphor-icons/react";
import { Img, RevealLines, SmartLink, useSeo, EASE, ScrollIcon } from "../components/ui.jsx";
import { PHONE_DISPLAY, waLink } from "../lib/site.js";

const DELIVERABLES = [
  { icon: FileText, name: "Professional academic & athletic résumé", text: "Grades, transcripts, playing history, positions, teams, tournaments and achievements organised into one document a university or a coach can read in minutes." },
  { icon: Globe, name: "Digital athlete profile hosting", text: "A hosted profile that gathers the academic record, the football history and the video into a single link, ready to send to a coach or an admissions office." },
  { icon: FilmSlate, name: "Professional highlight video editing", text: "Your footage cut into a short, professional reel built around what college coaches actually watch: first touch, decisions under pressure and movement off the ball." },
  { icon: GraduationCap, name: "College recruitment guidance", text: "Guidance through the process itself: which programs fit the athlete's level and grades, how and when to approach coaches, and what a realistic timeline looks like." },
  { icon: ArrowsClockwise, name: "Monthly profile management", text: "Résumé, statistics and highlights updated as the season progresses, so the profile a coach opens is never a year out of date." },
];

const RECORD = [
  { img: "record-academic", name: "Academic record", text: "Twelve subjects graded, with a 97 out of 100 average in the 2025–2026 school year." },
  { img: "record-attendance", name: "Attendance and conduct", text: "Zero absences, zero tardies and an Outstanding conduct record across the full school year." },
  { img: "record-formation", name: "Formation and competition", text: "In a youth academy in Honduras since 2019, and in the Honduran youth leagues across five seasons." },
  { img: "record-clinics", name: "Clinics and camps", text: "Barça Academy clinics and camps in Barcelona and Miami, and the Luciano Emilio Soccer Camp in Honduras." },
  { img: "record-tournaments", name: "Tournaments", text: "Copa Sin Fronteras in Guatemala in both 2024 and 2025." },
];

export default function Recruitment() {
  useSeo({
    title: "Athlete Profile & College Recruitment | Eternal Eleven",
    description: "Academic and athletic résumé, hosted athlete profile, highlight video and college recruitment guidance, kept current month by month.",
    path: "/athlete-recruitment",
  });
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (!zoom) return;
    const k = (e) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [zoom]);

  return (
    <>
      <header className="page-head">
        <div className="page-head-bg" aria-hidden="true">
          <Img name="study-desk" alt="" eager />
        </div>
        <div className="wrap">
          <p className="kicker">For athletes and families</p>
          <RevealLines as="h1" className="display d-xl" lines={["Your talent deserves", "a professional record."]} />
          <p className="lede">
            Universities do not recruit what they cannot see. We build the academic and athletic résumé, the hosted profile and the highlight reel that let a coach evaluate your athlete properly, and we keep it current month by month.
          </p>
          <div className="btn-row">
            <SmartLink to="/application-enrollment?program=athlete-recruitment" className="btn btn-gold btn-lg">
              Start your profile
            </SmartLink>
            <a className="btn btn-ghost btn-lg" href={waLink("Hello! I'd like to know more about the Athlete Profile & College Recruitment program.")} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section className="section-tight" aria-labelledby="deliver-title">
        <div className="wrap">
          <p className="kicker">What the program includes</p>
          <h2 id="deliver-title" className="display d-l" style={{ marginTop: 16, maxWidth: "18ch" }}>
            Five deliverables, produced and maintained for you.
          </h2>
          <p className="body" style={{ marginTop: 20 }}>
            Each can be taken on its own, and they work best together: the résumé and the profile are what a coach reads, the video is what a coach watches, and the monthly management keeps both current.
          </p>
          <ul className="deliver-list">
            {DELIVERABLES.map((d, i) => (
              <motion.li
                key={d.name}
                className="deliver"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
              >
                <ScrollIcon className="icon-badge" spin={140}>
                  <d.icon size={28} weight="light" aria-hidden="true" />
                </ScrollIcon>
                <h3 className="display d-s">{d.name}</h3>
                <p>{d.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section day" aria-labelledby="record-title">
        <div className="wrap">
          <p className="kicker">Sample athlete profile</p>
          <h2 id="record-title" className="display d-l" style={{ marginTop: 16 }}>
            What the record actually looks like.
          </h2>
          <p className="body" style={{ marginTop: 20 }}>
            A redacted example of the academic and athletic résumé we build, taken from a Grade 5 athlete. The name, the school and the teacher are withheld: a minor's record is only published with written parental consent.
          </p>
          <div className="record-grid">
            {RECORD.map((r) => (
              <button key={r.img} className="record" onClick={() => setZoom(r)} aria-label={`Enlarge: ${r.name}`}>
                <span className="ph">
                  <Img name={r.img} alt="" sizes="(max-width: 860px) 92vw, 45vw" />
                  <span className="zoom" aria-hidden="true">
                    <MagnifyingGlassPlus size={20} />
                  </span>
                </span>
                <h3 className="display d-s">{r.name}</h3>
                <p>{r.text}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="final section" aria-labelledby="rec-cta">
        <div className="wrap">
          <p className="kicker">Next step</p>
          <h2 id="rec-cta" className="display d-l" style={{ marginInline: "auto", maxWidth: "16ch" }}>
            Ready to build the profile universities read?
          </h2>
          <p className="lede">
            Send us the athlete's age, position, current club and the level they are aiming for. We will tell you which of these services you actually need, and which you can skip.
          </p>
          <div className="btn-row">
            <SmartLink to="/application-enrollment?program=athlete-recruitment" className="btn btn-gold btn-lg">
              Start your profile
            </SmartLink>
            <a className="btn btn-wa btn-lg" href={waLink()} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={zoom.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
          >
            <motion.img
              src={`/img/${zoom.img}-1600.webp`}
              alt={`${zoom.name}, redacted sample record`}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lightbox-close" onClick={() => setZoom(null)} aria-label="Close" autoFocus>
              <X size={22} weight="bold" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
