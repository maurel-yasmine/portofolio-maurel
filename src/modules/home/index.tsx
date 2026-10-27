import { ContactModule } from "@/modules/contact";
import { About } from "./section/about";
import { Hero } from "./section/hero";
import { RecentProjects } from "./section/recent-projects";
import { ScrollShowcase } from "./section/scroll-showcase";
import { Skills } from "./section/skills";

/** Home page: every section composed in order. */
export function HomeModule() {
  return (
    <>
      <Hero />
      <ScrollShowcase />
      <RecentProjects />
      <About />
      <Skills />
      <ContactModule />
    </>
  );
}
