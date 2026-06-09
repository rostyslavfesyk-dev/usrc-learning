"use client";

import { useRef } from "react";
import {
  RiCheckLine,
  RiCloseLine,
  RiSlideshowLine,
  RiArticleLine,
  RiEditBoxLine,
  RiFileCopyLine,
  RiChatSmile2Line,
} from "@remixicon/react";
import { basicDetails } from "../_data/course";
import { useStagger } from "../../_lib/animations";

const formatIcons: Record<string, React.ElementType> = {
  Presentation: RiSlideshowLine,
  Exercises: RiEditBoxLine,
  Reading: RiArticleLine,
  "Reusable Templates": RiFileCopyLine,
  "Reusable Prompts": RiChatSmile2Line,
};

export function AudienceOutcome() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.06 });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-page px-5 pt-16 pb-6 md:px-8 md:pt-20 md:pb-8 lg:px-12 lg:pt-24 lg:pb-10">
        <div className="space-y-10">

          {/* Format — horizontal row */}
          <div data-reveal>
            <h2
              id="about-heading"
              className="mb-10 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
            >
              Format
            </h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {basicDetails.format.map((f) => {
                const Icon = formatIcons[f.label] ?? RiSlideshowLine;
                return (
                  <li key={f.label} className="flex flex-1 flex-col items-start">
                    <Icon size={24} aria-hidden="true" className="mb-3 text-usrc-crimson" />
                    <p className="text-body-sm font-semibold leading-snug text-fg-primary">{f.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-fg-secondary">{f.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Cards row: In scope + Out of scope */}
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              data-reveal
              className="rounded-lg border border-border bg-surface-subtle p-5"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <RiCheckLine size={18} aria-hidden="true" className="shrink-0 text-usrc-navy" />
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-usrc-navy">In scope</dt>
              </div>
              <dd className="text-body-sm leading-relaxed text-fg-primary">
                {basicDetails.inScope}
              </dd>
            </div>
            <div
              data-reveal
              className="rounded-lg border border-border bg-surface-subtle p-5"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <RiCloseLine size={18} aria-hidden="true" className="shrink-0 text-usrc-navy" />
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-usrc-navy">Out of scope</dt>
              </div>
              <dd className="text-body-sm leading-relaxed text-fg-primary">
                {basicDetails.outOfScope}
              </dd>
            </div>
          </dl>

        </div>
      </div>
    </section>
  );
}
