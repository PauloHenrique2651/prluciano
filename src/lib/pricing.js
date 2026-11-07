// Prices from the Eternal Eleven "Programa de Reclutamiento Universitario y Becas Deportivas" sheet (USD).
// Plans are cumulative: each one builds on the one before it.
export const PLANS = [
  {
    key: "basic",
    name: "Basic College Pathway",
    short: "Basic",
    outcome: "Get the athlete's record ready",
    price: 55,
    was: 115,
    period: "/month",
    promo: { code: "ETERNAL52", off: "52% off", label: "Launch offer" },
    text: "Sports profile, résumé and initial guidance.",
    features: ["Athletic profile", "Academic and athletic résumé", "Initial college guidance"],
  },
  {
    key: "college-recruitment",
    name: "College Recruitment",
    short: "College Recruitment",
    outcome: "Get in front of college coaches",
    price: 195,
    period: "/month",
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
    outcome: "Go after scholarships",
    price: 295,
    period: "/month",
    text: "Full guidance, applications and scholarship search.",
    plus: "Everything in College Recruitment, plus",
    features: ["Full guidance through the process", "Help preparing university applications", "Academic and athletic scholarship search"],
  },
  {
    key: "full-recruitment",
    name: "Full Recruitment",
    short: "Full",
    outcome: "Hand us the whole process",
    priceLabel: "US$1,500–3,000",
    priceSub: "based on the scope of the process",
    text: "Personalized support throughout the entire process.",
    plus: "Everything in Premium, with",
    features: ["Personalized one-to-one support", "Accompaniment from first contact to decision"],
  },
];

/** Price as written in messages and the application, e.g. "US$55/month (launch code ETERNAL52, regular US$115)". */
export function planPriceText(p) {
  if (!p.price) return p.priceLabel;
  const base = `US$${p.price}/month`;
  return p.promo ? `${base} (launch code ${p.promo.code}, regular US$${p.was})` : base;
}

// What each plan includes, for the comparison table. `from` is the first plan (0-3) that includes it.
export const PLAN_COMPARE = [
  { label: "Athletic profile", from: 0 },
  { label: "Academic and athletic résumé", from: 0 },
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
    a: "After we read your application and explain what the plan involves for your athlete. Nothing is paid before that.",
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
