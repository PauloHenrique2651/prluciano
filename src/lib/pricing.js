// Prices from the Eternal Eleven "Programa de Reclutamiento Universitario y Becas Deportivas" sheet (USD).
export const PLANS = [
  {
    key: "basic",
    name: "Basic College Pathway",
    price: 115,
    period: "/month",
    text: "Sports profile, résumé and initial guidance.",
  },
  {
    key: "college-recruitment",
    name: "College Recruitment",
    price: 195,
    period: "/month",
    recommended: true,
    text: "University search, contact with coaches, follow-up and a recommendation letter.",
    note: "6-month initial term · US$1,170 total",
  },
  {
    key: "premium-scholarship",
    name: "Premium Scholarship",
    price: 295,
    period: "/month",
    text: "Full guidance, applications and scholarship search.",
  },
  {
    key: "full-recruitment",
    name: "Full Recruitment",
    priceLabel: "US$1,500–3,000",
    text: "Personalized support throughout the entire process.",
  },
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

// Achievements from the sample record (Grade 5 athlete), grouped two years at a time, newest first.
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
