// Prices from the Eternal Eleven "Programa de Reclutamiento Universitario y Becas Deportivas" sheet (USD).
// Plans are cumulative: each one builds on the one before it.
export const PLANS = [
  {
    key: "basic",
    name: "Basic College Pathway",
    short: "Basic",
    cta: "Start Basic",
    outcome: "Get the athlete's record ready",
    price: 115,
    period: "/month",
    // Square checkout link (subscription, US$115/month).
    pay: "https://square.link/u/OemCXOtw",
    // Young-athlete offer: 45% off for athletes 13 and under. Square has no discount-code field, so this needs its own
    // checkout link at the discounted price. Paste it into `pay` below once it exists; until then the button opens the application.
    youth: { off: 45, code: "ETERNAL45", label: "Young athlete offer", cta: "Claim 45% off", pay: null },
    text: "Sports profile, résumé and initial guidance.",
    features: ["Athletic profile", "Academic and athletic résumé", "Social media exposure", "Initial college guidance"],
  },
  {
    key: "college-recruitment",
    name: "College Recruitment",
    short: "College Recruitment",
    cta: "Start recruitment",
    outcome: "Get in front of college coaches",
    price: 195,
    period: "/month",
    pay: "https://square.link/u/qv3nDSs4",
    recommended: true,
    text: "University search, contact with coaches, follow-up and a recommendation letter.",
    note: "6-month initial term · US$1,170 total",
    plus: "Everything in Basic, plus",
    features: [
      "Universities matched to academic and athletic level",
      "Contact with college coaches and follow-up",
      "Recommendation letter",
      "Monthly meeting with the athlete and family",
      "Monthly report of contacts, replies and opportunities",
    ],
  },
  {
    key: "premium-scholarship",
    name: "Premium Scholarship",
    short: "Premium",
    cta: "Go Premium",
    outcome: "Go after scholarships",
    price: 295,
    period: "/month",
    pay: "https://square.link/u/8YKGgk3r",
    text: "Full guidance, applications and scholarship search.",
    plus: "Everything in College Recruitment, plus",
    features: ["Full guidance through the process", "Help preparing university applications", "Academic and athletic scholarship search"],
  },
  {
    key: "full-recruitment",
    name: "Full Recruitment",
    short: "Full",
    cta: "Start Full plan",
    outcome: "Hand us the whole process",
    price: 3000,
    period: "/year",
    pay: "https://square.link/u/0SaZehUb",
    note: "Lighter scope? Ask for a quote, from US$1,500",
    text: "Personalized support throughout the entire process.",
    plus: "Everything in Premium, with",
    features: ["Personalized one-to-one support", "Accompaniment from first contact to decision"],
  },
];

/** Age bands for the plan filter. Only the first one changes a price today (see `youth` on a plan). */
export const YOUTH_BAND = "u13";
export const AGE_BANDS = [
  { key: "u13", label: "13 and under", short: "Up to 13" },
  { key: "14-17", label: "14 to 17", short: "14 to 17" },
  { key: "18+", label: "18 and over", short: "18 and over" },
];

/** 63.25 stays 63.25, 115 stays 115. */
export const money = (n) => (Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2));

/** The plan as it applies to an athlete's age band: the young-athlete offer swaps in its price, code and checkout link. */
export function planFor(p, band) {
  const y = p.youth && band === YOUTH_BAND ? p.youth : null;
  if (!y) return p;
  return {
    ...p,
    price: Math.round(p.price * (100 - y.off)) / 100,
    was: p.price,
    promo: { code: y.code, off: `${y.off}% off`, label: y.label },
    cta: y.cta,
    pay: y.pay,
  };
}

/** Price as written in messages and the application, e.g. "US$63.25/month (45% off, code ETERNAL45, regular US$115)". */
export function planPriceText(p) {
  const base = `US$${money(p.price)}${p.period === "/year" ? "/year" : "/month"}`;
  return p.promo ? `${base} (${p.promo.off}, code ${p.promo.code}, regular US$${money(p.was)})` : base;
}

// What each plan includes, for the comparison table. `from` is the first plan (0-3) that includes it.
export const PLAN_COMPARE = [
  { label: "Athletic profile", from: 0 },
  { label: "Academic and athletic résumé", from: 0 },
  { label: "Social media exposure", from: 0 },
  { label: "Initial college guidance", from: 0 },
  { label: "Universities matched to the athlete's level", from: 1 },
  { label: "Contact with college coaches and follow-up", from: 1 },
  { label: "Recommendation letter", from: 1 },
  { label: "Monthly meeting with the athlete and family", from: 1 },
  { label: "Monthly report of contacts and opportunities", from: 1 },
  { label: "Help preparing university applications", from: 2 },
  { label: "Academic and athletic scholarship search", from: 2 },
  { label: "Full guidance through the process", from: 2 },
  { label: "Personalized one-to-one support", from: 3 },
  { label: "Accompaniment from first contact to decision", from: 3 },
];

