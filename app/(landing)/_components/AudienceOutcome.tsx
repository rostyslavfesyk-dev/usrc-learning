"use client";

import { useRef } from "react";
import { RiGroupLine, RiBook2Line, RiCompassLine } from "@remixicon/react";
import { useStagger } from "../../_lib/animations";

const blocks = [
  {
    label: "Audience",
    body: "Business Analysts, BSAs, and product-facing team members who work with requirements and user flows.",
    Icon: RiGroupLine,
  },
  {
    label: "Format",
    body: "Lectures, workshops, case studies, screen audits, workbook practice, AI-tool demos, and a final project.",
    Icon: RiBook2Line,
  },
  {
    label: "Scope",
    body: "Practical UX/UI judgment and AI prototyping literacy for requirements work — not production design or engineering.",
    Icon: RiCompassLine,
  },
];

export function AudienceOutcome() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.08 });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">

        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12 lg:gap-16">
          {blocks.map(({ label, body, Icon }) => (
            <div key={label} data-reveal className="flex flex-col items-start">
              <Icon size={24} aria-hidden="true" className="mb-4 text-usrc-navy" />
              <dt className="text-sm font-bold uppercase tracking-[0.12em] text-usrc-navy">
                {label}
              </dt>
              <dd className="mt-3 text-pretty text-body leading-relaxed text-fg-primary">
                {body}
              </dd>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}
