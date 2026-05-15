"use client";

import { useRef } from "react";
import { RiArrowRightUpLine } from "@remixicon/react";
import { tools } from "../_data/course";
import { useStagger } from "../../_lib/animations";

export function ToolsGrid() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.05 });

  return (
    <section
      id="tools"
      ref={ref}
      aria-labelledby="tools-heading"
      className="bg-surface-subtle"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            Module 09 in detail
          </span>
          <h2
            id="tools-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            {tools.heading}
          </h2>
          <p className="mt-4 text-body leading-relaxed text-fg-secondary">
            Five UI tools for prototype generation and two AI development tools so BAs
            understand the developer side of the handoff.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {tools.items.map((t) => {
            const isUI = t.group === "UI";
            return (
              <li key={t.id} data-reveal>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-usrc-navy/40 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-usrc-navy/40 focus-visible:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <img
                      src={t.logo}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-lg object-contain"
                    />
                    <RiArrowRightUpLine
                      aria-hidden="true"
                      size={18}
                      className="shrink-0 text-fg-muted"
                    />
                  </div>
                  <div>
                    <h3 className="text-[length:var(--text-h5)] font-semibold tracking-tight text-fg-primary">
                      {t.name}
                    </h3>
                    <span
                      className={
                        isUI
                          ? "mt-1 inline-flex items-center rounded-pill bg-usrc-crimson/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-usrc-crimson"
                          : "mt-1 inline-flex items-center rounded-pill bg-usrc-navy/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-usrc-navy"
                      }
                    >
                      {t.category}
                    </span>
                  </div>
                  <p className="text-body-sm leading-relaxed text-fg-secondary">
                    {t.tagline}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
