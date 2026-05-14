"use client";

import { useRef, useState } from "react";
import { RiAddLine } from "@remixicon/react";
import { faq } from "../_data/course";
import { useStagger } from "../../_lib/animations";

export function FAQ() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.05 });

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      id="faq"
      ref={ref}
      aria-labelledby="faq-heading"
      className="bg-surface"
    >
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20 lg:py-24">
        <div className="max-w-2xl" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            Quick answers
          </span>
          <h2
            id="faq-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            {faq.heading}
          </h2>
        </div>

        <ul className="mt-10 divide-y divide-border border-y border-border">
          {faq.items.map((item) => {
            const isOpen = openIds.has(item.id);
            const triggerId = `faq-trigger-${item.id}`;
            const panelId = `faq-panel-${item.id}`;
            return (
              <li key={item.id} data-reveal>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[length:var(--text-h5)] font-medium tracking-tight text-fg-primary">
                    {item.question}
                  </span>
                  <RiAddLine
                    aria-hidden="true"
                    size={22}
                    data-state={isOpen ? "open" : "closed"}
                    className="shrink-0 text-usrc-crimson transition-transform duration-300 ease-[--ease-out] data-[state=open]:rotate-45"
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  data-state={isOpen ? "open" : "closed"}
                  className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[--ease-out] data-[state=open]:grid-rows-[1fr]"
                >
                  <div className="overflow-hidden">
                    <div
                      {...(isOpen ? {} : { inert: true })}
                      className="pb-5 pr-10"
                    >
                      <p className="text-body leading-relaxed text-fg-secondary">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
