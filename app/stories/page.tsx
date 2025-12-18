import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { stories } from "@/data/stories";
import { cldImageUrl } from "@/lib/cloudinary";
import { Reveal } from "@/components/Reveal";

export const dynamic = "force-static";

export default function StoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <SectionHeader title="Stories" subtitle="Curated sequences designed to be viewed like a short film." />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {stories.map((s) => {
          const src = cldImageUrl(s.coverPublicId, { width: 1400 });
          return (
            <Reveal key={s.slug}>
              <Link href={`/stories/${s.slug}`} className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-soft">
                <div className="aspect-[4/3] w-full">
                  {src ? <img src={src} alt={s.title} className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" /> : <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm text-zinc-200/80">Story</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">{s.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-300/75">{s.subtitle}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
