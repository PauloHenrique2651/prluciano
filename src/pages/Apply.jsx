import { useSearchParams } from "react-router-dom";
import { WhatsappLogo } from "@phosphor-icons/react";
import ApplicationForm from "../components/ApplicationForm.jsx";
import { RevealLines, useSeo } from "../components/ui.jsx";
import { PHONE_DISPLAY, PROGRAM_OPTIONS, waLink } from "../lib/site.js";
import { PLANS, planPriceText } from "../lib/pricing.js";
import { Tag } from "@phosphor-icons/react";

const STEPS = [
  { name: "You apply", text: "Choose the program and tell us about the athlete. It takes about two minutes." },
  { name: "We read it", text: "The team looks at the athlete's age, level, position and goals." },
  { name: "You decide", text: "We come back with what the program involves and what it costs. Nothing is paid before that." },
];

export default function Apply() {
  useSeo({
    title: "Application & Enrollment | Eternal Eleven Agency",
    description: "Apply for an Eternal Eleven program: International Week, Athlete Profile & College Recruitment, LE11 training and more.",
    path: "/application-enrollment",
  });
  const [params] = useSearchParams();
  const pre = params.get("program");
  const defaultProgram = PROGRAM_OPTIONS.some((p) => p.value === pre) ? pre : "";
  const plan = PLANS.find((p) => p.key === params.get("plan"));
  const planLabel = plan ? `${plan.name}, ${planPriceText(plan)}` : "";

  return (
    <section className="page-head" aria-labelledby="apply-title" style={{ paddingBottom: "clamp(88px, 12vw, 160px)" }}>
      <div className="wrap apply">
        <aside className="apply-aside">
          <p className="kicker">Application &amp; enrollment</p>
          <RevealLines as="h1" className="display d-l" lines={["Start your", "athlete's application."]} />
          <ol className="apply-steps">
            {STEPS.map((s, i) => (
              <li className="apply-step" key={s.name}>
                <span className="num">{i + 1}</span>
                <div>
                  <h2 className="display d-s">{s.name}</h2>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <a className="btn btn-wa" href={waLink("Hello! I'd like to apply to an Eternal Eleven program and have a few questions first.")} target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
              Questions first? {PHONE_DISPLAY}
            </a>
          </div>
        </aside>
        <div id="apply-title">
          {plan && (
            <p className="apply-plan">
              <Tag size={18} weight="fill" aria-hidden="true" />
              Selected plan: <b>{planLabel}</b>
            </p>
          )}
          <ApplicationForm variant="full" formName="Application" defaultProgram={defaultProgram} extraFields={{ plan: planLabel }} />
        </div>
      </div>
    </section>
  );
}
