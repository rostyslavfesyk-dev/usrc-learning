"use client";

import { useRef } from "react";
import { courseStructure } from "../_data/course";
import { useStagger } from "../../_lib/animations";

export function CourseStructureOverview() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.08 });

  return (
    <section
      ref={ref}
      aria-labelledby="structure-heading"
      className="bg-surface"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            How the course is organized
          </span>
          <h2
            id="structure-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            {courseStructure.heading}
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {courseStructure.phases.map((p) => (
            <li
              key={p.number}
              data-reveal
              className="rounded-lg border border-border bg-surface p-6 md:p-7"
            >
              <div>
                <div className="inline-flex items-center gap-2 rounded-pill bg-usrc-crimson/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-usrc-crimson">
                  Phase {p.number}
                </div>
                <h3 className="mt-4 text-[length:var(--text-h4)] font-semibold tracking-tight text-fg-primary">
                  {p.name}
                </h3>
                <div className="mt-2 text-small text-fg-secondary">
                  <span>{p.duration}</span>
                </div>
                <p className="mt-4 text-body-sm leading-relaxed text-fg-secondary">
                  {p.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
