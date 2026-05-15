"use client";

import { useRef } from "react";
import { courseFacts } from "../_data/course";
import { useStagger } from "../../_lib/animations";

export function CourseFacts() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.06 });

  return (
    <section
      ref={ref}
      aria-labelledby="facts-heading"
      className="relative overflow-hidden bg-usrc-crimson text-fg-on-dark"
    >
      <div className="relative mx-auto max-w-page px-5 py-14 md:px-8 md:py-16 lg:px-12 lg:py-20">
        <h2 id="facts-heading" className="mb-10 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-white">
          Course Structure
        </h2>
        <ul className="grid grid-cols-3 gap-4 md:gap-5 lg:grid-cols-5 lg:gap-6">
          {courseFacts.stats.map((s) => (
            <li
              key={s.label}
              data-reveal
              className="flex flex-col items-center justify-center rounded-lg bg-white/8 px-4 py-4 text-center backdrop-blur-sm"
            >
              <div className="w-full text-center text-[length:var(--text-h3)] font-semibold leading-none tracking-tight text-white">
                {s.value}
              </div>
              <div className="mt-3 w-full text-center text-xs font-medium uppercase tracking-[0.16em] text-white/75">
                {s.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
