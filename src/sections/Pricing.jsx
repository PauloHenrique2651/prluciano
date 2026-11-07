import { CheckCircle, Info, Star } from "@phosphor-icons/react";
import { PLANS, RECOMMENDED_INCLUDES, PRICING_TERMS } from "../lib/pricing.js";
import { CountUp, RevealLines, Reveal, ScrollIcon, SmartLink, Stagger } from "../components/ui.jsx";

/** Recruitment plans. Prices count up as the cards deal in; the recommended plan carries the gold. */
export default function Pricing({ id = "plans" }) {
  return (
    <section className="section" id={id} aria-label="Plans and pricing">
      <div className="wrap">
        <p className="kicker">Plans &amp; pricing</p>
        <RevealLines as="h2" className="display d-l" lines={["Choose how far", "we go with you."]} />
        <Reveal as="p" className="body" style={{ marginTop: 20 }}>
          Every plan starts with the athlete's academic and athletic profile. Prices are in US dollars, per student-athlete.
        </Reveal>

        <Stagger className="plan-grid" gap={0.1}>
          {PLANS.map((p) => (
            <Stagger.Item as="article" key={p.key} className={`plan ${p.recommended ? "is-recommended" : ""}`} aria-labelledby={`plan-${p.key}`}>
              {p.recommended && (
                <span className="plan-badge">
                  <Star size={14} weight="fill" aria-hidden="true" /> Recommended
                </span>
              )}
              <h3 id={`plan-${p.key}`} className="plan-name">{p.name}</h3>
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
              {p.note && <p className="plan-note">{p.note}</p>}
              <p className="plan-text">{p.text}</p>
              <SmartLink
                to={`/application-enrollment?program=athlete-recruitment&plan=${p.key}`}
                className={`btn ${p.recommended ? "btn-gold" : "btn-ghost"} plan-cta`}
              >
                Choose {p.name.split(" ")[0]}
              </SmartLink>
            </Stagger.Item>
          ))}
        </Stagger>

        <div className="plan-details">
          <Reveal>
            <h3 className="display d-s">Included in College Recruitment</h3>
            <Stagger as="ul" className="plan-includes" gap={0.06}>
              {RECOMMENDED_INCLUDES.map((t) => (
                <Stagger.Item as="li" key={t}>
                  <ScrollIcon spin={160}>
                    <CheckCircle size={20} weight="fill" aria-hidden="true" />
                  </ScrollIcon>
                  {t}
                </Stagger.Item>
              ))}
            </Stagger>
          </Reveal>
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
