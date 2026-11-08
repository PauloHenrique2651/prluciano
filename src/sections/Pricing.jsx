import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
import { IS_TOUCH } from "../lib/device.js";
import { useNavigate } from "react-router-dom";
import { Check, Info, Star, WhatsappLogo, ShieldCheck, Trophy, Plus, ArrowRight, Minus, CaretDown, Tag, Scissors } from "@phosphor-icons/react";
import { PLANS, PRICING_TERMS, PRICING_FAQ, PLAN_COMPARE, START_STEPS, planPriceText } from "../lib/pricing.js";
import { waLink } from "../lib/site.js";
import { CountUp, RevealLines, Reveal, ScrollIcon, SmartLink, Stagger, EASE } from "../components/ui.jsx";

const applyHref = (key) => `/application-enrollment?program=athlete-recruitment&plan=${key}`;
const perDay = (p) => ((p.price * 12) / 365).toFixed(2);
const priceText = planPriceText;
const ctaClass = (p) => (p.promo ? "cta-night" : p.recommended ? "btn-gold" : "cta-chalk");
const PROMO = PLANS.find((p) => p.promo);
const CUT_EASE = [0.65, 0, 0.35, 1];

/** Perforation the visitor cuts with a finger or the mouse. The scissors follow on a spring;
 *  pressing anywhere on the perforation and sliding cuts it. Tap / Enter on the scissors cuts it in one go. */