export const START_STEPS = [
  { title: "Send the application", text: "A short form about the athlete: school, position, teams and goals." },
  { title: "We recommend a plan", text: "We read it, reply on WhatsApp or by phone and explain which plan fits and why." },
  { title: "You decide", text: "You only pay once you agree with the plan. Then we start on the athlete's record." },
];

export const RECOMMENDED_INCLUDES = [
  "Academic and athletic résumé, with the athlete's profile kept up to date",
  "Universities matched to the student's academic and athletic level",
  "Contact with college coaches and follow-up on their replies",
  "Research on academic and athletic scholarships, with guidance to apply",
  "A recommendation letter to support the recruitment process",
  "A monthly meeting with the student-athlete and family",
  "A monthly report of contacts, replies and opportunities",
];

export const PRICING_TERMS =
  "Exam fees, university application fees, travel and video production may be charged separately. The agency provides guidance and support; it does not guarantee university admission, coach offers or scholarships. Prices are commercial proposals and may be adjusted to the scope of the service.";

export const PRICING_FAQ = [
  {
    q: "Which plan should we start with?",
    a: "We recommend College Recruitment for most athletes: it covers the profile, the university search and direct contact with coaches. If the athlete's record isn't ready yet, Basic gets it there first. Send an application and we'll tell you which plan fits.",
  },
  {
    q: "Do you guarantee a scholarship or admission?",
    a: "No. We provide guidance and support and make the athlete a credible candidate. Admission, coach offers and scholarships are decided by the universities.",
  },
  {
    q: "What isn't included in the price?",
    a: "Exam fees, university application fees, travel and video production may be charged separately. We tell you about any of these before they apply.",
  },
  {
    q: "When do we pay?",
    a: "Pick a plan and pay securely through Square; we then ask for the athlete's details and start on the record. Not sure which plan fits? Send the application first and we'll recommend one. Nothing is paid until you agree with it.",
  },
];

// José Armando Rodríguez Chacón's achievements (Grade 5), grouped two years at a time, newest first.
export const RECORD_TIMELINE = [
  {
    years: "2026 – 2025",
    items: [
      { tag: "School", text: "97 out of 100 average across twelve subjects in the 2025–2026 school year" },
      { tag: "School", text: "Zero absences, zero tardies and an Outstanding conduct record" },
      { tag: "Camp", text: "Luciano Emilio Soccer Camp, Honduras (2026)" },
      { tag: "Camp", text: "Barça Academy Pro Miami (2025)" },
      { tag: "Camp", text: "Barça Academy Summer Camp, MDC Kendall (2025)" },
      { tag: "Tournament", text: "Copa Sin Fronteras, Guatemala (2025)" },
      { tag: "League", text: "Honduran youth leagues, 2025 and 2026 seasons" },
    ],
  },
  {
    years: "2024 – 2023",
    items: [
      { tag: "Camp", text: "Barça Academy Summer Camp, North Miami Beach (2024)" },
      { tag: "Tournament", text: "Copa Sin Fronteras, Guatemala (2024)" },
      { tag: "Clinic", text: "Barça Academy Clinic, Barcelona (2023)" },
      { tag: "League", text: "Honduran youth leagues, 2023 and 2024 seasons" },
    ],
  },
  {
    years: "2022 – 2021",
    items: [
      { tag: "League", text: "First season in the Honduran youth leagues (2022)" },
      { tag: "Academy", text: "Continued training with his youth academy and school team" },
    ],
  },
  {
    years: "2020 – 2019",
    items: [
      { tag: "Academy", text: "Joined a youth football academy in Honduras (2019)" },
      { tag: "School", text: "Joined his school team (2019)" },
    ],
  },
];

// José Armando's 2025–2026 report card (Grade 5), in the school's order.
export const JOSE_GRADES = [
  { subject: "Reading", grade: 91 },
  { subject: "Grammar", grade: 92 },
  { subject: "Spelling", grade: 95 },
  { subject: "Español", grade: 94 },
  { subject: "Science", grade: 97 },
  { subject: "Math", grade: 95 },
  { subject: "Social Studies", grade: 98 },
  { subject: "Estudios Sociales", grade: 99 },
  { subject: "Robotics and Technology", grade: 100 },
  { subject: "Physical Education", grade: 100 },
  { subject: "Art", grade: 97 },
  { subject: "Music", grade: 100 },
];
