import { SiteHeader } from "./(landing)/_components/SiteHeader";
import { Hero } from "./(landing)/_components/Hero";
import { AudienceOutcome } from "./(landing)/_components/AudienceOutcome";
import { AboutProgram } from "./(landing)/_components/AboutProgram";
import { SkillsOutcomes } from "./(landing)/_components/SkillsOutcomes";
import { CourseFacts } from "./(landing)/_components/CourseFacts";
import { CurriculumAccordion } from "./(landing)/_components/CurriculumAccordion";
import { ToolsGrid } from "./(landing)/_components/ToolsGrid";
import { IncludedMaterials } from "./(landing)/_components/IncludedMaterials";
import { FAQ } from "./(landing)/_components/FAQ";
import { SkillsAfterCourse } from "./(landing)/_components/SkillsAfterCourse";
import { SiteFooter } from "./(landing)/_components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AudienceOutcome />
        <AboutProgram />
        <SkillsOutcomes />
        <CourseFacts />
        <CurriculumAccordion />
        <ToolsGrid />
        <IncludedMaterials />
        <FAQ />
        <SkillsAfterCourse />
      </main>
      <SiteFooter />
    </>
  );
}
