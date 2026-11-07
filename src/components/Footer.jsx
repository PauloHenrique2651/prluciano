import { NAV, PHONE_DISPLAY, PHONE_TEL, WA_DEFAULT } from "../lib/site.js";
import { SmartLink } from "./ui.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img className="footer-logo" src="/img/logo-800.webp" alt="Eternal Eleven Agency — College Soccer Pathways & Recruitment" width="800" height="533" loading="lazy" />
            <p className="footer-tagline">Your talent. Your education. Your future.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul className="footer-links">
              {NAV.map((n) => (
                <li key={n.to}>
                  <SmartLink to={n.to}>{n.label}</SmartLink>
                </li>
              ))}
              <li>
                <SmartLink to="/application-enrollment">Apply now</SmartLink>
              </li>
            </ul>
          </div>
          <div>
            <h4>Talk to us</h4>
            <ul className="footer-links">
              <li>
                <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <SmartLink to="/#contact">Send an enquiry</SmartLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Eternal Eleven Agency. All rights reserved.</span>
          <span>
            Desenvolvido por{" "}
            <a className="footer-credit" href="https://www.gideonsystems.com.br" target="_blank" rel="noopener">
              Gideon Systems
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
