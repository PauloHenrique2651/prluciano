import { motion } from "framer-motion";
import { Img, RevealLines, SmartLink, useSeo, EASE } from "../components/ui.jsx";
import { waLink } from "../lib/site.js";

const SPONSORS = ["sponsor-1", "sponsor-2", "sponsor-3", "sponsor-4"];

export default function Sponsors() {
  useSeo({
    title: "Our Sponsors & Partners | Eternal Eleven Agency",
    description: "The companies that back Eternal Eleven Agency on the pitch and in the classroom.",
    path: "/sponsors",
  });
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <p className="kicker">Our sponsors &amp; partners</p>
          <RevealLines as="h1" className="display d-xl" lines={["The brands behind", "the program."]} />
          <p className="lede">
            These companies back what happens on the pitch and in the classroom. Every sponsor is shown at the same size and in its own colours, because none of them is here as a decoration.
          </p>
        </div>
      </header>
      <section className="section-tight day" aria-label="Official sponsors and partners">
        <div className="wrap">
          <div className="sponsor-grid" style={{ marginTop: 0 }}>
            {SPONSORS.map((s, i) => (
              <motion.div
                key={s}
                className="sponsor"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.07 }}
              >
                <Img name={s} alt="Official sponsor logo" sizes="(max-width: 640px) 80vw, 40vw" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-tight" aria-labelledby="sp-cta">
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "end" }}>
          <div>
            <h2 id="sp-cta" className="display d-m" style={{ maxWidth: "20ch" }}>Want your brand behind the next generation?</h2>
            <p className="body" style={{ marginTop: 14 }}>Talk to us about sponsoring athletes, training weeks or the International Week.</p>
          </div>
          <div className="btn-row">
            <a className="btn btn-gold" href={waLink("Hello! I'm interested in sponsoring Eternal Eleven Agency.")} target="_blank" rel="noopener noreferrer">
              Talk about sponsorship
            </a>
            <SmartLink to="/" className="btn btn-ghost">Back to the program</SmartLink>
          </div>
        </div>
      </section>
    </>
  );
}
