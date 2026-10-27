import { HelmetContainer } from "@/components/HelmetContainer";
import { ContactModule } from "@/modules/contact";

/** Contact route. */
export default function ContactPage() {
  return (
    <>
      <HelmetContainer page="/contact" />
      <ContactModule standalone />
    </>
  );
}
