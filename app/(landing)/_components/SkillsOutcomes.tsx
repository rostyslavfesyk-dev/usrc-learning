"use client";

import { useRef } from "react";
import { outcomes } from "../_data/course";
import { useStagger } from "../../_lib/animations";

export function SkillsOutcomes() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.07 });

  return (
    <section
      ref={ref}
      aria-labelledby="outcomes-heading"
      className="bg-surface-subtle"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            What you take away
          </span>
          <h2
            id="outcomes-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            {outcomes.heading}
          </h2>
        </div>

        <dl className="mt-12">
          {outcomes.groups.map((group) => (
            <div
              key={group.label}
              data-reveal
              className="grid grid-cols-1 gap-4 border-t border-border py-8 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-usrc-crimson md:pt-0.5">
                {group.label}
              </dt>
              <dd>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-usrc-navy/40"
                      />
                      {item.highlight ? (
                        <span className="inline rounded bg-usrc-navy/10 px-1.5 py-0.5 text-body leading-relaxed text-usrc-navy">
                          {item.text}
                        </span>
                      ) : (
                        <span className="text-body leading-relaxed text-fg-primary">{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
          <div className="border-t border-border" />
        </dl>
      </div>
    </section>
  );
}
