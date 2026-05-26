import { SiteHeader } from "./(landing)/_components/SiteHeader";
import { Hero } from "./(landing)/_components/Hero";
import { AudienceOutcome } from "./(landing)/_components/AudienceOutcome";
import { CurriculumAccordion } from "./(landing)/_components/CurriculumAccordion";
import { FAQ } from "./(landing)/_components/FAQ";
import { SiteFooter } from "./(landing)/_components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AudienceOutcome />
        <CurriculumAccordion />
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}
