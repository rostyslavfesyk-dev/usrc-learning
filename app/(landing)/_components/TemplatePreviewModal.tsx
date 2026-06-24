"use client";

import { useEffect, useRef, useCallback, useState, Fragment } from "react";
import { RiCloseLine, RiDownloadLine, RiFileList3Line, RiFileCopyLine, RiCheckLine } from "@remixicon/react";

const PREVIEW_PAGES = [
  "/templates/workflow-discovery-page-1.png",
  "/templates/workflow-discovery-page-2.png",
];

/* ------------------------------------------------------------------ */
/*  Lightweight markdown-ish renderer                                  */
/* ------------------------------------------------------------------ */

function InlineText({ text }: { text: string }) {
  // Split on [PLACEHOLDER], **bold**, and `code`
  const parts = text.split(/(\[[\w\s\/,.'—:;!?&…]+\]|\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          return <span key={i} className="text-[#c96a00] font-medium">{part}</span>;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i} className="rounded bg-surface-subtle px-1 py-0.5 text-[12px] font-mono text-usrc-navy">{part.slice(1, -1)}</code>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function RenderedContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line → spacer
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-3" />);
      i++;
      continue;
    }

    // ## Heading 2
    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={i} className="mt-5 mb-2 text-[15px] font-bold text-usrc-navy">
          <InlineText text={line.slice(3)} />
        </h3>,
      );
      i++;
      continue;
    }

    // ### Heading 3
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={i} className="mt-4 mb-1.5 text-[14px] font-semibold text-fg-primary">
          <InlineText text={line.slice(4)} />
        </h4>,
      );
      i++;
      continue;
    }

    // Table block (lines starting with |)
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      // Filter out separator rows (| --- | --- |)
      const dataRows = tableLines.filter((r) => !r.match(/^\s*\|[\s-:|]+\|\s*$/));
      if (dataRows.length > 0) {
        const headerCells = dataRows[0].split("|").filter(Boolean).map((c) => c.trim());
        const bodyRows = dataRows.slice(1);
        elements.push(
          <div key={`table-${i}`} className="my-3 overflow-x-auto">
            <table className="w-full border-collapse text-[12px] leading-snug">
              <thead>
                <tr>
                  {headerCells.map((cell, ci) => (
                    <th key={ci} className="border border-border bg-surface-subtle px-2.5 py-1.5 text-left font-semibold text-fg-primary">
                      <InlineText text={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => {
                  const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                  return (
                    <tr key={ri}>
                      {cells.map((cell, ci) => (
                        <td key={ci} className="border border-border px-2.5 py-1.5 text-fg-secondary">
                          <InlineText text={cell} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>,
        );
      }
      continue;
    }

    // Unordered list (* or -)
    if (line.match(/^\s*[*-]\s/)) {
      const items: { indent: number; text: string }[] = [];
      while (i < lines.length && lines[i].match(/^\s*[*-]\s/)) {
        const match = lines[i].match(/^(\s*)[*-]\s(.*)$/);
        if (match) {
          items.push({ indent: match[1].length, text: match[2] });
        }
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-1.5 space-y-1">
          {items.map((item, li) => (
            <li
              key={li}
              className="flex items-start gap-2 text-[13px] leading-relaxed text-fg-primary"
              style={{ paddingLeft: `${Math.max(0, item.indent / 2) * 12}px` }}
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-fg-muted" aria-hidden="true" />
              <span><InlineText text={item.text} /></span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Numbered list
    if (line.match(/^\s*\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\s*\d+\.\s/)) {
        const match = lines[i].match(/^\s*\d+\.\s(.*)$/);
        if (match) items.push(match[1]);
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-1.5 list-decimal pl-5 space-y-1">
          {items.map((item, li) => (
            <li key={li} className="text-[13px] leading-relaxed text-fg-primary">
              <InlineText text={item} />
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-[13px] leading-relaxed text-fg-primary">
        <InlineText text={line} />
      </p>,
    );
    i++;
  }

  return <>{elements}</>;
}

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */

export function TemplatePreviewModal({
  label,
  fileName,
  content,
  onClose,
}: {
  label: string;
  fileName?: string;
  content?: string;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const isFileMode = !!fileName;
  const isCopyMode = !isFileMode;

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

  const handleCopy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          {isFileMode ? (
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
          ) : (
            <div className="mx-auto max-w-[640px] rounded bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] px-8 py-7 md:px-10 md:py-9">
              {content ? (
                <RenderedContent content={content} />
              ) : (
                <p className="text-center text-[13px] text-fg-muted italic py-8">
                  Content coming soon
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border bg-surface px-5 py-3.5 md:px-6">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-[13px] font-medium text-fg-secondary transition-colors hover:bg-surface-subtle"
          >
            Close
          </button>
          {isFileMode && fileName && (
            <>
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
            </>
          )}
          {isCopyMode && content && (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-md bg-usrc-crimson px-4 py-2 text-[13px] font-medium text-fg-on-dark transition-colors hover:bg-usrc-crimson-deep"
            >
              {copied ? (
                <>
                  <RiCheckLine size={14} aria-hidden="true" />
                  Copied!
                </>
              ) : (
                <>
                  <RiFileCopyLine size={14} aria-hidden="true" />
                  Copy to clipboard
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
