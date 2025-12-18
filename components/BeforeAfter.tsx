"use client";
import { useMemo, useState } from "react";
import { cldImageUrl } from "@/lib/cloudinary";
import type { Photo } from "@/data/photos";

export function BeforeAfter({ photo }: { photo: Photo }) {
  const [v, setV] = useState(60);
  const before = useMemo(() => photo.beforePublicId ? cldImageUrl(photo.beforePublicId, { width: 2400 }) : "", [photo.beforePublicId]);
  const after = useMemo(() => photo.afterPublicId ? cldImageUrl(photo.afterPublicId, { width: 2400 }) : "", [photo.afterPublicId]);
  if (!before || !after) return null;

  return (
    <div className="mt-6 overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-soft">
      <div className="relative aspect-[16/9] w-full">
        <img src={after} alt="After edit" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${v}%` }}>
          <img src={before} alt="Before edit" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex items-center gap-4 p-4">
        <span className="text-xs uppercase tracking-[0.22em] text-zinc-400">Before</span>
        <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))}
          className="w-full accent-white" aria-label="Before after slider" />
        <span className="text-xs uppercase tracking-[0.22em] text-zinc-400">After</span>
      </div>
    </div>
  );
}
