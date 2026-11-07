import Hero from "../sections/Hero.jsx";
import Pillars from "../sections/Pillars.jsx";
import Pathway from "../sections/Pathway.jsx";
import Programs from "../sections/Programs.jsx";
import { PlanStrip } from "../sections/Pricing.jsx";
import { About, LE11, Club, Education, Coach, Team, Why, FinalCTA, Contact, PillarBand, TaglineBand } from "../sections/Story.jsx";
import { useSeo } from "../components/ui.jsx";

export default function Home({ introDone }) {
  useSeo({
    title: "Eternal Eleven Agency | Football Development & College Pathways",
    description:
      "Premium international football development for young athletes: five-pillar training, US football experiences and academic support for college soccer pathways.",
    path: "/",
  });
  return (
    <>
      <Hero play={introDone} />
      <About />
      <PillarBand />
      <Pillars />
      <Pathway />
      <Programs />
      <PlanStrip />
      <LE11 />
      <Club />
      <Education />
      <Coach />
      <Team />
      <Why />
      <TaglineBand />
      <FinalCTA />
      <Contact />
    </>
  );
}
