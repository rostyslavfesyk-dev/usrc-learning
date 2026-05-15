import { SiteHeader } from "./(landing)/_components/SiteHeader";
import { Hero } from "./(landing)/_components/Hero";
import { AudienceOutcome } from "./(landing)/_components/AudienceOutcome";
import { CurriculumAccordion } from "./(landing)/_components/CurriculumAccordion";
import { ToolsGrid } from "./(landing)/_components/ToolsGrid";
import { FAQ } from "./(landing)/_components/FAQ";
import { SiteFooter } from "./(landing)/_components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AudienceOutcome />
        <hr className="mx-auto max-w-page border-t border-border px-5 md:px-8 lg:px-12" />
        <CurriculumAccordion />
        <ToolsGrid />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}
