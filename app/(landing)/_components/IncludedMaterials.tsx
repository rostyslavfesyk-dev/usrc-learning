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

        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {includedMaterials.items.map((item) => (
            <li
              key={item}
              data-reveal
              className="flex flex-col rounded-lg border border-border bg-surface-subtle p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-usrc-crimson/10 text-usrc-crimson">
                <RiFileTextLine aria-hidden="true" size={20} />
              </span>
              <p className="mt-4 text-body-sm font-medium leading-snug text-fg-primary">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
