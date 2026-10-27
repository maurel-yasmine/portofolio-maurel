import { HelmetContainer } from "@/components/HelmetContainer";
import { ProjectModule } from "@/modules/project";

/** Full project library route. */
export default function ProjectsPage() {
  return (
    <>
      <HelmetContainer page="/projects" />
      <ProjectModule />
    </>
  );
}
