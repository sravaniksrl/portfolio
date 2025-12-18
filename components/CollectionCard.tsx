import Link from "next/link";
import { cldImageUrl } from "@/lib/cloudinary";
import type { Collection } from "@/data/collections";

export function CollectionCard({ c }: { c: Collection }) {
  const src = cldImageUrl(c.coverPublicId, { width: 1200, quality: "auto", format: "auto" });
  return (
    <Link href={`/portfolio/${c.slug}`} className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-soft">
      <div className="aspect-[4/3] w-full">
        {src ? (
          <img src={src} alt={c.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/0" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-sm text-zinc-200/80">Collection</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">{c.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-300/75">{c.description}</p>
      </div>
    </Link>
  );
}
