import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Launches } from "@/components/sections/launches";
import { LiveDemo } from "@/components/sections/live-demo";
import { Metrics } from "@/components/sections/metrics";
import { Pillars } from "@/components/sections/pillars";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { getDictionary } from "@/i18n";

export default function HomePage() {
  const dict = getDictionary();

  return (
    <>
      <Hero dict={dict.hero} />
      <StackMarquee dict={dict.stack} />
      <Pillars dict={dict.pillars} chatLabels={dict.chat} />
      <Metrics dict={dict.metrics} />
      <Projects dict={dict.projects} />
      <Launches dict={dict.launches} />
      <Process dict={dict.process} />
      <LiveDemo dict={dict.demo} />
      <Testimonials dict={dict.testimonials} />
      <Contact dict={dict.contact} />
    </>
  );
}
