import Link from "next/link";
import { cldImageUrl } from "@/lib/cloudinary";
import type { Collection } from "@/data/collections";

export function CollectionCard({ c }: { c: Collection }) {
  // coverPublicId can be undefined if a collection has no images yet
  const src = c.coverPublicId
    ? cldImageUrl(c.coverPublicId, {
        width: 1200,
        quality: "auto",
        format: "auto",
      })
    : null;

  return (
    <Link
      href={`/portfolio/${c.slug}`}
      className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-soft"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={c.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-95"
          />
        ) : (
          // Fallback if no cover image yet
          <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{c.title}</h3>
          <p className="text-xs text-zinc-400">{c.description}</p>
        </div>
        <span className="text-xs text-zinc-300 group-hover:text-white">
          View →
        </span>
      </div>
    </Link>
  );
}
