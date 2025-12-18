"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Chip } from "@/components/Chip";
import { PhotoGrid } from "@/components/PhotoGrid";
import type { Photo } from "@/data/photos";
import { MapPin } from "lucide-react";

const PhotoMap = dynamic(
  () => import("@/components/PhotoMap").then((m) => m.PhotoMap),
  { ssr: false }
);

type Mode = "grid" | "map";

type Props = {
  items: Photo[];
  initialLocation?: string; // 👈 new
};

export function GalleryExperience({ items, initialLocation }: Props) {
  const [mode, setMode] = useState<Mode>("grid");
  const [loc, setLoc] = useState<string | null>(initialLocation ?? null);
  const [year, setYear] = useState<string | null>(null);

  // keep loc in sync when URL changes
  useEffect(() => {
    setLoc(initialLocation ?? null);
  }, [initialLocation]);

  const locations = useMemo(() => {
    const s = new Set(items.map((i) => i.location).filter(Boolean) as string[]);
    return Array.from(s).sort();
  }, [items]);

  const years = useMemo(() => {
    const s = new Set(items.map((i) => i.year).filter(Boolean) as string[]);
    return Array.from(s).sort().reverse();
  }, [items]);

  const filtered = useMemo(
    () =>
      items.filter((p) => {
        const okLoc = !loc || p.location === loc;
        const okYear = !year || p.year === year;
        return okLoc && okYear;
      }),
    [items, loc, year]
  );

  const hasCoords = useMemo(
    () => filtered.some((p) => typeof p.lat === "number" && typeof p.lng === "number"),
    [filtered]
  );

  const toggle = (value: string, current: string | null, setter: (v: string | null) => void) => {
    setter(current === value ? null : value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Chip active={mode === "grid"} onClick={() => setMode("grid")}>
          Grid
        </Chip>
        <Chip active={mode === "map"} onClick={() => setMode("map")}>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Map
          </span>
        </Chip>

        <div className="mx-2 h-6 w-px bg-white/10" />

        {/* Locations as chips (optional extra control) */}
        {locations.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {locations.map((l) => (
              <Chip
                key={l}
                active={loc === l}
                onClick={() => toggle(l, loc, setLoc)}
              >
                {l}
              </Chip>
            ))}
          </div>
        )}

        {years.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {years.map((y) => (
              <Chip
                key={y}
                active={year === y}
                onClick={() => toggle(y, year, setYear)}
              >
                {y}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {mode === "map" ? (
        hasCoords ? (
          <PhotoMap items={filtered} />
        ) : (
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 text-sm text-zinc-300">
            Add <code>lat</code>/<code>lng</code> to photos to enable map view.
          </div>
        )
      ) : (
        <PhotoGrid items={filtered} enableLightbox />
      )}
    </div>
  );
}
