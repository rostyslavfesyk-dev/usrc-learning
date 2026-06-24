"use client";

import { useEffect, useRef, useCallback } from "react";
import { RiCloseLine, RiDownloadLine, RiFileList3Line } from "@remixicon/react";

const PREVIEW_PAGES = [
  "/templates/workflow-discovery-page-1.png",
  "/templates/workflow-discovery-page-2.png",
];

export function TemplatePreviewModal({
  label,
  fileName,
  onClose,
}: {
  label: string;
  fileName: string;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal shell */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-[#e8e8e8] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-border bg-surface px-5 py-3.5 md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-usrc-crimson/10 text-usrc-crimson">
              <RiFileList3Line size={16} aria-hidden="true" />
            </span>
            <h2 className="truncate text-[length:var(--text-body)] font-semibold text-fg-primary">
              {label}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-surface-subtle hover:text-fg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-usrc-navy"
            aria-label="Close preview"
          >
            <RiCloseLine size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable image preview */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto flex flex-col gap-6 max-w-[640px]">
            {PREVIEW_PAGES.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${label} — page ${i + 1}`}
                className="w-full rounded bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)]"
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border bg-surface px-5 py-3.5 md:px-6">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-[13px] font-medium text-fg-secondary transition-colors hover:bg-surface-subtle"
          >
            Close
          </button>
          <a
            href={`/templates/${fileName.replace(/\.\w+$/, ".docx")}`}
            download
            className="inline-flex items-center gap-2 rounded-md bg-usrc-navy px-4 py-2 text-[13px] font-medium text-fg-on-dark transition-colors hover:bg-usrc-navy/85"
          >
            <RiDownloadLine size={14} aria-hidden="true" />
            Download .word
          </a>
          <a
            href={`/templates/${fileName}`}
            download
            className="inline-flex items-center gap-2 rounded-md bg-usrc-crimson px-4 py-2 text-[13px] font-medium text-fg-on-dark transition-colors hover:bg-usrc-crimson-deep"
          >
            <RiDownloadLine size={14} aria-hidden="true" />
            Download .pages
          </a>
        </div>
      </div>
    </div>
  );
}
