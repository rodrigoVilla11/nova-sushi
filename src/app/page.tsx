import DotsNav from "src/components/DotsNav";
import Hero from "src/components/Hero";
import Location from "src/components/Location";
import MenuShowcase from "src/components/MenuShowcase";
import Franchise from "src/components/Franchise";
import SpotifyBlock from "src/components/SpotifyBlock";
import StickyCTA from "src/components/StickyCTA";
import Story from "src/components/Story";
import { STEPS } from "src/data/steps";


export default function Page() {
  return (
    <main className="relative">
      <DotsNav ids={["hero","menu","story","franquicias","location"]} />
      <StickyCTA />

      <section id="hero" className="section"><Hero /></section>
      <section id="menu" className="section"><MenuShowcase /></section>
      <section id="story" className="section"><Story title="Nuestra historia" kicker="Nõva Sushi" steps={STEPS}/></section>
      <section id="location" className="section"><Location /></section>
      <section id="franquicias" className="section"><Franchise whatsappNumber="5493512583838" email="info@nova-sushi.com" /></section>
      {/* <section id="sounds" className="section"><SpotifyBlock /></section> */}
    </main>
  );
}