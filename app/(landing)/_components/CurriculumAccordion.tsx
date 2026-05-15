"use client";

import { useRef, useState } from "react";
import { RiArrowDownSLine, RiArrowRightUpLine, RiGroupLine, RiTaskLine } from "@remixicon/react";
import { curriculum, courseStructure, type Module, type Resource, type ResourceType } from "../_data/course";
import { cn } from "../../_lib/cn";
import { useStagger } from "../../_lib/animations";

const resourceStyles: Record<ResourceType, string> = {
  article: "bg-usrc-navy/10 text-usrc-navy",
  video: "bg-usrc-navy/10 text-usrc-navy",
  workbook: "bg-usrc-navy/10 text-usrc-navy",
  practice: "bg-usrc-navy/10 text-usrc-navy",
  template: "bg-usrc-navy/10 text-usrc-navy",
  resource: "bg-usrc-navy/10 text-usrc-navy",
  "official docs": "bg-usrc-navy/10 text-usrc-navy",
};

function ResourcePill({ r }: { r: Resource }) {
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex overflow-hidden max-w-full items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80",
        resourceStyles[r.type],
      )}
    >
      <span className="truncate">{r.label.split(" — ")[0]}</span>
      <RiArrowRightUpLine
        aria-hidden="true"
        size={12}
        className="shrink-0 opacity-70"
      />
    </a>
  );
}

function ModuleRow({
  m,
  isOpen,
  onToggle,
}: {
  m: Module;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const triggerId = `module-trigger-${m.id}`;
  const panelId = `module-panel-${m.id}`;

  return (
    <li className="border-b border-border last:border-b-0">
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full items-center gap-3 px-4 py-5 text-left transition-colors hover:bg-surface-subtle focus-visible:bg-surface-subtle md:gap-5 md:px-6 md:py-6"
      >
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-usrc-crimson font-mono text-small font-semibold text-fg-on-dark md:h-10 md:w-10"
        >
          {m.number}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-[length:var(--text-h5)] font-semibold leading-snug tracking-tight text-fg-primary">
            {m.title}
          </h3>
          <p className="mt-1 hidden max-w-xl text-body-sm leading-relaxed text-fg-secondary md:line-clamp-2">
            {m.description}
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <span className="inline-flex items-center rounded-pill bg-ink-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-fg-secondary">
            {m.duration}
          </span>
        </div>

        <RiArrowDownSLine
          aria-hidden="true"
          size={22}
          data-state={isOpen ? "open" : "closed"}
          className="shrink-0 text-fg-muted transition-transform duration-300 ease-[--ease-out] data-[state=open]:rotate-180"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        data-state={isOpen ? "open" : "closed"}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[--ease-out] data-[state=open]:grid-rows-[1fr]"
      >
        <div className="overflow-hidden min-w-0">
          <div
            {...(isOpen ? {} : { inert: true })}
            className="flex flex-col w-full gap-8 pl-[64px] pr-4 pb-6 pt-2 md:pl-[84px] md:pr-6 md:pb-8"
          >
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="rounded-md bg-usrc-navy/5 px-4 py-3">
                <p className="text-body font-bold tracking-tight text-usrc-navy">Goal</p>
                <p className="mt-1.5 text-body-sm leading-relaxed text-fg-secondary">{m.goal}</p>
              </div>
              <div className="rounded-md bg-usrc-navy/5 px-4 py-3">
                <p className="text-body font-bold tracking-tight text-usrc-navy">Outcome</p>
                <p className="mt-1.5 text-body-sm leading-relaxed text-fg-secondary">{m.outcome}</p>
              </div>
            </div>

            <div className="min-w-0 max-w-2xl">
              <p className="text-body-sm leading-relaxed text-fg-secondary md:hidden">
                {m.description}
              </p>

              <div className="md:hidden mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-pill bg-ink-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-fg-secondary">
                  {m.duration}
                </span>
              </div>

              <ol className="mt-6 space-y-10">
                {m.lessons.map((lesson) => (
                  <li key={lesson.id} className="group relative">
                    <div aria-hidden="true" className="absolute -left-[30px] top-[2.75rem] w-px h-[calc(100%-2.75rem+2.5rem)] bg-border group-last:hidden md:-left-10" />
                    <span
                      aria-hidden="true"
                      className="absolute -left-12 top-0.5 z-10 flex h-9 w-9 items-center justify-center rounded-md bg-usrc-crimson/10 font-mono text-small font-semibold text-usrc-crimson md:-left-[60px] md:h-10 md:w-10"
                    >
                      {lesson.number}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-body font-semibold tracking-tight text-fg-primary">
                        {lesson.title}
                      </h4>
                      <p className="mt-1 text-body-sm leading-relaxed text-fg-secondary">
                        {lesson.description}
                      </p>
                      {lesson.resources.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {lesson.resources.map((r, idx) => (
                            <ResourcePill key={`${lesson.id}-r-${idx}`} r={r} />
                          ))}
                                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {m.workshops?.map((w, i) => (
                <div key={i} className="rounded-lg border border-border px-5 pt-5 pb-10">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-usrc-navy/10 text-usrc-navy">
                      <RiGroupLine size={15} aria-hidden="true" />
                    </span>
                    <h4 className="text-body font-bold tracking-tight text-fg-primary">
                      {w.title.toLowerCase().includes("practice") ? "In-class practice" : "In-class workshop"}
                    </h4>
                  </div>
                  <div className="relative mt-3">
                    <p className="line-clamp-5 text-body-sm leading-relaxed text-fg-secondary">
                      {w.body}
                    </p>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/70 to-transparent" />
                  </div>
                </div>
              ))}
              {m.homework ? (
                <div className="rounded-lg border border-border px-5 pt-5 pb-10">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-usrc-navy/10 text-usrc-navy">
                      <RiTaskLine size={15} aria-hidden="true" />
                    </span>
                    <h4 className="text-body font-bold tracking-tight text-fg-primary">
                      Homework
                    </h4>
                  </div>
                  <div className="relative mt-3">
                    <p className="line-clamp-5 text-body-sm leading-relaxed text-fg-primary">
                      {m.homework.body}
                    </p>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/70 to-transparent" />
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </div>
    </li>
  );
}

export function CurriculumAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.1 });

  return (
    <section
      id="curriculum"
      ref={ref}
      aria-labelledby="curriculum-heading"
      className="bg-surface"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="max-w-2xl" data-reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
            Phase 1
          </span>
          <h2
            id="curriculum-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            Foundation
          </h2>
          <p className="mt-3 max-w-3xl text-body-sm leading-relaxed text-fg-secondary">
            {curriculum.phases[0].tagline} Takes approximately {curriculum.phases[0].duration} to complete.
          </p>
        </div>

        <div className="mt-6 space-y-16">
          {curriculum.phases.map((phase) => (
            <div key={phase.id} data-reveal>
              {phase.number !== 1 && (
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
                    Phase {phase.number}
                  </span>
                  <h3 className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy">
                    {phase.name}
                  </h3>
                  <p className="mt-3 max-w-3xl text-body-sm leading-relaxed text-fg-secondary">
                    {phase.tagline} Takes approximately {phase.duration} to complete.
                  </p>
                </div>
              )}

              <ul className="mt-5 overflow-hidden rounded-lg border border-border bg-surface">
                {phase.modules.map((m) => (
                  <ModuleRow
                    key={m.id}
                    m={m}
                    isOpen={openId === m.id}
                    onToggle={() => setOpenId(openId === m.id ? null : m.id)}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
