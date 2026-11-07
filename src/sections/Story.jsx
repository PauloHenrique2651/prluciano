import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Plus, WhatsappLogo, Check, Medal, Target, AirplaneTilt, GraduationCap, Clock, CirclesThreePlus } from "@phosphor-icons/react";
import { POSITIONS, TEAM, WHY, PHONE_DISPLAY, waLink } from "../lib/site.js";
import { Img, Parallax, RevealLines, SmartLink, EASE, Reveal, Stagger, ScrollIcon, CountUp, Marquee } from "../components/ui.jsx";
import ApplicationForm from "../components/ApplicationForm.jsx";

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap manifesto">
        <div className="manifesto-text">
          <p className="kicker">About Eternal Eleven</p>
          <RevealLines
            as="h2"
            className="display d-l"
            lines={["Development built on", "football, education", "and personal growth."]}
          />
          <Reveal>
            <p className="lede" style={{ marginTop: 28 }}>
              Eternal Eleven Agency works with committed young players and the families behind them.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
          <p className="body">
            Every athlete is developed across five pillars, with a plan that builds technical skill, tactical intelligence and mental resilience, and with schoolwork treated as part of the program rather than a distraction from it. The work happens in training weeks, in international experiences and in the academic record universities ask to see.
          </p>
          </Reveal>
        </div>
        <div className="manifesto-media">
          <Parallax amount={16} style={{ height: "100%" }}>
            <Img name="coach-talk" alt="A coach talks one-to-one with a young player holding a ball at dusk" sizes="(max-width: 860px) 92vw, 42vw" />
          </Parallax>
          <p className="manifesto-tag">Plans built around the individual athlete, not a fixed schedule for everyone.</p>
        </div>
      </div>
    </section>
  );
}

