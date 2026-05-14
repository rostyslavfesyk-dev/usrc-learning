"use client";

import { useRef } from "react";
import { basicDetails } from "../_data/course";
import { useStagger } from "../../_lib/animations";

const blocks = [
  { label: "Audience", body: basicDetails.audience },
  { label: "Outcome", body: basicDetails.outcome },
  { label: "Format", body: basicDetails.format },
  { label: "Scope", body: basicDetails.scope },
];

export function AudienceOutcome() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.07 });

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="bg-surface-subtle"
    >
      <div className="relative mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            About the program
          </span>
          <h2
            id="about-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            Built for teams between business, users, design, and engineering
          </h2>
        </div>

        <dl className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {blocks.map((b) => (
            <div
              key={b.label}
              data-reveal
              className="rounded-lg border border-border bg-surface p-6 md:p-7"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-usrc-crimson">
                {b.label}
              </dt>
              <dd className="mt-3 text-body leading-relaxed text-fg-secondary">
                {b.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
