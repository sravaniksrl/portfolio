// // app/page.tsx
// import Link from "next/link";
// import { cldImageUrl } from "@/lib/cloudinary";
// import { Reveal } from "@/components/Reveal";
// import { CollectionCard } from "@/components/CollectionCard";
// import { ArrowRight } from "lucide-react";
// import { getCollectionsWithLatestCovers } from "@/lib/collectionsWithLatestCovers";

// export const revalidate = 60; // re-generate at most once per minute

// export default async function HomePage() {
//   const cols = await getCollectionsWithLatestCovers();

//   // use first collection as hero
//   const hero = cols[0];
//   const heroSrc = hero?.coverPublicId
//     ? cldImageUrl(hero.coverPublicId, { width: 2600 })
//     : null;

//   return (
//     <div>
//       <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
//         <Reveal className="relative overflow-hidden rounded-[2.2rem] bg-white/5 ring-1 ring-white/10 shadow-soft">
//           <div className="relative aspect-[16/9] w-full overflow-hidden">
//             {heroSrc ? (
//               <img
//                 src={heroSrc}
//                 alt={hero.title}
//                 className="h-full w-full object-cover opacity-90"
//                 loading="eager"
//               />
//             ) : (
//               <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />
//             )}

//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
//             <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
//               <p className="text-xs uppercase tracking-[0.22em] text-zinc-300/80">
//                 Photography Portfolio
//               </p>
//               <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
//                 Moments in light, texture, and place.
//               </h1>
//               <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-200/80 md:text-base">
//                 Cityscapes, landscapes, wildlife and abstract photography —
//                 curated as collections and cinematic stories.
//               </p>
//               <div className="mt-6 flex flex-wrap items-center gap-3">
//                 <Link
//                   href="/portfolio"
//                   className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 shadow-soft transition hover:opacity-95"
//                 >
//                   View Portfolio <ArrowRight className="h-4 w-4" />
//                 </Link>
//                 <Link
//                   href="/stories"
//                   className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm text-zinc-100 ring-1 ring-white/10 transition hover:bg-white/10"
//                 >
//                   Stories
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </section>

//       <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
//         <Reveal className="flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
//               Featured collections
//             </h2>
//             <p className="mt-2 text-sm text-zinc-400 md:text-base">
//               Fast grids, fullscreen viewing, map view, and shot details — all
//               optional and clean.
//             </p>
//           </div>
//           <Link
//             href="/portfolio"
//             className="hidden text-sm text-zinc-300 hover:text-white md:inline"
//           >
//             See all
//           </Link>
//         </Reveal>

//         <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2">
//           {cols.slice(0, 4).map((c) => (
//             <Reveal key={c.slug}>
//               <CollectionCard c={c} />
//             </Reveal>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


// app/page.tsx
// app/page.tsx
import Link from "next/link";
import { cldImageUrl } from "@/lib/cloudinary";
import { Reveal } from "@/components/Reveal";
import { CollectionCard } from "@/components/CollectionCard";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { getCollectionsWithLatestCovers } from "@/lib/collectionsWithLatestCovers";

export default async function HomePage() {
  // ✅ 1) Fetch collections with their latest Cloudinary image as coverPublicId
  const cols = await getCollectionsWithLatestCovers();

  // ✅ 2) Build up to 5 slides – one from each collection, using its latest image
  const slides = cols
    .filter((c) => c.coverPublicId) // only collections that actually have an image
    .slice(0, 5)
    .map((c) => ({
      src: cldImageUrl(c.coverPublicId!, { width: 2600 }),
      title: c.title,          // show the collection name in the hero
      subtitle: c.description, // and its description
    }));

  // ✅ 3) Fallback slide in case Cloudinary is empty for some reason
  const heroSlides =
    slides.length > 0
      ? slides
      : [
          {
            src: "/fallback-hero.jpg", // optional local fallback
            title: "Moments in light, texture, and place.",
            subtitle:
              "Cityscapes, landscapes, wildlife and abstract photography — curated as collections and cinematic stories.",
          },
        ];

  return (
    <div>
      {/* HERO SLIDESHOW – one latest image from each collection */}
      <HeroSlideshow slides={heroSlides} />

      {/* FEATURED COLLECTIONS – using the same cols so coverPublicId is set */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              Featured collections
            </h2>
            <p className="mt-2 text-sm text-zinc-400 md:text-base">
              Fast grids, fullscreen viewing, map view, and shot details —
              all optional and clean.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden text-sm text-zinc-300 hover:text-white md:inline"
          >
            See all
          </Link>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2">
          {cols.slice(0, 4).map((c) => (
            <Reveal key={c.slug}>
              <CollectionCard c={c} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
