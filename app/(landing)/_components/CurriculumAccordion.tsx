"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RiArrowDownSLine, RiArrowRightUpLine, RiGroupLine, RiPencilLine, RiBookOpenLine } from "@remixicon/react";
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
        "inline-flex overflow-hidden max-w-[280px] items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-medium whitespace-nowrap transition-opacity hover:opacity-80",
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

type TagItem = { label: string; body: string };

type LessonWithTags = {
  lesson: (typeof curriculum.phases)[0]["modules"][0]["lessons"][0];
  tags: TagItem[];
};

function buildItems(m: Module): LessonWithTags[] {
  const workshops: TagItem[] = m.workshops?.map((w) => ({
    label: w.title.toLowerCase().includes("practice") ? "In-class practice" : "Workshop",
    body: w.body,
  })) ?? [];

  const items: LessonWithTags[] = m.lessons.map((lesson) => ({ lesson, tags: [] }));

  if (items.length === 0) return items;

  const step = items.length / (workshops.length + 1);

  workshops.forEach((tag, ai) => {
    const idx = Math.min(Math.round(step * (ai + 1)) - 1, items.length - 1);
    items[idx].tags.push(tag);
  });

  if (m.homework) items[items.length - 1].tags.push({ label: "Homework", body: m.homework.body });

  return items;
}

const tagIcons: Record<string, React.ElementType> = {
  "Workshop": RiGroupLine,
  "In-class practice": RiPencilLine,
  "Homework": RiBookOpenLine,
};

function ActivityTag({ label, body }: TagItem) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const Icon = tagIcons[label];

  function handleEnter() {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left, y: r.top });
  }

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setPos(null)}
        className="inline-flex cursor-default items-center gap-1.5 whitespace-nowrap rounded-pill bg-usrc-crimson/10 px-3 py-1 text-xs font-semibold text-usrc-crimson"
      >
        {Icon && <Icon size={12} aria-hidden="true" />}
        {label}
      </span>
      {pos && typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: pos.x,
              top: pos.y - 8,
              transform: "translateY(-100%)",
              zIndex: 9999,
            }}
            className="w-96 rounded-lg border border-border bg-white p-4 shadow-lg pointer-events-none"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-usrc-crimson">
              {label}
            </p>
            <p className="text-body-sm leading-relaxed text-fg-secondary">{body}</p>
          </div>,
          document.body,
        )}
    </>
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

              <ol className="mt-6 space-y-8">
                {buildItems(m).map(({ lesson, tags }) => (
                  <li key={lesson.id} className="group relative">
                    <div aria-hidden="true" className="absolute -left-[30px] top-[2.75rem] z-0 w-px h-[calc(100%-2.75rem+2rem)] bg-border group-last:hidden md:-left-10" />
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
                      {(lesson.resources.length > 0 || tags.length > 0) && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {lesson.resources.map((r, i) => (
                            <ResourcePill key={`${lesson.id}-r-${i}`} r={r} />
                          ))}
                          {tags.map((tag, ti) => (
                            <ActivityTag key={`${tag.label}-${ti}`} label={tag.label} body={tag.body} />
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

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
                    Phase {phase.number}{phase.name === "Optional" ? " (Optional)" : ""}
                  </span>
                  <h3 className="mt-4 text-[length:var(--text-h2)] font-light leading-tight tracking-tight text-usrc-navy">
                    {phase.name === "Optional" ? "Good to know" : phase.name}
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
