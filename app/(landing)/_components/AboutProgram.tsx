"use client";

import { useRef } from "react";
import { aboutProgram } from "../_data/course";
import { useStagger } from "../../_lib/animations";

export function AboutProgram() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.08 });

  return (
    <section
      ref={ref}
      aria-labelledby="program-heading"
      className="bg-surface"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-24">
        <div className="lg:col-span-4" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            Why this program exists
          </span>
          <h2
            id="program-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            Validate ideas before design and development pick them up
          </h2>
        </div>

        <div className="mt-8 lg:col-span-8 lg:mt-0">
          {aboutProgram.paragraphs.map((p, idx) => (
            <p
              key={idx}
              data-reveal
              className={
                idx === 0
                  ? "text-body-lg leading-relaxed text-fg-primary"
                  : "mt-5 text-body leading-relaxed text-fg-secondary"
              }
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
