"use client";

import { useRef } from "react";
import {
  RiSearchEyeLine,
  RiPaletteLine,
  RiMapLine,
  RiRobot2Line,
  RiCheckboxCircleLine,
  RiPresentationLine,
} from "@remixicon/react";
import { skillsAfterCourse } from "../_data/course";
import { useStagger } from "../../_lib/animations";

type IconComponent = typeof RiMapLine;

const icons: IconComponent[] = [
  RiSearchEyeLine,
  RiPaletteLine,
  RiMapLine,
  RiRobot2Line,
  RiCheckboxCircleLine,
  RiPresentationLine,
];

export function SkillsAfterCourse() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.06 });

  return (
    <section
      ref={ref}
      aria-labelledby="skills-after-heading"
      className="bg-surface-subtle"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            Capabilities after delivery
          </span>
          <h2
            id="skills-after-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            {skillsAfterCourse.heading}
          </h2>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {skillsAfterCourse.items.map((text, idx) => {
            const Icon = icons[idx];
            return (
              <li
                key={idx}
                data-reveal
                className="relative overflow-hidden rounded-lg border border-border bg-surface p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-1 -top-2 text-[5rem] font-bold leading-none text-ink-100"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="relative flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-usrc-crimson text-fg-on-dark"
                  >
                    <Icon size={20} />
                  </span>
                  <p className="text-body leading-relaxed text-fg-primary">{text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
