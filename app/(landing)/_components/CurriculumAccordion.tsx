"use client";

import { useRef, useState } from "react";
import { RiArrowDownSLine, RiArrowRightUpLine } from "@remixicon/react";
import { curriculum, type Module, type Resource, type ResourceType } from "../_data/course";
import { cn } from "../../_lib/cn";
import { useStagger } from "../../_lib/animations";

const resourceStyles: Record<ResourceType, string> = {
  article: "bg-ink-100 text-ink-700",
  video: "bg-usrc-crimson/10 text-usrc-crimson",
  workbook: "bg-ink-100 text-ink-700",
  practice: "bg-usrc-teal/10 text-usrc-teal",
  template: "bg-usrc-navy/10 text-usrc-navy",
  resource: "bg-ink-100 text-ink-700",
  "official docs": "bg-usrc-teal/10 text-usrc-teal",
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
      <span className="truncate">{r.label}</span>
      {r.duration ? (
        <span className="shrink-0 opacity-70" aria-hidden="true">
          · {r.duration}
        </span>
      ) : null}
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
          <p className="mt-1 hidden text-body-sm leading-relaxed text-fg-secondary md:line-clamp-2">
            {m.description}
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <span className="inline-flex items-center rounded-pill bg-ink-100 px-2.5 py-1 text-xs font-medium text-fg-secondary">
            {m.format}
          </span>
          <span className="inline-flex items-center rounded-pill bg-ink-100 px-2.5 py-1 text-xs font-medium text-fg-secondary">
            {m.duration}
          </span>
        </div>

        <RiArrowDownSLine
          aria-hidden="true"
          size={22}
          data-state={isOpen ? "open" : "closed"}
          className="shrink-0 text-fg-muted transition-transform duration-300 ease-[--ease-out] data-[state=open]:rotate-180 data-[state=open]:text-usrc-crimson"
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
            className="grid grid-cols-1 w-full gap-8 px-4 pb-6 pt-2 md:grid-cols-3 md:gap-10 md:px-6 md:pb-8"
          >
            <div className="min-w-0 md:col-span-2">
              <p className="text-body-sm leading-relaxed text-fg-secondary md:hidden">
                {m.description}
              </p>

              <div className="md:hidden mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-pill bg-ink-100 px-2.5 py-1 text-xs font-medium text-fg-secondary">
                  {m.format}
                </span>
                <span className="inline-flex items-center rounded-pill bg-ink-100 px-2.5 py-1 text-xs font-medium text-fg-secondary">
                  {m.duration}
                </span>
              </div>

              <p className="mt-4 rounded-md bg-surface-subtle px-4 py-3 text-body-sm leading-relaxed text-fg-primary shadow-[5px_5px_0_#5e98c3]">
                <span className="font-semibold text-usrc-crimson">Goal. </span>
                {m.goal}
              </p>

              <ol className="mt-6 space-y-5">
                {m.lessons.map((lesson) => (
                  <li key={lesson.id} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 font-mono text-small font-semibold text-usrc-navy"
                    >
                      {lesson.number}
                    </span>
                    <div className="min-w-0 flex-1">
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
                          {lesson.estimatedTime ? (
                            <span className="inline-flex items-center rounded-pill bg-transparent px-2 py-1 text-xs text-fg-muted">
                              {lesson.estimatedTime}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="min-w-0 space-y-5">
              {m.workshops?.map((w, i) => (
                <div key={i} className="rounded-lg bg-usrc-navy/5 p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-usrc-navy">
                    {w.title}
                  </h4>
                  <p className="mt-2 text-body-sm leading-relaxed text-fg-secondary">
                    {w.body}
                  </p>
                </div>
              ))}
              {m.homework ? (
                <div className="rounded-lg border border-border p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-usrc-crimson">
                    Homework
                  </h4>
                  <p className="mt-2 text-body-sm leading-relaxed text-fg-primary">
                    {m.homework.body}
                  </p>
                </div>
              ) : null}
              <div className="rounded-lg border border-border p-5">
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-usrc-crimson">
                  Module outcome
                </h4>
                <p className="mt-2 text-body-sm leading-relaxed text-fg-primary">
                  {m.outcome}
                </p>
              </div>
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
            The 11 modules
          </span>
          <h2
            id="curriculum-heading"
            className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy"
          >
            {curriculum.heading}
          </h2>
          <p className="mt-4 text-body leading-relaxed text-fg-secondary">
            Three phases, eleven modules. Open a module to see the lessons, in-class
            workshop, and the artifact participants leave with.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {curriculum.phases.map((phase) => (
            <div key={phase.id} data-reveal>
              <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-2 border-usrc-navy pb-3">
                <span className="inline-flex items-center rounded-pill bg-usrc-crimson px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-fg-on-dark">
                  Phase {phase.number}
                </span>
                <h3 className="text-[length:var(--text-h4)] font-semibold tracking-tight text-fg-primary">
                  {phase.name}
                </h3>
                <span className="text-small text-fg-secondary">
                  {phase.modulesRange} · {phase.duration}
                </span>
              </header>
              <p className="mt-3 max-w-3xl text-body-sm leading-relaxed text-fg-secondary">
                {phase.tagline}
              </p>

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
