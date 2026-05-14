"use client";

import { useRef } from "react";
import { RiFileTextLine } from "@remixicon/react";
import { includedMaterials } from "../_data/course";
import { useStagger } from "../../_lib/animations";

export function IncludedMaterials() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.04 });

  return (
    <section
      ref={ref}
      aria-labelledby="materials-heading"
      className="bg-surface"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            Take-home artifacts
          </span>
          <h2
            id="materials-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            {includedMaterials.heading}
          </h2>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {includedMaterials.items.map((item) => (
            <li
              key={item}
              data-reveal
              className="inline-flex items-center gap-2 rounded-pill bg-surface-muted px-4 py-2 text-body-sm font-medium text-fg-primary"
            >
              <RiFileTextLine
                aria-hidden="true"
                size={16}
                className="text-usrc-crimson"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
