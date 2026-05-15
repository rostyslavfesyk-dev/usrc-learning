"use client";

import { useRef, useState } from "react";
import { RiArrowDownSLine, RiCheckLine, RiGroupLine, RiPencilLine, RiBookOpenLine } from "@remixicon/react";
import { curriculum, type Module } from "../_data/course";
import { useStagger } from "../../_lib/animations";

type TagItem = { label: string; body: string };

const tagIcons: Record<string, React.ElementType> = {
  "Workshop": RiGroupLine,
  "In-class practice": RiPencilLine,
  "Homework": RiBookOpenLine,
};

function ActivityCard({ label, body }: TagItem) {
  const Icon = tagIcons[label];
  return (
    <div className="rounded-md border border-border bg-surface-subtle px-4 py-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-fg-secondary">
        {Icon && <Icon size={12} aria-hidden="true" />}
        {label}
      </p>
      <p className="mt-1.5 line-clamp-3 text-body-sm leading-relaxed text-fg-secondary">{body}</p>
    </div>
  );
}

function buildTags(m: Module): { lessonId: string; tags: TagItem[] }[] {
  const workshops: TagItem[] = m.workshops?.map((w) => ({
    label: w.title.toLowerCase().includes("practice") ? "In-class practice" : "Workshop",
    body: w.body,
  })) ?? [];

  const slots = m.lessons.map((l) => ({ lessonId: l.id, tags: [] as TagItem[] }));
  if (slots.length === 0) return slots;

  const step = slots.length / (workshops.length + 1);
  workshops.forEach((tag, ai) => {
    const idx = Math.min(Math.round(step * (ai + 1)) - 1, slots.length - 1);
    slots[idx].tags.push(tag);
  });

  if (m.homework) slots[slots.length - 1].tags.push({ label: "Homework", body: m.homework.body });

  return slots;
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
  const tagSlots = buildTags(m);

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
            className="pl-[64px] pr-4 pb-6 pt-2 md:pl-[84px] md:pr-6 md:pb-8"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
              What you'll learn
            </p>
            <ul className="space-y-4">
              {m.lessons.map((lesson) => (
                <li key={lesson.id} className="flex items-start gap-3">
                  <RiCheckLine
                    aria-hidden="true"
                    size={16}
                    className="mt-0.5 shrink-0 text-usrc-crimson"
                  />
                  <span className="text-body-sm leading-relaxed text-fg-primary">
                    {lesson.title}
                  </span>
                </li>
              ))}
            </ul>
            {tagSlots.some((s) => s.tags.length > 0) && (
              <div className="mt-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">
                  Additional Activities
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {tagSlots.flatMap((s, i) =>
                    s.tags.map((tag, ti) => (
                      <ActivityCard key={`${i}-${tag.label}-${ti}`} label={tag.label} body={tag.body} />
                    ))
                  )}
                </div>
              </div>
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
