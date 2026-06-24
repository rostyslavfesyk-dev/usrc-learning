"use client";

import { useRef, useState, Fragment } from "react";
import { RiArrowDownSLine, RiCheckLine, RiGroupLine, RiBookOpenLine, RiSlideshowLine, RiLightbulbLine, RiFileList3Line, RiArticleLine, RiEditBoxLine } from "@remixicon/react";
import { curriculum, type Module, type Lesson } from "../_data/course";
import { useStagger } from "../../_lib/animations";
import { TemplatePreviewModal } from "./TemplatePreviewModal";

const stepIcons: Record<string, React.ElementType> = {
  Lecture: RiSlideshowLine,
  Presentation: RiSlideshowLine,
  Workshop: RiGroupLine,
  Exercises: RiEditBoxLine,
  "Live Exercises": RiEditBoxLine,
  Reading: RiArticleLine,
  Homework: RiBookOpenLine,
  "Reusable Practice Assets": RiFileList3Line,
};

const stepEstimates: Record<string, string> = {
  Workshop: "~45 min",
  Exercises: "25 min",
  "Live Exercises": "25 min",
  Reading: "15 min",
  Homework: "~1 hour",
  "Reusable Practice Assets": "",
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
        <div className="flex items-center gap-2 mb-3 h-7">
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
  disabled = false,
  onPreviewTemplate,
}: {
  m: Module;
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  onPreviewTemplate?: (t: { label: string; fileName?: string; content?: string; promptContent?: string }) => void;
}) {
  const triggerId = `module-trigger-${m.id}`;
  const panelId = `module-panel-${m.id}`;

  const order: Record<string, number> = { Workshop: 0, Exercises: 0, Reading: 1, "Reusable Practice Assets": 2, Homework: 2 };

  // Sectioned modules (e.g. module-01): use sections data
  const hasSections = !!m.sections;
  const lessonMap = hasSections
    ? new Map(m.lessons.map((l) => [l.id, l]))
    : null;

  // Flat modules: build activities from workshops + reading + homework + templates
  const activities = hasSections
    ? []
    : [
        ...(m.workshops?.map((w) => ({
          label: w.title,
          body: w.body,
          items: w.items,
          links: undefined as { label: string; url: string }[] | undefined,
        })) ?? []),
        ...(m.reading ? [{ label: "Reading", body: m.reading.body, items: undefined, links: m.reading.items }] : []),
        ...(m.templates ? [{ label: "Reusable Practice Assets", body: "", items: undefined, links: undefined, templateFiles: m.templates }] : []),
        ...(m.homework ? [{ label: "Homework", body: m.homework.body, items: m.homework.items, links: undefined as { label: string; url: string }[] | undefined }] : []),
      ].sort((a, b) => (order[a.label] ?? 0) - (order[b.label] ?? 0));

  return (
    <li className="border-b border-border last:border-b-0">
      <div
        id={triggerId}
        role={disabled ? undefined : "button"}
        tabIndex={disabled ? undefined : 0}
        aria-expanded={disabled ? undefined : isOpen}
        aria-controls={disabled ? undefined : panelId}
        onClick={disabled ? undefined : onToggle}
        onKeyDown={disabled ? undefined : (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
        className={`group flex w-full items-center gap-3 px-4 py-5 text-left md:gap-5 md:px-6 md:py-6 ${disabled ? "cursor-default" : "cursor-pointer transition-colors hover:bg-surface-subtle focus-visible:bg-surface-subtle"}`}
      >
        <span
          aria-hidden="true"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-mono text-small font-semibold md:h-10 md:w-10 ${disabled ? "bg-ink-200 text-fg-muted" : "bg-usrc-crimson text-fg-on-dark"}`}
        >
          {m.number}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-[length:var(--text-h5)] font-semibold leading-snug tracking-tight text-fg-primary">
            {m.title}
          </h3>
          <p className={`mt-1 hidden max-w-xl text-[13px] leading-relaxed text-fg-secondary ${isOpen ? "md:block" : "md:line-clamp-2"}`}>
            {m.description}
          </p>
        </div>

        {m.duration !== "TBD" && (
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <span className="inline-flex items-center rounded-pill bg-ink-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-fg-secondary">
              {m.duration}
            </span>
          </div>
        )}

        {!disabled && (
          <RiArrowDownSLine
            aria-hidden="true"
            size={22}
            data-state={isOpen ? "open" : "closed"}
            className="shrink-0 text-fg-muted transition-transform duration-300 ease-[--ease-out] data-[state=open]:rotate-180"
          />
        )}
      </div>

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
                      <TimelineStep label={m.format.split(/\s(.+)/)[0]} estimate={m.format.split(/\s(.+)/)[1] ?? "~30 min"} hasLine={!!section.activity}>
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
                          <p className="max-w-prose text-[13px] leading-relaxed text-fg-secondary">{section.activity.body}</p>
                        </TimelineStep>
                      )}
                    </Fragment>
                  );
                })}
                {m.homework && (
                  <TimelineStep label="Homework" estimate="~1 hour" hasLine={false}>
                    <p className="max-w-prose text-[13px] leading-relaxed text-fg-secondary">{m.homework.body}</p>
                    {m.homework.items && (
                      <ul className="mt-2 list-disc pl-4 space-y-1">
                        {m.homework.items.map((item) => (
                          <li key={item} className="text-[13px] leading-relaxed text-fg-secondary">{item}</li>
                        ))}
                      </ul>
                    )}
                  </TimelineStep>
                )}
              </>
            ) : (
              <>
                <TimelineStep
                  label={m.format.split(/\s(.+)/)[0]}
                  estimate={m.format.split(/\s(.+)/)[1] ?? "~30 min"}
                  hasLine={activities.length > 0 && activities[0].label !== "Reading" && activities[0].label !== "Homework"}
                >
                  <ul className="space-y-2.5">
                    {m.lectureTopics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2.5">
                        <RiCheckLine
                          aria-hidden="true"
                          size={14}
                          className="mt-0.5 shrink-0 text-usrc-crimson"
                        />
                        <span className="text-[13px] leading-relaxed text-fg-primary">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </TimelineStep>
                {activities.map((a, i) => {
                  const next = activities[i + 1];
                  // Connect workshop → next workshop only; Reading/Homework/Reusable Practice Assets are standalone
                  const connected = a.label !== "Reading" && a.label !== "Homework" && a.label !== "Reusable Practice Assets"
                    && !!next && next.label !== "Reading" && next.label !== "Homework" && next.label !== "Reusable Practice Assets";
                  return (
                    <TimelineStep
                      key={`${a.label}-${i}`}
                      label={a.label}
                      estimate={stepEstimates[a.label]}
                      hasLine={connected}
                      loose={!connected && i < activities.length - 1}
                    >
                      {a.body && <p className="max-w-prose text-[13px] leading-relaxed text-fg-secondary">{a.body}</p>}
                      {a.items && (
                        <ul className="mt-2 list-disc pl-4 space-y-1">
                          {a.items.map((item) => (
                            <li key={item} className="text-[13px] leading-relaxed text-fg-secondary">{item}</li>
                          ))}
                        </ul>
                      )}
                      {a.links && (
                        <ul className="mt-2 list-disc pl-4 space-y-1">
                          {a.links.map((link) => (
                            <li key={link.url} className="text-[13px] leading-relaxed">
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-usrc-navy underline decoration-usrc-navy/30 underline-offset-2 hover:decoration-usrc-navy">{link.label}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                      {"templateFiles" in a && a.templateFiles && (
                        <ul className="mt-2 list-disc pl-4 space-y-1">
                          {(a.templateFiles as { label: string; fileName?: string; content?: string; promptContent?: string }[]).map((t) => (
                            <li key={t.fileName ?? t.label} className="text-[13px] leading-relaxed">
                              <button
                                type="button"
                                onClick={() => onPreviewTemplate?.(t)}
                                className="text-usrc-navy underline decoration-usrc-navy/30 underline-offset-2 hover:decoration-usrc-navy"
                              >
                                {t.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </TimelineStep>
                  );
                })}
              </>
            )}

            {m.didYouKnow && m.didYouKnow.length > 0 && (
              <div className="mt-6 rounded-lg border border-border bg-surface-subtle p-4">
                <div className="flex items-center gap-2 mb-3">
                  <RiLightbulbLine aria-hidden="true" size={14} className="text-usrc-navy" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-usrc-navy">Did you know?</p>
                </div>
                <ul className="space-y-2">
                  {m.didYouKnow.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-usrc-navy/40" />
                      <span className="text-[13px] leading-relaxed text-fg-secondary">{fact}</span>
                    </li>
                  ))}
                </ul>
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
  const [previewTemplate, setPreviewTemplate] = useState<{ label: string; fileName?: string; content?: string; promptContent?: string } | null>(null);
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
            {curriculum.phases[0].name}
          </h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-fg-secondary">
            {curriculum.phases[0].tagline}{curriculum.phases[0].duration !== "TBD" ? ` Takes approximately ${curriculum.phases[0].duration} to complete.` : ""}
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
                  <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-fg-secondary">
                    {phase.tagline}{phase.duration !== "TBD" ? ` Takes approximately ${phase.duration} to complete.` : ""}
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
                    disabled={phase.number === 2}
                    onPreviewTemplate={setPreviewTemplate}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {previewTemplate && (
        <TemplatePreviewModal
          label={previewTemplate.label}
          fileName={previewTemplate.fileName}
          content={previewTemplate.content}
          promptContent={previewTemplate.promptContent}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </section>
  );
}
