import { About as AboutIntro } from "@/modules/home/section/about";

/**
 * About page: the shared About section with the page title folded into it.
 * Keeping both titles inside one section removes the boundary between the
 * "About Me" block and "The Mind Behind The Code".
 */
export function AboutModule() {
  return <AboutIntro pageTitle="About Me" />;
}
