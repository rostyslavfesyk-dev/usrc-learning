"use client";

import { useRef, useEffect } from "react";
import { RiCheckboxCircleFill } from "@remixicon/react";
import { hero } from "../_data/course";
import { useStagger, prefersReducedMotion } from "../../_lib/animations";

function GenerativeLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const lines = 5;

      for (let i = 0; i < lines; i++) {
        const fi = i / (lines - 1);

        // Start: spread along bottom edge, shifted right
        const sx = w * (0.45 + fi * 0.35) + Math.sin(t * 0.4 + i * 1.3) * w * 0.04;
        const sy = h;

        // Control point 1: sweeps toward upper-right
        const cp1x = w * (0.65 + fi * 0.18) + Math.cos(t * 0.55 + i * 0.9) * w * 0.05;
        const cp1y = h * (0.55 + Math.sin(t * 0.65 + i * 1.1) * 0.12);

        // Control point 2: near upper-right
        const cp2x = w * (0.82 + fi * 0.1) + Math.sin(t * 0.45 + i * 0.7) * w * 0.03;
        const cp2y = h * (0.15 + Math.cos(t * 0.5 + i * 0.8) * 0.1);

        // End: right edge, varied heights
        const ex = w;
        const ey = h * (fi * 0.7) + Math.sin(t * 0.6 + i * 1.5) * h * 0.04;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);

        const alpha = 0.06 + fi * 0.08;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      t += 0.006;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.07, y: 16 });

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-usrc-crimson text-fg-on-dark"
    >
      <GenerativeLines />

      <div className="relative mx-auto max-w-page px-5 pb-12 pt-12 md:px-8 md:pb-16 md:pt-16 lg:px-12 lg:pb-20 lg:pt-20">
        <div className="max-w-5xl">
          <h1
            id="hero-heading"
            data-reveal
            className="text-[length:var(--text-display)] font-light leading-[1.05] tracking-tight"
          >
            {hero.headline}
          </h1>

          <ul data-reveal className="mt-6 flex flex-wrap items-center gap-2.5">
            {hero.meta.map((m, idx) => (
              <li
                key={`${m.value}-${idx}`}
                className="rounded-pill bg-white/10 px-4 py-1.5 text-small font-medium text-white/90 backdrop-blur-sm"
              >
                <span className="font-semibold text-white">{m.value}</span>
                {m.label ? (
                  <span className="ml-1.5 text-white">{m.label}</span>
                ) : null}
              </li>
            ))}
          </ul>

          <ul data-reveal className="mt-16 grid w-fit grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
            {hero.bullets.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <RiCheckboxCircleFill
                  aria-hidden="true"
                  size={20}
                  className="mt-0.5 shrink-0 text-white/60"
                />
                <div>
                  <p className="text-body font-semibold leading-snug text-white">{b.title}</p>
                  <p className="mt-0.5 max-w-[240px] text-pretty text-body-sm leading-relaxed text-white/70">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
