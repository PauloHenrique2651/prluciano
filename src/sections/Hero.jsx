import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, animate } from "framer-motion";
import { useReducedMotion, IS_TOUCH } from "../lib/device.js";
import { WhatsappLogo, ShieldCheck } from "@phosphor-icons/react";
import { Img, RevealLines, SmartLink, EASE, CountUp } from "../components/ui.jsx";
import { waLink } from "../lib/site.js";

export default function Hero({ play }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.28]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  // Text stays fully readable while it's on screen; it only dims on its way out.
  // (On phones the hero is taller than the screen, so an early fade would wash out the CTAs.)
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", IS_TOUCH ? "-6%" : "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, IS_TOUCH ? [0.75, 1] : [0.55, 0.95], [1, 0]);

  // Floodlight flare: follows the pointer on desktop, drifts on its own on touch screens.
  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const sx = useSpring(fx, { stiffness: 40, damping: 20 });
  const sy = useSpring(fy, { stiffness: 40, damping: 20 });
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    const w = () => el.clientWidth;
    const h = () => el.clientHeight;
    const size = () => Math.max(w(), h()) * 0.7;
    fx.set(w() * 0.6 - size() / 2);
    fy.set(h() * 0.15 - size() / 2);
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        fx.set(e.clientX - r.left - size() / 2);
        fy.set(e.clientY - r.top - size() / 2);
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    }
    const a = animate(0, 1, {
      duration: 9,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      onUpdate: (t) => {
        fx.set(w() * (0.2 + 0.6 * t) - size() / 2);
        fy.set(h() * (0.1 + 0.15 * Math.sin(t * Math.PI)) - size() / 2);
      },
    });
    return () => a.stop();
  }, [reduce, fx, fy]);

  const fade = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: play ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE, delay: d },
  });

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div className="hero-media" style={{ scale, y: imgY }}>
        <motion.div
          style={{ height: "100%" }}
          initial={reduce ? false : { opacity: 0, scale: 1.12 }}
          animate={play ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Img name="hero-night" eager alt="A young player stands alone under the floodlights beside the ball" />
        </motion.div>
      </motion.div>
      <motion.div className="hero-flare" style={{ x: sx, y: sy }} aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />

      <motion.div className="wrap hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p className="kicker" {...fade(0.15)}>
          College soccer pathways &amp; recruitment
        </motion.p>
        <RevealLines
          as="h1"
          className="display d-xxl hero-title"
          lines={["Develop the", "complete athlete."]}
          play={play}
          delay={0.25}
        />
        <motion.p className="lede hero-sub" {...fade(0.75)}>
          Five-pillar development, training weeks and an international football experience in the United States, with education kept in the picture the whole way. Led by 2007 MLS MVP Luciano Emilio.
        </motion.p>
        <motion.div className="btn-row hero-ctas" {...fade(0.9)}>
          <SmartLink to="/application-enrollment" className="btn btn-gold btn-lg">
            Apply for a place
          </SmartLink>
          <a className="btn btn-ghost btn-lg" href={waLink()} target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
            Ask on WhatsApp
          </a>
        </motion.div>
        <motion.p className="micro hero-reassure" {...fade(1.0)}>
          <ShieldCheck size={18} weight="fill" color="var(--gold-hi)" aria-hidden="true" />
          You'll know what the program involves and what it costs before anything is paid.
        </motion.p>
        <motion.div className="hero-proof" {...fade(1.1)}>
          <div className="proof-item">
            {play ? <CountUp className="num" from={1980} to={2007} duration={2} /> : <span className="num">1980</span>}
            <span>MLS MVP and Golden Boot, Luciano Emilio</span>
          </div>
          <div className="proof-item">
            <span className="num">D.C.</span>
            <span>Pathway to D.C. United Academy</span>
          </div>
          <div className="proof-item">
            {play ? <CountUp className="num" from={0} to={5} duration={1.6} /> : <span className="num">0</span>}
            <span>pillars trained as one system</span>
          </div>
        </motion.div>
      </motion.div>
      <div className="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
