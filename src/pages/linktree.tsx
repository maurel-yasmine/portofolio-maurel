import { HelmetContainer } from "@/components/HelmetContainer";
import { LinktreeModule } from "@/modules/linktree";

/** Linktree route. */
export default function LinktreePage() {
  return (
    <>
      <HelmetContainer page="/linktree" />
      <LinktreeModule />
    </>
  );
}
