import { SiteHeader } from "./(landing)/_components/SiteHeader";
import { Hero } from "./(landing)/_components/Hero";
import { AudienceOutcome } from "./(landing)/_components/AudienceOutcome";
import { SkillsOutcomes } from "./(landing)/_components/SkillsOutcomes";
import { CourseFacts } from "./(landing)/_components/CourseFacts";
import { CurriculumAccordion } from "./(landing)/_components/CurriculumAccordion";
import { ToolsGrid } from "./(landing)/_components/ToolsGrid";
import { IncludedMaterials } from "./(landing)/_components/IncludedMaterials";
import { FAQ } from "./(landing)/_components/FAQ";
import { SiteFooter } from "./(landing)/_components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AudienceOutcome />
        <SkillsOutcomes />
        <CourseFacts />
        <CurriculumAccordion />
        <ToolsGrid />
        <IncludedMaterials />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}
