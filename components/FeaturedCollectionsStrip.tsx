// components/FeaturedCollectionsStrip.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cldImageUrl } from "@/lib/cloudinary";
import { Reveal } from "@/components/Reveal";

type StripCollection = {
  slug: string;
  title: string;
  description?: string | null;
  coverPublicId?: string | null;
};

export function FeaturedCollectionsStrip({
  collections,
}: {
  collections: StripCollection[];
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  if (!collections?.length) return null;

  const scrollByCards = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    // Scroll by ~80% of the visible width
    const distance = el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-6">
      {/* scrollable row */}
      <div
        ref={scrollRef}
        className="horizontal-scroll flex flex-nowrap gap-6 pb-3 pr-6"
      >
        {collections.map((c) => {
          const src =
            c.coverPublicId &&
            cldImageUrl(c.coverPublicId as string, { width: 1200 });

          return (
            <Reveal key={c.slug}>
              <Link
                data-collection-card
                href={`/portfolio/${c.slug}`}
                className="group flex w-64 shrink-0 flex-col overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {src ? (
                    <img
                      src={src}
                      alt={c.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1 px-3 py-3">
                  <p className="text-sm font-semibold text-white">
                    {c.title}
                  </p>
                  {c.description && (
                    <p className="line-clamp-2 text-xs text-zinc-400">
                      {c.description}
                    </p>
                  )}
                  <span className="mt-auto text-[11px] text-zinc-300 group-hover:text-white">
                    Open collection →
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* Left arrow */}
      <button
        type="button"
        aria-label="Scroll collections left"
        onClick={() => scrollByCards("left")}
        className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 ring-1 ring-white/25 backdrop-blur transition hover:bg-black/90"
      >
        <ChevronLeft className="h-4 w-4 text-zinc-50" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Scroll collections right"
        onClick={() => scrollByCards("right")}
        className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 ring-1 ring-white/25 backdrop-blur transition hover:bg-black/90"
      >
        <ChevronRight className="h-4 w-4 text-zinc-50" />
      </button>

      {/* Fade edges (don’t block clicks) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020617] to-transparent" />
    </div>
  );
}
