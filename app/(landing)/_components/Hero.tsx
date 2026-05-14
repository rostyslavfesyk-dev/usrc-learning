"use client";

import { useRef } from "react";
import { hero } from "../_data/course";
import { useStagger } from "../../_lib/animations";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useStagger(ref, "[data-reveal]", { stagger: 0.07, y: 16 });

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-usrc-crimson text-fg-on-dark"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 426.836 123.414"
        className="pointer-events-none absolute bottom-0 right-0 w-[80vw] md:w-[55vw] lg:w-[44vw] lg:max-w-[640px]"
        fill="white"
      >
        <path d="M82.875 123.414q14.345-14.025 29.508-26.791a497.237 497.237 0 0 1 63.54-45.577 429.189 429.189 0 0 1 67.946-33.288q9.554-3.644 18.8-6.548a356.953 356.953 0 0 0-43.781 1.041 361.514 361.514 0 0 0-55.766 9.239 340.08 340.08 0 0 0-51.21 17.042 292.427 292.427 0 0 0-44.761 23.673 228.02 228.02 0 0 0-36.426 29.109 186.75 186.75 0 0 0-26 32.1H.005a189.859 189.859 0 0 1 27.906-34.941A232.014 232.014 0 0 1 64.976 58.85a296.312 296.312 0 0 1 45.374-24 344.145 344.145 0 0 1 51.814-17.245 362.142 362.142 0 0 1 112.141-9.791 221.864 221.864 0 0 1 43.6-7.485 145.429 145.429 0 0 1 35.728 1.918 112.647 112.647 0 0 1 16.826 4.5 100.681 100.681 0 0 1 15.843 7.2 101.768 101.768 0 0 1 23.22 18.133 124.59 124.59 0 0 1 16.821 22.126l.495.319v8.7q-1.335-2.532-2.747-4.968-.347-.6-.7-1.188-5.928-3.772-12.325-7.306A291.962 291.962 0 0 0 353 25.853a362.793 362.793 0 0 0-65.8-12.916q-6.253-.644-12.5-1.077-14.278 3.879-29.406 9.646a425.013 425.013 0 0 0-67.31 32.979 493 493 0 0 0-63.026 45.21q-13.466 11.319-26.339 23.719ZM318.152 4.32a205.6 205.6 0 0 0-31.345 4.546l.8.082a366.807 366.807 0 0 1 66.529 13.06 295.963 295.963 0 0 1 58.863 24.244q2.77 1.531 5.456 3.106a116.521 116.521 0 0 0-11.819-14.512 97.771 97.771 0 0 0-22.3-17.424 96.665 96.665 0 0 0-15.213-6.908 108.694 108.694 0 0 0-16.227-4.336 134.009 134.009 0 0 0-24.64-2.177q-4.969-.001-10.104.319Z" />
      </svg>

      <div className="relative mx-auto max-w-page px-5 py-20 md:px-8 md:py-28 lg:px-12 lg:py-32">
        <div className="max-w-3xl">
          <span
            data-reveal
            className="inline-block rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85"
          >
            {hero.eyebrow}
          </span>

          <h1
            id="hero-heading"
            data-reveal
            className="mt-6 text-[length:var(--text-display)] font-light leading-[1.05] tracking-tight"
          >
            {hero.headline}
          </h1>

          <p
            data-reveal
            className="mt-6 max-w-2xl text-body-lg leading-relaxed text-fg-on-dark-muted"
          >
            {hero.subheadline}
          </p>

          <ul data-reveal className="mt-10 flex flex-wrap items-center gap-2.5">
            {hero.meta.map((m, idx) => (
              <li
                key={`${m.value}-${idx}`}
                className="rounded-pill bg-white/10 px-4 py-1.5 text-small font-medium text-white/90 backdrop-blur-sm"
              >
                <span className="font-semibold text-white">{m.value}</span>
                {m.label ? (
                  <span className="ml-1.5 text-white/75">{m.label}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
