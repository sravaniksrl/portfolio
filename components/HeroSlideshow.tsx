// components/HeroSlideshow.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Slide = {
  src: string;
  title: string;
  subtitle: string;
};

export function HeroSlideshow({
  slides,
  interval = 6000,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);

    return () => clearInterval(id);
  }, [slides.length, interval]);

  const current = slides[index];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-white/5 ring-1 ring-white/10 shadow-soft">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {slides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.title}
              className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ${
                i === index ? "opacity-100" : ""
              }`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-300/80">
              Photography Portfolio
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {current.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-200/80 md:text-base">
              {current.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 shadow-soft transition hover:opacity-95"
              >
                View Portfolio <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm text-zinc-100 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                Stories
              </Link>
            </div>

            {slides.length > 1 && (
              <div className="mt-4 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 w-4 rounded-full transition ${
                      i === index ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
