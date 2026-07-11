import { Preloader } from "@/components/sections/Preloader";
import { Nav } from "@/components/sections/Nav";
import AetherFlowHero from "@/components/ui/aether-flow-hero";
import { Marquee } from "@/components/sections/Marquee";
import { Capabilities } from "@/components/sections/Capabilities";
import { Break } from "@/components/sections/Break";
import { Work } from "@/components/sections/Work";
import { ScrollShowcase } from "@/components/sections/ScrollShowcase";
import { Team } from "@/components/sections/Team";
import { Tech } from "@/components/sections/Tech";
import { Process } from "@/components/sections/Process";
import { Reliability } from "@/components/sections/Reliability";
import { Testimonial } from "@/components/sections/Testimonial";
import { Faq } from "@/components/sections/Faq";
import { CtaFooter } from "@/components/sections/CtaFooter";

export default function Page() {
  return (
    <main id="top">
      <Preloader />
      <Nav />
      <AetherFlowHero />
      <Marquee />
      <Capabilities />
      <Break />
      <Work />
      <ScrollShowcase />
      <Team />
      <Tech />
      <Process />
      <Reliability />
      <Testimonial />
      <Faq />
      <CtaFooter />
    </main>
  );
}
