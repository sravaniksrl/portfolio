// components/FromTheJournal.tsx
import Link from "next/link";
import { getLatestJournalEntry } from "@/lib/cloudinaryAdmin";
import { cldImageUrl } from "@/lib/cloudinary";

export async function FromTheJournal() {
  const entry = await getLatestJournalEntry();

  // If nothing is tagged "journal" yet, don’t render anything.
  if (!entry) return null;

  // Use your existing cldImageUrl helper to generate an optimized URL.
  // If your cldImageUrl supports transformations, keep it like this.
  // Otherwise you can fall back to entry.imageUrl.
  const img =
    cldImageUrl(entry.publicId, {
      width: 1600,
    }) || entry.imageUrl;

  // Link to stories page (your stories page can read pid query param)
  const href = `/stories?pid=${encodeURIComponent(entry.publicId)}`;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
            From the Journal
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Behind the frame
          </h2>
          <p className="mt-1 text-sm text-zinc-300">
            A featured moment — pulled directly from Cloudinary metadata.
          </p>
        </div>

        <Link
          href="/stories"
          className="hidden text-sm text-zinc-300 hover:text-white md:inline-block"
        >
          See all →
        </Link>
      </div>

      <Link
        href={href}
        className="group grid grid-cols-1 overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-soft md:grid-cols-[1.2fr_1fr]"
      >
        <div className="relative">
          <img
            src={img}
            alt={entry.description || entry.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
            Featured
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            {entry.title}
          </h3>

          {entry.description ? (
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 line-clamp-4">
              {entry.description}
            </p>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Add a Description (alt) in Cloudinary to show your story snippet here.
            </p>
          )}

          <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/10">
            Read story <span aria-hidden>→</span>
          </div>

          <p className="mt-3 text-xs text-zinc-400">
            Tip: Tag any image with <span className="text-zinc-200">journal</span> in Cloudinary.
            Title/Description come from Contextual metadata.
          </p>
        </div>
      </Link>

      <div className="mt-4 md:hidden">
        <Link
          href="/stories"
          className="text-sm text-zinc-300 hover:text-white"
        >
          See all stories →
        </Link>
      </div>
    </section>
  );
}