export function LE11() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="le11" aria-labelledby="le11-title">
      <div className="wrap le11">
        <div>
          <p className="kicker">LE11 specialized player development</p>
          <RevealLines as="h2" className="display d-l" lines={["Train with purpose.", "Elevate your game."]} />
          <Reveal>
          <p className="body">
            Private and small-group sessions throughout the week for players in every position, open to LE11 program members and outside players. Every session is led by Luciano Emilio, former MLS MVP and Golden Boot winner, and works the technical, tactical, physical and mental skills it takes to compete a level higher.
          </p>
          </Reveal>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <SmartLink to="/application-enrollment?program=le11-training" className="btn btn-gold">
              Book a training session
            </SmartLink>
          </div>
        </div>
        <Stagger as="ul" className="positions">
          {POSITIONS.map((p, i) => {
            const isOpen = open === i;
            return (
              <Stagger.Item as="li" className="position" key={p.name}>
                <button aria-expanded={isOpen} aria-controls={`pos-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="display d-m">{p.name}</span>
                  <span className="position-plus" aria-hidden="true">
                    <Plus size={18} weight="bold" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`pos-${i}`}
                      className="position-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p>{p.text}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Stagger.Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export function Club() {
  return (
    <section className="club section-tight" aria-labelledby="club-title">
      <Parallax className="club-media" amount={18}>
        <Img name="stadium-walk" alt="A floodlit professional stadium at dusk with a player walking the touchline" sizes="100vw" />
      </Parallax>
      <div className="wrap club-copy">
        <div>
          <p className="kicker">Inside the professional game</p>
          <RevealLines as="h2" className="display d-l" lines={["A look inside a", "professional club."]} />
        </div>
        <Reveal>
          <p className="body">
            Participants have the opportunity to visit D.C. United training facilities, observe first-team training and, when schedules and club authorization allow, meet players.
          </p>
          <p className="club-note">
            Access is arranged around the club's calendar and approvals, so what each group experiences is confirmed in advance. It is a genuine look inside a professional environment, not a guaranteed partnership.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section className="section day" id="education" aria-labelledby="edu-title">
      <div className="wrap edu">
        <div className="edu-media">
          <div className="a">
            <Parallax amount={14} style={{ height: "100%" }}>
              <Img name="library" alt="A student-athlete writing notes in a university library at night" sizes="(max-width: 860px) 92vw, 46vw" />
            </Parallax>
          </div>
          <div className="b">
            <Img name="drills" alt="" sizes="(max-width: 860px) 46vw, 22vw" />
          </div>
        </div>
        <div>
          <p className="kicker">Education &amp; future</p>
          <RevealLines as="h2" className="display d-l" lines={["The athlete who is", "also a student keeps", "more doors open."]} />
          <p className="body">
            Academic commitment is part of the training program. Players keep their grades at a level that preserves their options, and families get help organizing the record universities actually ask for.
          </p>
          <Stagger as="ul" className="edu-list" gap={0.12}>
            {["Transcripts and results", "Playing history, positions and teams", "Tournaments and achievements"].map((t) => (
              <Stagger.Item as="li" key={t}>
                <ScrollIcon spin={180}><Check size={18} weight="bold" aria-hidden="true" /></ScrollIcon>
                {t}
              </Stagger.Item>
            ))}
          </Stagger>
          <p className="body" style={{ marginTop: 24 }}>
            None of it promises a scholarship or admission. It makes the athlete a credible candidate, and then the athlete earns the rest.
          </p>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <SmartLink to="/athlete-recruitment" className="btn btn-ghost">
              See the recruitment program
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Coach() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shine = useTransform(scrollYProgress, [0.15, 0.6], ["100% 0%", "0% 0%"]);
  return (
    <section ref={ref} className="section" id="leadership" aria-labelledby="coach-title">
      <div className="wrap coach">
        <div className="coach-photo">
          <Parallax amount={10} style={{ height: "100%" }}>
            <Img name="luciano-boot" alt="Luciano Emilio holding the MLS Golden Boot trophy" sizes="(max-width: 860px) 92vw, 36vw" />
          </Parallax>
          <span className="coach-badge">D.C. United awards reception, 2007</span>
        </div>
        <div>
          <p className="kicker">Program Director</p>
          <motion.h2 id="coach-title" className="display d-xl gold-text" style={{ backgroundPosition: shine }}>
            Luciano Emilio
          </motion.h2>
          <Stagger className="coach-stats" gap={0.1}>
            <Stagger.Item className="coach-stat"><CountUp className="num" from={1990} to={2007} /><span>MLS MVP</span></Stagger.Item>
            <Stagger.Item className="coach-stat"><CountUp className="num" from={1990} to={2007} /><span>Golden Boot</span></Stagger.Item>
            <Stagger.Item className="coach-stat"><span className="num">XI</span><span>MLS Best XI</span></Stagger.Item>
            <Stagger.Item className="coach-stat"><span className="num">D.C.</span><span>Supporters' Shield season</span></Stagger.Item>
          </Stagger>
          <p className="body">
            Luciano built his playing career as a striker across several countries before arriving in Major League Soccer, where he was named MLS MVP and Golden Boot winner in 2007 with D.C. United. He now holds a USSF A Senior coaching license, has studied sports psychology and has coached with Loudoun United FC. At Eternal Eleven he leads the development work: the same five pillars, taught by someone who has played at the level our athletes are aiming for.
          </p>
          <Stagger as="ul" className="coach-creds">
            {[
              "Professional playing career across several countries",
              "USSF A Senior coaching license",
              "Education in sports psychology",
              "Coaching experience with Loudoun United FC",
            ].map((c) => (
              <Stagger.Item as="li" key={c}>
                <ScrollIcon spin={180}><CheckCircle size={18} weight="fill" aria-hidden="true" /></ScrollIcon>
                {c}
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className="section-tight" aria-labelledby="team-title">
      <div className="wrap">
        <p className="kicker">Our team</p>
        <h2 id="team-title" className="display d-l" style={{ marginTop: 16, maxWidth: "18ch" }}>
          Three people carry the program.
        </h2>
        <Reveal>
        <p className="body" style={{ marginTop: 20 }}>
          One runs the operation, one works with families and student-athletes day to day, and one owns college research, admissions and recruitment applications.
        </p>
        </Reveal>
        <div className="team-grid">
          {TEAM.map((t, i) => (
            <motion.article
              key={t.name}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <div className="ph">
                <Img name={t.img} alt={`${t.name}, ${t.role}`} sizes="(max-width: 860px) 92vw, 30vw" />
              </div>
              <h3 className="display d-s">{t.name}</h3>
              <p>{t.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY_ICONS = [Medal, Target, AirplaneTilt, GraduationCap, Clock, CirclesThreePlus];

export function Why() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="wrap">
        <p className="kicker">Why Eternal Eleven</p>
        <RevealLines as="h2" className="display d-l" lines={["What families are", "actually choosing."]} />
        <p className="body" style={{ marginTop: 20 }}>
          What separates a development program is not what it promises but how it works week to week. These are the six things we hold ourselves to, and the things we are happy to be judged on.
        </p>
        <Stagger className="why-grid" gap={0.09}>
          {WHY.map((w, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <Stagger.Item className="why-item" key={w.name}>
                <ScrollIcon className="icon-badge" spin={120}>
                  <Icon size={30} weight="light" aria-hidden="true" />
                </ScrollIcon>
                <h3 className="display d-s">{w.name}</h3>
                <p>{w.text}</p>
              </Stagger.Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  return (
    <section ref={ref} className="final section" aria-labelledby="final-title">
      <motion.div className="final-bg" style={{ scale }} aria-hidden="true">
        <Img name="hero-night" alt="" sizes="100vw" />
      </motion.div>
      <div className="wrap">
        <p className="kicker">Next step</p>
        <RevealLines
          as="h2"
          className="display d-xl"
          lines={["Your talent.", "Your education.", "Your future."]}
        />
        <Reveal>
        <p className="lede">
          The pathway to D.C. United Academy and to college soccer starts with one application. Tell us where your athlete is today and what you are aiming for.
        </p>
        <div className="btn-row">
          <SmartLink to="/application-enrollment" className="btn btn-gold btn-lg">
            Start your athlete's application
          </SmartLink>
          <a className="btn btn-wa btn-lg" href={waLink()} target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
            Talk on WhatsApp
          </a>
        </div>
        <p className="micro">Takes about two minutes. Nothing is paid until you know what the program involves and costs.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact">
        <div>
          <p className="kicker">Contact</p>
          <h2 id="contact-title" className="display d-l">Tell us about your athlete.</h2>
          <p className="body">
            Share a few details and we will come back to you about which program fits, what it involves and what the next step looks like.
          </p>
          <div className="contact-direct">
            <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
              WhatsApp {PHONE_DISPLAY}
            </a>
            <p className="micro">WhatsApp is the fastest way to reach us.</p>
          </div>
        </div>
        <ApplicationForm variant="compact" formName="Program enquiry" />
      </div>
    </section>
  );
}

export function PillarBand() {
  return <Marquee items={["Physical", "Technical", "Tactical", "Psychological", "Human"]} />;
}

export function TaglineBand() {
  return <Marquee className="day-band" reverse items={["Your talent", "Your education", "Your future"]} />;
}
