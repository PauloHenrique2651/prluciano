export const PHONE_DISPLAY = "+1 (202) 880-2340";
export const PHONE_TEL = "+12028802340";

export function waLink(text) {
  const msg =
    text ||
    "Hello! I'm interested in learning more about Eternal Eleven Agency and its development programs. Could you please provide more information?";
  return `https://wa.me/12028802340?text=${encodeURIComponent(msg)}`;
}

export const WA_DEFAULT = waLink();

export const NAV = [
  { label: "About", to: "/#about" },
  { label: "Programs", to: "/#programs" },
  { label: "Leadership", to: "/#leadership" },
  { label: "Athlete Recruitment", to: "/athlete-recruitment" },
  { label: "Sponsors", to: "/sponsors" },
];

export const PILLARS = [
  {
    key: "physical",
    name: "Physical",
    text: "Speed, agility, coordination, mobility and recovery. The physical base that keeps technique intact once the game speeds up.",
    pos: [50, 80],
  },
  {
    key: "technical",
    name: "Technical",
    text: "Ball control, footwork, first touch, passing and finishing, drilled until they hold under pressure.",
    pos: [22, 56],
  },
  {
    key: "tactical",
    name: "Tactical",
    text: "Positioning, anticipation, game awareness and decision-making. Learning to read the game before the ball arrives.",
    pos: [78, 56],
  },
  {
    key: "psychological",
    name: "Psychological",
    text: "Confidence, focus, motivation and emotional control. The mental work that separates players of equal ability.",
    pos: [34, 26],
  },
  {
    key: "human",
    name: "Human",
    text: "Discipline, respect, responsibility, teamwork and education. The character that makes a career, and a life, sustainable.",
    pos: [66, 26],
  },
];

export const PROGRAMS = [
  {
    key: "international-week",
    name: "International Week",
    img: "stadium-kick",
    text: "An international development and exposure experience in the United States: daily training, a tournament, tactical sessions and sports psychology.",
    detail: "Editions have included Washington, D.C., New York and Miami.",
  },
  {
    key: "recruitment",
    name: "Athlete Profile & College Recruitment",
    img: "study-desk",
    text: "Athletic résumé, highlight video, college recruitment guidance and month-to-month management of the profile.",
    detail: "Built around what college coaches actually read and watch.",
    href: "/athlete-recruitment",
  },
  {
    key: "athlete-profile",
    name: "Eternal Eleven Athlete Profile",
    img: "coach-talk",
    text: "Creation and hosting of the athlete's professional profile, with academic and sporting detail and video in a single link.",
    detail: "One link to send to a coach or an admissions office.",
  },
  {
    key: "website-exposure",
    name: "Official Website Exposure",
    img: "stadium-walk",
    text: "Professional visibility for the athlete on Eternal Eleven's official website, in front of the families, coaches and clubs who already follow the program.",
    detail: "Visibility inside the network that already follows the program.",
  },
];

export const POSITIONS = [
  { name: "Defenders", text: "Defensive positioning, anticipation, tackling, marking, and decision-making." },
  { name: "Midfielders", text: "Ball control, passing accuracy, vision, movement, and transitions." },
  { name: "Strikers", text: "Finishing techniques, attacking movement, positioning, and goal-scoring instincts." },
];

export const WHY = [
  { name: "Experience", text: "Led by a program director with a professional career across several countries, an MLS MVP season and coaching experience inside the US system." },
  { name: "Personalized development", text: "Plans are built around the individual athlete: their position, their gaps and the level they are aiming for, not a fixed group schedule for everyone." },
  { name: "International exposure", text: "Football experiences in the United States, with editions that have included Washington, D.C., New York and Miami." },
  { name: "Education", text: "Academic progress is part of the program. Grades and an organized academic record are what keep an athlete's options open." },
  { name: "Discipline", text: "Standards for punctuality, effort and conduct are set on day one and held for the whole program, on and off the pitch." },
  { name: "Holistic approach", text: "Physical, technical, tactical, psychological and human development are trained as one system rather than five separate agendas." },
];

export const TEAM = [
  { name: "Luciano Emilio", role: "Founder & Executive Director", img: "team-luciano" },
  { name: "Emily de Barros", role: "Deputy Director of Operations & Student-Athlete Relations", img: "team-emily" },
  { name: "Ana Carolina", role: "Director of College Research, Admissions & Recruitment Applications", img: "team-ana" },
];

export const PROGRAM_OPTIONS = [
  { value: "international-week", label: "International Week", hint: "Training, tournament and exposure in the US" },
  { value: "athlete-recruitment", label: "Athlete Profile & College Recruitment", hint: "Résumé, highlight video, recruitment guidance" },
  { value: "athlete-profile", label: "Eternal Eleven Athlete Profile", hint: "Hosted profile in a single link" },
  { value: "website-exposure", label: "Official Website Exposure", hint: "Visibility on the Eternal Eleven website" },
  { value: "le11-training", label: "LE11 position training", hint: "Private and small-group sessions with Luciano" },
  { value: "general-information", label: "Not sure yet", hint: "Tell us about the athlete and we'll advise" },
];
