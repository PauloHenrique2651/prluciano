import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, Star, WhatsappLogo, ShieldCheck, Trophy, Plus, ArrowRight } from "@phosphor-icons/react";
import { PLANS, PRICING_TERMS, PRICING_FAQ } from "../lib/pricing.js";
import { waLink } from "../lib/site.js";
import { CountUp, RevealLines, Reveal, ScrollIcon, SmartLink, Stagger, EASE } from "../components/ui.jsx";

const applyHref = (key) => `/application-enrollment?program=athlete-recruitment&plan=${key}`;
const priceText = (p) => (p.price ? `US$${p.price}/month` : p.priceLabel);

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

        <Stagger className="plan-grid" gap={0.1}>
          {PLANS.map((p) => (
            <Stagger.Item as="article" key={p.key} className={`plan ${p.recommended ? "is-recommended" : ""}`} aria-labelledby={`plan-${p.key}`}>
              {p.recommended && (
                <span className="plan-badge">
                  <Star size={14} weight="fill" aria-hidden="true" /> Recommended
                </span>
              )}
              <p className="plan-outcome">{p.outcome}</p>
              <h3 id={`plan-${p.key}`} className="plan-name">{p.name}</h3>

              <div className="plan-price-block">
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

              <div className="plan-actions">
                <SmartLink to={applyHref(p.key)} className={`btn ${p.recommended ? "btn-gold" : "btn-outline-gold"} plan-cta`}>
                  Start with {p.short}
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </SmartLink>
                <a
                  className="plan-wa"
                  href={waLink(`Hello! I'm interested in the ${p.name} plan (${priceText(p)}) for my athlete. Could you tell me more?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
                  Ask about this plan
                </a>
              </div>
            </Stagger.Item>
          ))}
        </Stagger>

        <Reveal className="plan-reassure">
          <ShieldCheck size={20} weight="fill" aria-hidden="true" />
          <p>
            <b>Not sure which plan fits?</b> Send an application and we'll recommend one for your athlete, with no commitment.
          </p>
          <SmartLink to="/application-enrollment?program=athlete-recruitment" className="text-link">
            Get a recommendation
          </SmartLink>
        </Reveal>

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

/** Compact price strip for the home page: every plan at a glance, recommended in gold, one click to compare. */
export function PlanStrip() {
  return (
    <section className="section-tight plan-strip-section" aria-label="Recruitment plans">
      <div className="wrap">
        <div className="plan-strip-head">
          <div>
            <p className="kicker">College recruitment plans</p>
            <h2 className="display d-m" style={{ marginTop: 14 }}>From US$115 a month.</h2>
          </div>
          <SmartLink to="/athlete-recruitment#plans" className="btn btn-outline-gold">
            Compare all plans
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </SmartLink>
        </div>
        <Stagger className="plan-strip" gap={0.08}>
          {PLANS.map((p) => (
            <Stagger.Item key={p.key} className={`strip-plan ${p.recommended ? "is-recommended" : ""}`}>
              <SmartLink to={applyHref(p.key)} className="strip-link" aria-label={`${p.name}, ${priceText(p)}. Start with this plan`}>
                {p.recommended && <span className="strip-badge">Recommended</span>}
                <span className="strip-name">{p.name}</span>
                <span className="strip-price">
                  {p.price ? (
                    <>
                      <span className="plan-currency">US$</span>
                      <CountUp className="num" from={0} to={p.price} duration={1.2} />
                      <span className="plan-period">/mo</span>
                    </>
                  ) : (
                    <span className="num">{p.priceLabel.replace("US$", "$")}</span>
                  )}
                </span>
                <span className="strip-outcome">{p.outcome}</span>
              </SmartLink>
            </Stagger.Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
