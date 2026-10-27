import { HelmetContainer } from "@/components/HelmetContainer";
import { HomeModule } from "@/modules/home";

/** Home route. */
export default function HomePage() {
  return (
    <>
      <HelmetContainer page="/" />
      <HomeModule />
    </>
  );
}
