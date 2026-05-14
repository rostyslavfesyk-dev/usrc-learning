"use client";

import { useRef } from "react";
import {
  RiMapLine,
  RiLayout3Line,
  RiPencilRulerLine,
  RiSearchEyeLine,
  RiSlideshowLine,
  RiPenNibLine,
  RiRobot2Line,
  RiCheckboxCircleLine,
  RiPresentationLine,
  RiFileTextLine,
} from "@remixicon/react";
import { outcomes } from "../_data/course";
import { useStagger } from "../../_lib/animations";

type IconComponent = typeof RiMapLine;

const icons: IconComponent[] = [
  RiMapLine,
  RiLayout3Line,
  RiPencilRulerLine,
  RiSearchEyeLine,
  RiSlideshowLine,
  RiPenNibLine,
  RiRobot2Line,
  RiCheckboxCircleLine,
  RiPresentationLine,
  RiFileTextLine,
];

export function SkillsOutcomes() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.04 });

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

        <ul className="mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {outcomes.items.map((text, idx) => {
            const Icon = icons[idx];
            return (
              <li key={idx} data-reveal className="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-usrc-crimson/10 text-usrc-crimson"
                >
                  <Icon size={18} />
                </span>
                <p className="text-body leading-relaxed text-fg-primary">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
