import { useEffect, useId, useRef, useState } from "react";
import { getLenis } from "../lib/scroll.js";
import { AnimatePresence, motion } from "framer-motion";
import { Check, WhatsappLogo } from "@phosphor-icons/react";
import { PHONE_DISPLAY, PROGRAM_OPTIONS, waLink } from "../lib/site.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v) {
  const e = {};
  if (!v.name?.trim()) e.name = "Enter the parent's or athlete's name.";
  if (!v.email?.trim()) e.email = "Enter an email so we can reply.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "This email looks incomplete. Check for a missing @ or domain.";
  if (!v.program) e.program = "Choose a program, or pick “Not sure yet”.";
  return e;
}

/**
 * Application / enquiry form. Posts to /api/submit with the same payload shape the site has always used.
 * variant="full" shows every field; "compact" keeps the home contact form short.
 */
export default function ApplicationForm({ variant = "full", formName = "Application", defaultProgram = "", extraFields = {} }) {
  const uid = useId();
  const formRef = useRef(null);
  const [values, setValues] = useState({ program: defaultProgram });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [touched, setTouched] = useState({});

  const successRef = useRef(null);
  useEffect(() => {
    if (status !== "sent") return;
    const t = setTimeout(() => {
      const el = successRef.current;
      if (!el) return;
      const lenis = getLenis();
      lenis ? lenis.scrollTo(el, { offset: -120, duration: 1 }) : el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus({ preventScroll: true });
    }, 300);
    return () => clearTimeout(t);
  }, [status]);

  const full = variant === "full";
  const set = (k) => (e) => {
    const v = { ...values, [k]: e.target.value };
    setValues(v);
    if (touched[k]) setErrors(validate(v));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, program: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const fields = {};
    for (const [k, v] of Object.entries(values)) if (typeof v === "string" && v.trim()) fields[k] = v.trim();
    const program = PROGRAM_OPTIONS.find((p) => p.value === values.program);
    if (program) fields.program = program.label;
    for (const [k, v] of Object.entries(extraFields)) if (v) fields[k] = v;
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_name: formName, fields, page_url: window.location.href, submission_id: crypto.randomUUID?.() }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const field = (name, label, { type = "text", required, autoComplete, textarea, hint, full: wide, inputMode } = {}) => {
    const id = `${uid}-${name}`;
    const err = touched[name] && errors[name];
    const Tag = textarea ? "textarea" : "input";
    return (
      <div className={`field ${wide ? "full" : ""}`}>
        <label htmlFor={id}>
          {label}
          {required && <span className="req" aria-hidden="true">*</span>}
        </label>
        <Tag
          id={id}
          name={name}
          type={textarea ? undefined : type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          required={required}
          value={values[name] || ""}
          onChange={set(name)}
          onBlur={required ? blur(name) : undefined}
          aria-invalid={err ? "true" : undefined}
          aria-describedby={err ? `${id}-err` : hint ? `${id}-hint` : undefined}
          rows={textarea ? 4 : undefined}
        />
        {hint && !err && <span className="field-hint" id={`${id}-hint`}>{hint}</span>}
        {err && <span className="field-error" id={`${id}-err`} role="alert">{err}</span>}
      </div>
    );
  };

  const waAfter = waLink(
    `Hello! I just sent an application for ${values.name || "my athlete"} through the website${values.program ? ` (${PROGRAM_OPTIONS.find((p) => p.value === values.program)?.label})` : ""}.`
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          ref={successRef}
          tabIndex={-1}
          className="form-success"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span className="icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.15 }}>
            <Check size={28} weight="bold" aria-hidden="true" />
          </motion.span>
          <h3 className="display d-m">Application received.</h3>
          <p>
            Thank you. Your details have reached Eternal Eleven Agency. We will come back to you about which program fits, what it involves and what it costs, before anything is paid.
          </p>
          <div className="btn-row">
            <a className="btn btn-wa" href={waAfter} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
              Speed it up on WhatsApp
            </a>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" ref={formRef} className="form" noValidate onSubmit={submit} exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}>
          <fieldset className="field">
            <legend>
              Program of interest<span className="req" aria-hidden="true">*</span>
            </legend>
            <div className="choice-grid" role="radiogroup" aria-describedby={errors.program && touched.program ? `${uid}-program-err` : undefined}>
              {PROGRAM_OPTIONS.map((p) => (
                <label className="choice" key={p.value}>
                  <input type="radio" name="program" value={p.value} checked={values.program === p.value} onChange={set("program")} />
                  <span className="choice-box">
                    <b>{p.label}</b>
                    <small>{p.hint}</small>
                  </span>
                </label>
              ))}
            </div>
            {touched.program && errors.program && (
              <span className="field-error" id={`${uid}-program-err`} role="alert">{errors.program}</span>
            )}
          </fieldset>

          <div className="form-grid">
            {field("name", "Your name", { required: true, autoComplete: "name" })}
            {field("email", "Email", { type: "email", required: true, autoComplete: "email", inputMode: "email" })}
            {field("phone", "Phone / WhatsApp", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            {field("athlete-age", "Athlete's age", { inputMode: "numeric" })}
            {full && field("country", "Country", { autoComplete: "country-name" })}
            {full && field("current-club", "Current club")}
            {full && field("position", "Position", { hint: "Defender, midfielder, striker, goalkeeper…" })}
            {full && field("grade", "School grade / year")}
            {field("message", full ? "What is the athlete aiming for?" : "Message", {
              textarea: true,
              full: true,
              hint: full ? "College soccer, an academy trial, a training week… Anything helps." : undefined,
            })}
          </div>

          {status === "error" && (
            <div className="form-status" role="alert">
              We couldn't send this. Check your connection and try again, or message us on WhatsApp at {PHONE_DISPLAY}.
            </div>
          )}

          <div className="form-foot">
            <button className="btn btn-gold btn-lg" type="submit" disabled={status === "sending"} aria-busy={status === "sending"}>
              {status === "sending" ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Sending application
                </>
              ) : (
                "Send application"
              )}
            </button>
            <p className="micro">We use your details only to answer this application.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