function TicketCut({ progress, onCut }) {
  const track = useRef(null);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);
  const drag = useRef({ on: false, moved: 0, startX: 0 });
  const target = useMotionValue(0);
  const x = useSpring(target, { stiffness: 520, damping: 42, mass: 0.6 });
  const snip = useTransform(x, (v) => Math.sin(v / 6) * 18);
  const hint = useTransform(x, [0, 24], [1, 0]);
  const width = () => track.current?.offsetWidth || 1;

  useMotionValueEvent(x, "change", (v) => progress.set(Math.min(1, Math.max(0, v / width()))));

  const finish = () => {
    if (done) return;
    setTouched(true);
    setDone(true);
    target.set(width());
    onCut?.();
  };
  const follow = (e) => {
    const r = track.current.getBoundingClientRect();
    // the cut only moves forward, like real scissors
    target.set(Math.max(target.get(), Math.min(r.width, Math.max(0, e.clientX - r.left))));
  };
  const down = (e) => {
    if (done) return;
    drag.current = { on: true, moved: 0, startX: e.clientX };
    setTouched(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };
  const move = (e) => {
    if (!drag.current.on) return;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(e.clientX - drag.current.startX));
    if (drag.current.moved > 3) follow(e);
  };
  const up = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    if (drag.current.moved <= 3) return; // a tap: handled by the button's click
    if (target.get() / width() > 0.7) finish();
    else target.set(0);
  };

  return (
    <div
      className={`tcut ${done ? "is-done" : ""}`}
      ref={track}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      <span className="tcut-dots" aria-hidden="true" />
      <motion.span className="tcut-line" style={{ scaleX: progress }} aria-hidden="true" />
      {!done && (
        <motion.span className="tcut-hint" style={{ opacity: hint }} aria-hidden="true">
          {IS_TOUCH ? "Slide to cut and apply" : "Drag to cut and apply"}
        </motion.span>
      )}
      <motion.button
        type="button"
        className="tcut-scissors"
        aria-label="Cut the ticket and open the application"
        disabled={done}
        style={{ x }}
        onClick={() => {
          if (drag.current.moved <= 3) finish();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.span
          style={{ display: "grid", rotate: snip }}
          animate={touched ? { x: 0 } : { x: [0, 12, 0] }}
          transition={touched ? { duration: 0.2 } : { duration: 1.1, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        >
          <Scissors size={18} weight="fill" aria-hidden="true" />
        </motion.span>
      </motion.button>
    </div>
  );
}

/** Phones: while the plans are on screen but the offer card's button isn't, keep the offer one tap away. */
function OfferBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const section = document.getElementById("plans");
    const stub = document.getElementById("promo-stub");
    if (!section || !stub || !PROMO) return;
    let inSection = false;
    let stubVisible = false;
    const update = () => {
      const on = inSection && !stubVisible;
      setShow(on);
      document.documentElement.classList.toggle("offer-bar-on", on);
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === section) inSection = e.isIntersecting;
        else stubVisible = e.isIntersecting;
      }
      update();
    }, { rootMargin: "-20% 0px -10% 0px" });
    io.observe(section);
    io.observe(stub);
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("offer-bar-on");
    };
  }, []);
  if (!PROMO) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="offer-bar"
          initial={{ y: 110 }}
          animate={{ y: 0 }}
          exit={{ y: 110 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="offer-bar-text">
            <span>{PROMO.short} plan, {PROMO.promo.off} for {PROMO.promo.months} months</span>
            <b><s>US${PROMO.was}</s> US${PROMO.price}/mo</b>
          </div>
          <SmartLink to={applyHref(PROMO.key)} className="btn cta-night offer-bar-cta">
            {PROMO.cta}
          </SmartLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The plan tickets, shared by the home page and the recruitment page.
 *  Cutting a ticket splits it in two, then opens the application with that plan already chosen. */
export function PlanGrid({ markPromo = false }) {
  return (
    <Stagger className="plan-grid" gap={0.1}>
      {PLANS.map((p, i) => (
        <PlanCard key={p.key} p={p} i={i} markPromo={markPromo} />
      ))}
    </Stagger>
  );
}

/** One plan ticket in two pieces: the body and the stub, joined by the perforation. */
function PlanCard({ p, i, markPromo }) {
  const navigate = useNavigate();
  const [torn, setTorn] = useState(false);
  const cut = useMotionValue(0); // 0 → 1 while cutting
  const split = useMotionValue(0); // 0 → 1 as the pieces come apart
  // While cutting, the stub already starts to give way; after the cut it drops away.
  const stubY = useTransform([cut, split], ([c, s]) => c * 4 + s * 46);
  const stubX = useTransform(split, [0, 1], [0, 12]);
  const stubR = useTransform([cut, split], ([c, s]) => c * 0.9 + s * 4.5);
  const bodyY = useTransform(split, [0, 1], [0, -10]);
  const bodyR = useTransform(split, [0, 1], [0, -1.4]);

  const tear = () => {
    setTorn(true);
    animate(split, 1, { type: "spring", stiffness: 110, damping: 13, mass: 0.9 });
    setTimeout(() => navigate(applyHref(p.key) + "#apply-title"), 1150);
  };

  return (
        <Stagger.Item
          as="article"
          className={`plan ${p.recommended ? "is-recommended" : ""} ${p.promo ? "has-promo" : ""} ${torn ? "is-torn" : ""}`}
          aria-labelledby={`plan-${p.key}`}
        >
          <motion.div className="plan-body" style={{ y: bodyY, rotate: bodyR }}>
            <div className="plan-ticket-head" aria-hidden="true">
              <span className="tk-mark">11</span>
              <span>College pathway pass</span>
              <span className="tk-no num">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="plan-top">
              <div className="plan-level" role="img" aria-label={`Level ${i + 1} of ${PLANS.length}`}>
                {PLANS.map((_, s) => (
                  <motion.span
                    key={s}
                    className={s <= i ? "on" : ""}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 + s * 0.12 }}
                  />
                ))}
              </div>
              {p.recommended && (
                <span className="plan-badge">
                  <Star size={14} weight="fill" aria-hidden="true" /> Recommended
                </span>
              )}
              {p.promo && (
                <span className="plan-badge plan-badge-promo">
                  <Tag size={14} weight="fill" aria-hidden="true" /> {p.promo.label}
                </span>
              )}
            </div>

            <h3 id={`plan-${p.key}`} className="plan-head">
              <span className="plan-outcome">{p.outcome}</span>
              <span className="plan-name">{p.name}</span>
            </h3>

            <div className="plan-price-block">
              {p.was && (
                <p className="plan-was">
                  <s aria-label={`Regular price US$${p.was} a month`}>US${p.was}</s>
                  <span className="plan-off">{p.promo.off}</span>
                </p>
              )}
              <p className="plan-price">
                {p.price ? (
                  <>
                    <span className="plan-currency">US$</span>
                    <CountUp className="num" from={0} to={p.price} duration={1.4} />
                    <span className="plan-period">{p.period}</span>
                  </>
                ) : (
                  <span className="num plan-range">{p.priceLabel}</span>
                )}
              </p>
              {p.price && <p className="plan-daily">About US${perDay(p)} a day</p>}
              {(p.note || p.priceSub) && <p className="plan-note">{p.note || p.priceSub}</p>}
            </div>

            <div className="plan-features">
              {p.plus && <p className="plan-plus">{p.plus}</p>}
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={16} weight="bold" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="plan-seam">
            <TicketCut progress={cut} onCut={tear} />
          </div>

          <motion.div className="plan-stub" id={p.promo && markPromo ? "promo-stub" : undefined} style={{ x: stubX, y: stubY, rotate: stubR }}>
            {p.promo && (
              <p className="plan-code">
                <span>Your code</span>
                <b translate="no">{p.promo.code}</b>
                <span>Applied automatically</span>
              </p>
            )}
            <SmartLink to={applyHref(p.key)} className={`btn plan-cta ${ctaClass(p)}`}>
              <span>{p.cta}</span>
              <span className="cta-arrow" aria-hidden="true">
                <ArrowRight size={18} weight="bold" />
              </span>
            </SmartLink>
            <p className="plan-risk">Free first conversation. You only pay once you agree with the plan.</p>
            <a
              className="plan-wa"
              href={waLink(`Hello! I'm interested in the ${p.name} plan, ${priceText(p)}, for my athlete. Could you tell me more?`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              Ask about this plan on WhatsApp
            </a>
            <div className="plan-barcode" aria-hidden="true">
              <span />
              <small>Valid for one student-athlete</small>
            </div>
          </motion.div>
        </Stagger.Item>
  );
}

/** Recruitment plans laid out to convert: outcome-led cards, the recommended plan raised in gold, two ways to act on each. */
export default function Pricing({ id = "plans" }) {
  return (
    <section className="section pricing" id={id} aria-label="Plans and pricing">
      <div className="pricing-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="pricing-head">
          <div>
            <p className="kicker">Plans &amp; pricing</p>
            <RevealLines as="h2" className="display d-l" lines={["Choose how far", "we go with you."]} />
          </div>
          <Reveal as="p" className="body">
            Every plan starts with the athlete's academic and athletic record, and each one builds on the one before it. Prices in US dollars, per student-athlete.
          </Reveal>
        </div>

        <Stagger className="trust-strip" gap={0.08}>
          <Stagger.Item className="trust-item">
            <ScrollIcon spin={90}><Trophy size={22} weight="fill" aria-hidden="true" /></ScrollIcon>
            Led by 2007 MLS MVP Luciano Emilio
          </Stagger.Item>
          <Stagger.Item className="trust-item">
            <ScrollIcon spin={90}><Star size={22} weight="fill" aria-hidden="true" /></ScrollIcon>
            A dedicated director for college research and admissions
          </Stagger.Item>
          <Stagger.Item className="trust-item">
            <ScrollIcon spin={90}><ShieldCheck size={22} weight="fill" aria-hidden="true" /></ScrollIcon>
            Nothing is paid before we explain what your plan involves
          </Stagger.Item>
        </Stagger>

        <PlanGrid markPromo />

        <OfferBar />

        <PlanCompare />

        <div className="plan-start">
          <div className="plan-start-head">
            <h3 className="display d-s">How it starts</h3>
            <p>Not sure which plan fits? Apply anyway and we'll recommend one, with no commitment.</p>
          </div>
          <Stagger as="ol" className="plan-steps" gap={0.12}>
            {START_STEPS.map((st, n) => (
              <Stagger.Item as="li" key={st.title} className="plan-step">
                <span className="plan-step-n num">{n + 1}</span>
                <b>{st.title}</b>
                <p>{st.text}</p>
              </Stagger.Item>
            ))}
          </Stagger>
          <div className="btn-row plan-start-cta">
            <SmartLink to="/application-enrollment?program=athlete-recruitment" className="btn btn-gold">
              Start the application
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </SmartLink>
            <a className="plan-wa" href={waLink("Hello! I'd like help choosing a recruitment plan for my athlete.")} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
              Ask which plan fits
            </a>
          </div>
        </div>

        <div className="plan-details">
          <div>
            <h3 className="display d-s">Questions families ask</h3>
            <PricingFaq />
          </div>
          <Reveal className="plan-terms" delay={0.1}>
            <h3 className="display d-s">
              <Info size={22} weight="light" aria-hidden="true" /> Terms
            </h3>
            <p>{PRICING_TERMS}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Every service against every plan, opened on demand. Shows at a glance that each plan builds on the last. */
function PlanCompare() {
  const [open, setOpen] = useState(false);
  return (
    <div className="compare">
      <button className="compare-toggle" aria-expanded={open} aria-controls="plan-compare" onClick={() => setOpen(!open)}>
        <span>{open ? "Hide the comparison" : "Compare everything each plan includes"}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE }} style={{ display: "inline-grid" }}>
          <CaretDown size={18} weight="bold" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="plan-compare"
            className="compare-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <table className="compare-table">
              <caption className="sr-only">What each recruitment plan includes</caption>
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Service</span></th>
                  {PLANS.map((p) => (
                    <th scope="col" key={p.key} className={p.recommended ? "is-rec" : ""}>
                      <span className="compare-name">{p.short === "College Recruitment" ? "College" : p.short}</span>
                      <span className="compare-price">{p.price ? `$${p.price}/mo` : "$1.5–3k"}</span>
                      {p.was && <s className="compare-was">${p.was}</s>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARE.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {PLANS.map((p, i) => (
                      <td key={p.key} className={p.recommended ? "is-rec" : ""}>
                        {i >= row.from ? (
                          <Check size={18} weight="bold" aria-label="Included" />
                        ) : (
                          <Minus size={14} weight="bold" aria-label="Not included" className="compare-no" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PricingFaq() {
  const [open, setOpen] = useState(0);
  return (
    <Stagger as="ul" className="faq" gap={0.06}>
      {PRICING_FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <Stagger.Item as="li" key={f.q} className="faq-item">
            <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{f.q}</span>
              <span className="position-plus" aria-hidden="true">
                <Plus size={16} weight="bold" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  className="faq-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Stagger.Item>
        );
      })}
    </Stagger>
  );
}

/** Home page: the same plan tickets as the recruitment page, under a short heading. */
export function PlanStrip() {
  return (
    <section className="section-tight plan-strip-section" aria-label="Recruitment plans">
      <div className="wrap">
        <div className="plan-strip-head">
          <div>
            <p className="kicker">College recruitment plans</p>
            <h2 className="display d-m" style={{ marginTop: 14 }}>From US$55 a month.</h2>
          </div>
          <SmartLink to="/athlete-recruitment#plans" className="btn btn-outline-gold">
            Compare all plans
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </SmartLink>
        </div>
        <PlanGrid />
      </div>
    </section>
  );
}
