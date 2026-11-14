import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Img, RevealLines, SmartLink, useSeo } from "../components/ui.jsx";
import { waLink } from "../lib/site.js";
import { IS_TOUCH } from "../lib/device.js";

const SPONSORS = ["sponsor-1", "sponsor-2", "sponsor-3", "sponsor-4"];

/** One sponsor card, driven by the scroll like the site's photos: the card opens as it enters,
 *  the logo settles into place and drifts against the scroll, and a gold sheen crosses it once. */
function SponsorCard({ name, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 80%"] });
  const e = useSpring(enter, { stiffness: 140, damping: 30, mass: 0.4 });

  // The card opens like a shutter (desktop) or grows into place (phones: transform only, cheaper to paint).
  const clip = useTransform(e, [0, 1], ["inset(14% 8% 14% 8% round 28px)", "inset(0% 0% 0% 0% round 14px)"]);
  const cardScale = useTransform(e, [0, 1], [0.88, 1]);
  const tilt = useTransform(e, [0, 1], [12, 0]);
  // The logo grows into place, then drifts against the scroll. The two columns drift in opposite directions.
  const dir = i % 2 ? -1 : 1;
  const logoY = useTransform(p, [0, 1], [34 * dir, -34 * dir]);
  const logoScale = useTransform(p, [0, 0.42, 1], [0.78, 1, 0.94]);
  const logoOpacity = useTransform(e, [0, 0.6], [0, 1]);
  // Gold sheen crossing the card as it reaches the middle of the screen.
  const sheen = useTransform(p, [0.25, 0.65], ["-130%", "130%"]);

  return (
    <motion.div
      ref={ref}
      className="sponsor"
      style={IS_TOUCH ? { scale: cardScale } : { clipPath: clip, rotateX: tilt, transformPerspective: 1200 }}
    >
      <motion.div className="sponsor-logo" style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}>
        <Img name={name} alt="Official sponsor logo" sizes="(max-width: 640px) 80vw, 40vw" />
      </motion.div>
      <motion.span className="sponsor-sheen" style={{ x: sheen }} aria-hidden="true" />
    </motion.div>
  );
}

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
              <SponsorCard key={s} name={s} i={i} />
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
