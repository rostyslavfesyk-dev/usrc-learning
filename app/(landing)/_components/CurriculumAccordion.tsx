"use client";

import { useRef, useState, Fragment } from "react";
import { RiArrowDownSLine, RiCheckLine, RiGroupLine, RiPencilLine, RiBookOpenLine, RiSlideshowLine } from "@remixicon/react";
import { curriculum, type Module, type Lesson } from "../_data/course";
import { useStagger } from "../../_lib/animations";

const stepIcons: Record<string, React.ElementType> = {
  Lecture: RiSlideshowLine,
  "Online Workshop": RiGroupLine,
  "Live practice": RiPencilLine,
  Homework: RiBookOpenLine,
};

const stepEstimates: Record<string, string> = {
  "Live practice": "~20 min",
  "Online Workshop": "~45 min",
  Homework: "~1 hour",
};

function TimelineStep({
  label,
  estimate,
  hasLine,
  loose = false,
  children,
}: {
  label: string;
  estimate?: string;
  hasLine: boolean;
  loose?: boolean;
  children: React.ReactNode;
}) {
  const Icon = stepIcons[label] ?? RiSlideshowLine;
  return (
    <div className={`relative flex gap-4 last:pb-0 ${loose ? "pb-10" : "pb-6"}`}>
      <div className="flex flex-col items-center">
        <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-fg-secondary">
          <Icon size={13} aria-hidden="true" />
        </span>
        {hasLine && <div className="absolute left-3.5 top-7 bottom-0 w-px -translate-x-px bg-border" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-3 mt-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted leading-none">
            {label}
          </p>
          {estimate && (
            <span className="text-xs text-fg-muted opacity-60 leading-none">{estimate}</span>
          )}
        </div>
        {children}
      </div>
    </div>
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

  const order: Record<string, number> = { "Live practice": 0, "Online Workshop": 1, Homework: 2 };

  // Sectioned modules (e.g. module-01): use sections data
  const hasSections = !!m.sections;
  const lessonMap = hasSections
    ? new Map(m.lessons.map((l) => [l.id, l]))
    : null;

  // Flat modules: build activities from workshops + homework
  const activities = hasSections
    ? []
    : [
        ...(m.workshops?.map((w) => ({
          label: w.title.toLowerCase().includes("practice") ? "Live practice" : "Online Workshop",
          body: w.body,
        })) ?? []),
        ...(m.homework ? [{ label: "Homework", body: m.homework.body }] : []),
      ].sort((a, b) => (order[a.label] ?? 0) - (order[b.label] ?? 0));

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
          <p className="mt-1 hidden max-w-xl text-[13px] leading-relaxed text-fg-secondary md:line-clamp-2">
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
            className="pl-[64px] pr-4 pb-6 pt-4 md:pl-[84px] md:pr-6 md:pb-8"
          >
            {hasSections ? (
              <>
                {m.sections!.map((section, si) => {
                  const sectionLessons = section.lessonIds
                    .map((id) => lessonMap!.get(id))
                    .filter((l): l is Lesson => !!l);
                  const isLastSection = si === m.sections!.length - 1;
                  // activity is a "break" step when something follows it (next section or homework)
                  const activityIsBreak = !isLastSection || !!m.homework;
                  return (
                    <Fragment key={si}>
                      <TimelineStep label="Lecture" estimate="~30 min" hasLine={!!section.activity}>
                        <ul className="space-y-2.5">
                          {sectionLessons.map((lesson) => (
                            <li key={lesson.id} className="flex items-start gap-2.5">
                              <RiCheckLine aria-hidden="true" size={14} className="mt-0.5 shrink-0 text-usrc-crimson" />
                              <span className="text-[13px] leading-relaxed text-fg-primary">{lesson.title}</span>
                            </li>
                          ))}
                        </ul>
                      </TimelineStep>
                      {section.activity && (
                        <TimelineStep
                          label={section.activity.label}
                          estimate={stepEstimates[section.activity.label]}
                          hasLine={false}
                          loose={activityIsBreak}
                        >
                          <p className="text-[13px] leading-relaxed text-fg-secondary">{section.activity.body}</p>
                        </TimelineStep>
                      )}
                    </Fragment>
                  );
                })}
                {m.homework && (
                  <TimelineStep label="Homework" estimate="~1 hour" hasLine={false}>
                    <p className="text-[13px] leading-relaxed text-fg-secondary">{m.homework.body}</p>
                  </TimelineStep>
                )}
              </>
            ) : (
              <>
                <TimelineStep label="Lecture" estimate="~30 min" hasLine={activities.length > 0}>
                  <ul className="space-y-2.5">
                    {m.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-start gap-2.5">
                        <RiCheckLine
                          aria-hidden="true"
                          size={14}
                          className="mt-0.5 shrink-0 text-usrc-crimson"
                        />
                        <span className="text-[13px] leading-relaxed text-fg-primary">
                          {lesson.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TimelineStep>
                {activities.map((a, i) => (
                  <TimelineStep
                    key={`${a.label}-${i}`}
                    label={a.label}
                    estimate={stepEstimates[a.label]}
                    hasLine={false}
                    loose={i < activities.length - 1}
                  >
                    <p className="text-[13px] leading-relaxed text-fg-secondary">{a.body}</p>
                  </TimelineStep>
                ))}
              </>
            )}
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
          <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-fg-secondary">
            {curriculum.phases[0].tagline} Takes approximately {curriculum.phases[0].duration} to complete.
          </p>
        </div>

        <div className="mt-6 space-y-16">
          {curriculum.phases.map((phase) => (
            <div key={phase.id} data-reveal>
              {phase.number !== 1 && (
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-usrc-crimson">
                    Phase {phase.number}{phase.name === "Optional" ? " (Optional)" : ""}
                  </span>
                  <h3 className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy">
                    {phase.name === "Optional" ? "Good to know" : phase.name}
                  </h3>
                  <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-fg-secondary">
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
