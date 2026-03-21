import DotsNav from "src/components/DotsNav";
import Hero from "src/components/Hero";
import Location from "src/components/Location";
import MenuShowcase from "src/components/MenuShowcase";
import HomeFranchiseCTA from "src/components/HomeFranchiseCTA";
import StickyCTA from "src/components/StickyCTA";
import Story from "src/components/Story";
import { STEPS } from "src/data/steps";

export default function Page() {
  return (
    <main className="relative">
      <DotsNav ids={["hero", "menu", "story", "franquicias", "location"]} />
      <StickyCTA />

      {/* ids viven dentro de cada componente: hero, menu, story, franquicias, location */}
      <Hero />
      <MenuShowcase />
      <Story title="Nuestra historia" kicker="Nõva Sushi" steps={STEPS} />
      <HomeFranchiseCTA />
      <section id="location" className="section"><Location /></section>
    </main>
  );
}
