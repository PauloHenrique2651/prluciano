import { motion } from "framer-motion";
import { FileText, Globe, FilmSlate, GraduationCap, ArrowsClockwise, WhatsappLogo, Tag } from "@phosphor-icons/react";
import Pricing from "../sections/Pricing.jsx";
import RecordTimeline from "../sections/RecordTimeline.jsx";
import { Img, RevealLines, SmartLink, useSeo, EASE, ScrollIcon } from "../components/ui.jsx";
import { PHONE_DISPLAY, waLink } from "../lib/site.js";

const DELIVERABLES = [
  { icon: FileText, name: "Professional academic & athletic résumé", text: "Grades, transcripts, playing history, positions, teams, tournaments and achievements organised into one document a university or a coach can read in minutes." },
  { icon: Globe, name: "Digital athlete profile hosting", text: "A hosted profile that gathers the academic record, the football history and the video into a single link, ready to send to a coach or an admissions office." },
  { icon: FilmSlate, name: "Professional highlight video editing", text: "Your footage cut into a short, professional reel built around what college coaches actually watch: first touch, decisions under pressure and movement off the ball." },
  { icon: GraduationCap, name: "College recruitment guidance", text: "Guidance through the process itself: which programs fit the athlete's level and grades, how and when to approach coaches, and what a realistic timeline looks like." },
  { icon: ArrowsClockwise, name: "Monthly profile management", text: "Résumé, statistics and highlights updated as the season progresses, so the profile a coach opens is never a year out of date." },
];


export default function Recruitment() {
  useSeo({
    title: "Athlete Profile & College Recruitment | Eternal Eleven",
    description: "Academic and athletic résumé, hosted athlete profile, highlight video and college recruitment guidance, kept current month by month.",
    path: "/athlete-recruitment",
  });

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
          <p className="micro page-head-price">
            <Tag size={18} weight="fill" color="var(--gold-hi)" aria-hidden="true" />
            Plans from US$115/month. Athletes 13 and under get 45% off Basic.{" "}
            <SmartLink to="#plans" className="text-link">See plans and prices</SmartLink>
          </p>
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

      <Pricing />

      <RecordTimeline />

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

    </>
  );
}
