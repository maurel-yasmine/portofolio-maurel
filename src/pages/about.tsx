import { HelmetContainer } from "@/components/HelmetContainer";
import { AboutModule } from "@/modules/about";

/** About route. */
export default function AboutPage() {
  return (
    <>
      <HelmetContainer page="/about" />
      <AboutModule />
    </>
  );
}
