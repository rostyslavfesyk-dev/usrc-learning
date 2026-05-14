"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Only registers on the client. Idempotent — GSAP guards against duplicates.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type RevealOptions = {
  /** Translate-Y offset to animate from. Default 12px. */
  y?: number;
  /** Delay before this reveal starts. */
  delay?: number;
  /** ScrollTrigger `start` — default "top 85%". */
  start?: string;
};

/**
 * Single-element scroll-triggered entrance reveal.
 * Skipped when prefers-reduced-motion is set.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  opts: RevealOptions = {},
) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.from(el, {
        y: opts.y ?? 12,
        opacity: 0,
        duration: 0.55,
        delay: opts.delay ?? 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? "top 85%",
          once: true,
        },
      });
    },
    { scope: ref as RefObject<HTMLElement> },
  );
}

type StaggerOptions = {
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
};

/**
 * Reveal a group of children inside `containerRef` matching `childSelector`,
 * with a stagger. Use `[data-reveal]` on the children that should animate.
 */
export function useStagger(
  containerRef: RefObject<HTMLElement | null>,
  childSelector: string,
  opts: StaggerOptions = {},
) {
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || prefersReducedMotion()) return;
      const targets = container.querySelectorAll(childSelector);
      if (targets.length === 0) return;
      gsap.from(targets, {
        y: opts.y ?? 12,
        opacity: 0,
        duration: opts.duration ?? 0.5,
        stagger: opts.stagger ?? 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: opts.start ?? "top 85%",
          once: true,
        },
      });
    },
    { scope: containerRef as RefObject<HTMLElement> },
  );
}

/**
 * Convenience: create a typed ref for sections.
 */
export function useSectionRef<T extends HTMLElement = HTMLElement>() {
  return useRef<T>(null);
}
