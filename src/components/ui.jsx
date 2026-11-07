import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { scrollToHash } from "../lib/scroll.js";

export const EASE = [0.22, 1, 0.36, 1];

/** Responsive WebP image from /img (800 / 1600 widths). */
export function Img({ name, alt = "", sizes = "100vw", eager = false, className, style, width, height }) {
  return (
    <img
      className={className}
      style={style}
      src={`/img/${name}-1600.webp`}
      srcSet={`/img/${name}-800.webp 800w, /img/${name}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}

/** Headline revealed line by line from behind a mask. `lines` is an array of strings. */
export function RevealLines({ as: Tag = "h2", lines, className, delay = 0, play }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const show = play === undefined ? inView : play && inView;
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((l, i) => (
        <span className="line-mask" key={i} aria-hidden="true">
          <motion.span
            initial={reduce ? false : { y: "105%" }}
            animate={show || reduce ? { y: "0%" } : { y: "105%" }}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.09 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Image that drifts against scroll inside an overflow-hidden frame. */
export function Parallax({ children, amount = 12, className, style }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount / 2}%`, `${amount / 2}%`]);
  // The frame opens like a shutter as it enters, while the photo keeps drifting inside it.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 45%"] });
  const clip = useTransform(enter, [0, 1], ["inset(18% 10% 18% 10% round 6px)", "inset(0% 0% 0% 0% round 0px)"]);
  const zoom = useTransform(enter, [0, 1], [1.25, 1.05]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, clipPath: reduce ? undefined : clip }}>
      <motion.div style={{ y, scale: reduce ? 1 : zoom, height: "100%" }}>{children}</motion.div>
    </motion.div>
  );
}

/** Block that rises out of a soft blur as it enters the viewport. */
export function Reveal({ children, delay = 0, y = 36, className, style, as = "div" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Children enter one after another. Wrap items in <Stagger.Item>. */
export function Stagger({ children, className, style, as = "div", gap = 0.08 }) {
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}
Stagger.Item = function StaggerItem({ children, className, style, as = "div", ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </M>
  );
};

/** Icon that turns and grows as it travels through the viewport — it "follows" the scroll. */
export function ScrollIcon({ children, spin = 90, className, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-spin, 0, spin * 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.6, 1.08, 1.08, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  return (
    <motion.span ref={ref} className={className} style={{ display: "inline-grid", rotate, scale, y, ...style }}>
      {children}
    </motion.span>
  );
}

/** Number that counts up when it scrolls into view. */
export function CountUp({ to, from = 0, duration = 1.6, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = String(to);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - k, 4);
      if (ref.current) ref.current.textContent = String(Math.round(from + (to - from) * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration, reduce]);
  return (
    <span ref={ref} className={className} aria-label={String(to)}>
      {reduce ? to : from}
    </span>
  );
}

/** Text band that slides with scroll and speeds up with scroll velocity. */
export function Marquee({ items, className, reverse = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-30%", "0%"] : ["0%", "-30%"]);
  const row = [...items, ...items, ...items];
  return (
    <div ref={ref} className={`marquee ${className || ""}`} aria-hidden="true">
      <motion.div className="marquee-row" style={{ x }}>
        {row.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="marquee-dot"><circle cx="12" cy="12" r="5" /></svg>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Router link that also handles in-page hashes with smooth scrolling. */
export function SmartLink({ to, children, onClick, ...rest }) {
  const handle = (e) => {
    onClick?.(e);
    const [path, hash] = to.split("#");
    if (hash && (path === "" || path === window.location.pathname)) {
      if (scrollToHash("#" + hash)) {
        e.preventDefault();
        history.replaceState(null, "", "#" + hash);
      }
    }
  };
  if (/^(https?:|tel:|mailto:)/.test(to)) {
    return (
      <a href={to} onClick={onClick} {...rest} {...(to.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}

export function Kicker({ children }) {
  return <p className="kicker">{children}</p>;
}

/** Updates <title>, description and canonical for client-side routes. */
export function useSeo({ title, description, path }) {
  useEffect(() => {
    document.title = title;
    const set = (sel, attr, val) => document.querySelector(sel)?.setAttribute(attr, val);
    if (description) {
      set('meta[name="description"]', "content", description);
      set('meta[property="og:description"]', "content", description);
    }
    set('meta[property="og:title"]', "content", title);
    set('link[rel="canonical"]', "href", `https://prluciano.vercel.app${path}`);
    set('meta[property="og:url"]', "content", `https://prluciano.vercel.app${path}`);
  }, [title, description, path]);
}
