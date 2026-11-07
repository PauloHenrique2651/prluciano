import { useSeo } from "../components/ui.jsx";
import { openCookieSettings } from "../lib/consent.js";
import { PHONE_DISPLAY, WA_DEFAULT } from "../lib/site.js";

const UPDATED = "7 November 2026";

export default function Privacy() {
  useSeo({
    title: "Privacy & Cookies | Eternal Eleven Agency",
    description: "What Eternal Eleven Agency collects through this website, why, and how to change your cookie choices.",
    path: "/privacy",
  });
  return (
    <section className="page-head legal" aria-labelledby="privacy-title">
      <div className="wrap legal-wrap">
        <p className="kicker">Privacy &amp; cookies</p>
        <h1 id="privacy-title" className="display d-l">How this site handles your information.</h1>
        <p className="micro" style={{ marginTop: 16 }}>Last updated {UPDATED}</p>

        <div className="legal-body">
          <h2 className="display d-s">What we collect</h2>
          <p>
            When you send an application or an enquiry, we receive the details you type into the form: your name, email, phone or WhatsApp number, the athlete's age, country, current club, position, school year, the program you are interested in and your message. We use them only to answer you about Eternal Eleven programs.
          </p>
          <p>
            If you tap a WhatsApp button, the conversation happens inside WhatsApp and is covered by WhatsApp's own privacy policy.
          </p>

          <h2 className="display d-s">Cookies and storage on your device</h2>
          <ul>
            <li>
              <b>Essential.</b> We store your cookie choice in your browser so we don't ask again on every visit. This is always on.
            </li>
            <li>
              <b>Analytics.</b> Off unless you allow it. If enabled in the future, it would measure how pages are used, without identifying you.
            </li>
            <li>
              <b>Marketing.</b> Off unless you allow it. Used only if we run campaigns that need to measure results.
            </li>
          </ul>
          <p>
            At the time of writing the site does not load any analytics or marketing tools. Nothing optional is loaded until you agree to it.
          </p>
          <div className="btn-row" style={{ marginTop: 20 }}>
            <button className="btn btn-gold btn-sm" onClick={openCookieSettings}>Change cookie settings</button>
          </div>

          <h2 className="display d-s">Services that help run the site</h2>
          <p>
            The site is hosted on Vercel, which keeps standard technical logs (such as IP address and browser) to deliver pages securely. Typefaces are served by Google Fonts. Form messages are delivered to our team by email.
          </p>

          <h2 className="display d-s">Children's information</h2>
          <p>
            Many of our athletes are minors. Applications should be sent by a parent or guardian, and we only publish an athlete's record or profile with written parental consent.
          </p>

          <h2 className="display d-s">Your rights</h2>
          <p>
            You can ask to see, correct or delete the information you sent us, or withdraw consent at any time, under the Brazilian LGPD, the European GDPR or the law that applies to you. Contact us on WhatsApp at{" "}
            <a className="text-link" href={WA_DEFAULT} target="_blank" rel="noopener noreferrer">{PHONE_DISPLAY}</a> and we will reply.
          </p>
        </div>
      </div>
    </section>
  );
}
