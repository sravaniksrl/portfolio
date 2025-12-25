// // app/page.tsx
// import Link from "next/link";
// import { cldImageUrl } from "@/lib/cloudinary";
// import { Reveal } from "@/components/Reveal";
// import { HeroSlideshow, type HeroSlide } from "@/components/HeroSlideshow";
// import { getCollectionsWithLatestCovers } from "@/lib/collectionsWithLatestCovers";
// import {
//   highlightStories,
//   type HighlightStory,
// } from "@/data/highlightStories";
// import { FeaturedCollectionsStrip } from "@/components/FeaturedCollectionsStrip";

// export default async function HomePage() {
//   // 1) Collections with latest Cloudinary cover image
//   const cols = await getCollectionsWithLatestCovers();

//   // Map collection slug -> first highlight story for that collection
//   const highlightByCollection = new Map<string, HighlightStory>();
//   for (const h of highlightStories) {
//     if (!highlightByCollection.has(h.collectionSlug)) {
//       highlightByCollection.set(h.collectionSlug, h);
//     }
//   }

//   // 2) Hero slides: one per collection that has both cover + highlight
//   const heroSlides: HeroSlide[] = cols
//     .filter(
//       (c: any) => c.coverPublicId && highlightByCollection.has(c.slug)
//     )
//     .slice(0, 5)
//     .map((c: any) => {
//       const h = highlightByCollection.get(c.slug)!;
//       return {
//         src: cldImageUrl(c.coverPublicId as string, { width: 2600 }),
//         title: h.title,
//         subtitle: c.title,
//         highlight: h.short,
//         href: `/portfolio/${c.slug}`,
//       };
//     });

//   const safeSlides: HeroSlide[] =
//     heroSlides.length > 0
//       ? heroSlides
//       : [
//           {
//             src: "/fallback-hero.jpg",
//             title: "Moments in light, texture, and place.",
//             subtitle:
//               "Cityscapes, landscapes, wildlife and abstract photography — curated as collections and cinematic stories.",
//           },
//         ];

//   // 3) Highlight cards (enriched with cover image + collection)
//   const highlightCards = highlightStories.slice(0, 6).map((h) => {
//     const col: any = cols.find((c: any) => c.slug === h.collectionSlug);
//     const src =
//       col?.coverPublicId &&
//       cldImageUrl(col.coverPublicId as string, { width: 1600 });
//     return { story: h, collection: col, src };
//   });

//   const [primaryHighlight, ...restHighlights] = highlightCards;

//   return (
//     <div>
//       {/* 1️⃣ Cinematic hero slideshow */}
//       <HeroSlideshow slides={safeSlides} />

//       {/* 2️⃣ Highlight stories – editorial layout */}
//       {primaryHighlight && (
//         <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
//           <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//             <div>
//               <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
//                 Highlight stories
//               </h2>
//               <p className="mt-2 max-w-xl text-sm text-zinc-400 md:text-base">
//                 Places that shaped this portfolio — from Calcutta’s streets to
//                 the tulip fields of Schwaneberg.
//               </p>
//             </div>
//             <Link
//               href="/stories"
//               className="mt-2 text-sm text-zinc-300 hover:text-white md:mt-0"
//             >
//               View all highlights →
//             </Link>
//           </Reveal>

//           <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
//             {/* Main big card */}
//             <Reveal>
//               <Link
//                 href={
//                   primaryHighlight.collection
//                     ? `/portfolio/${primaryHighlight.collection.slug}`
//                     : "/portfolio"
//                 }
//                 className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10"
//               >
//                 <div className="relative aspect-[16/9] w-full overflow-hidden">
//                   {primaryHighlight.src ? (
//                     <img
//                       src={primaryHighlight.src}
//                       alt={primaryHighlight.story.title}
//                       className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
//                   )}

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />

//                   <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
//                     <p className="text-xs uppercase tracking-[0.22em] text-zinc-300/80">
//                       Highlight story
//                     </p>
//                     <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
//                       {primaryHighlight.story.title}
//                     </h3>
//                     <p className="mt-2 max-w-xl text-sm text-zinc-200/80 md:text-base">
//                       {primaryHighlight.story.short}
//                     </p>
//                     <span className="mt-4 inline-flex items-center text-xs font-medium text-zinc-100">
//                       View collection →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </Reveal>

//             {/* Side mini highlight list */}
//             <div className="space-y-3">
//               {restHighlights.map(({ story, collection, src }) => (
//                 <Reveal key={story.slug}>
//                   <Link
//                     href={
//                       collection ? `/portfolio/${collection.slug}` : "/portfolio"
//                     }
//                     className="group flex items-center gap-3 rounded-2xl bg-white/3 p-3 ring-1 ring-white/10 transition hover:bg-white/10"
//                   >
//                     <div className="relative h-16 w-20 overflow-hidden rounded-xl">
//                       {src ? (
//                         <img
//                           src={src}
//                           alt={story.title}
//                           className="h-full w-full object-cover transition group-hover:scale-110"
//                         />
//                       ) : (
//                         <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-xs font-semibold text-white">
//                         {story.title}
//                       </p>
//                       <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400">
//                         {story.short}
//                       </p>
//                       <span className="mt-1 inline-block text-[11px] text-zinc-300 group-hover:text-white">
//                         View collection →
//                       </span>
//                     </div>
//                   </Link>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* 3️⃣ Featured collections strip with arrows */}
//       <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
//         <Reveal className="flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
//               Featured collections
//             </h2>
//             <p className="mt-2 text-sm text-zinc-400 md:text-base">
//               A quick tour through the main themes — swipe or tap the arrows to
//               browse.
//             </p>
//           </div>
//           <Link
//             href="/portfolio"
//             className="hidden text-sm text-zinc-300 hover:text-white md:inline"
//           >
//             See all
//           </Link>
//         </Reveal>

//         <FeaturedCollectionsStrip collections={cols} />
//       </section>
//     </div>
//   );
// }


// // app/page.tsx
// import Link from "next/link";
// import { cldImageUrl } from "@/lib/cloudinary";
// import { Reveal } from "@/components/Reveal";
// import { HeroSlideshow, type HeroSlide } from "@/components/HeroSlideshow";
// import { getCollectionsWithLatestCovers } from "@/lib/collectionsWithLatestCovers";
// import {
//   getHighlightStories,
//   type HighlightStory,
// } from "@/data/highlightStories";
// import { FeaturedCollectionsStrip } from "@/components/FeaturedCollectionsStrip";

// export default async function HomePage() {
//   // 1) Collections with latest Cloudinary cover image
//   const cols = await getCollectionsWithLatestCovers();

//   // 2) Dynamic highlight stories fetched from Cloudinary
//   const highlightStories = await getHighlightStories();

//   // Map: collection slug -> first highlight story for that collection
//   const highlightByCollection = new Map<string, HighlightStory>();
//   for (const h of highlightStories) {
//     if (!highlightByCollection.has(h.collectionSlug)) {
//       highlightByCollection.set(h.collectionSlug, h);
//     }
//   }

//   // 3) Hero slides – try to enrich with highlight stories, but fall back
//   const heroSlides: HeroSlide[] = cols.slice(0, 5).map((c: any) => {
//     const h = highlightByCollection.get(c.slug);

//     return {
//       src: c.coverPublicId
//         ? cldImageUrl(c.coverPublicId as string, { width: 2600 })
//         : // final fallback – any static image you like in /public
//           "/hero-fallback.jpg",
//       title: h?.title ?? c.title,
//       subtitle: h
//         ? c.title
//         : c.description ??
//           "Cityscapes, landscapes, wildlife and abstract photography.",
//       highlight: h?.short,
//       href: `/portfolio/${c.slug}`,
//     };
//   });

//   const safeSlides: HeroSlide[] =
//     heroSlides.length > 0
//       ? heroSlides
//       : [
//           {
//             src: "/hero-fallback.jpg",
//             title: "Moments in light, texture, and place.",
//             subtitle:
//               "Cityscapes, landscapes, wildlife and abstract photography — curated as collections and cinematic stories.",
//           },
//         ];

//   // 4) Highlight cards (editorial section)
//   const highlightCards = highlightStories.slice(0, 6).map((h) => {
//     const col: any = cols.find((c: any) => c.slug === h.collectionSlug);
//     const src =
//       col?.coverPublicId &&
//       cldImageUrl(col.coverPublicId as string, { width: 1600 });

//     return { story: h, collection: col, src };
//   });

//   const [primaryHighlight, ...restHighlights] = highlightCards;

//   return (
//     <div>
//       {/* 1️⃣ Cinematic hero slideshow */}
//       <HeroSlideshow slides={safeSlides} />

//       {/* 2️⃣ Highlight stories – editorial layout */}
//       {primaryHighlight && (
//         <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
//           <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//             <div>
//               <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
//                 Highlight stories
//               </h2>
//               <p className="mt-2 max-w-xl text-sm text-zinc-400 md:text-base">
//                 Places that shaped this portfolio — from Calcutta’s streets to
//                 the tulip fields of Schwaneberg.
//               </p>
//             </div>
//             <Link
//               href="/stories"
//               className="mt-2 text-sm text-zinc-300 hover:text-white md:mt-0"
//             >
//               View all highlights →
//             </Link>
//           </Reveal>

//           <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
//             {/* Main big highlight card */}
//             <Reveal>
//               <Link
//                 href={
//                   primaryHighlight.collection
//                     ? `/portfolio/${primaryHighlight.collection.slug}`
//                     : "/portfolio"
//                 }
//                 className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10"
//               >
//                 <div className="relative aspect-[16/9] w-full overflow-hidden">
//                   {primaryHighlight.src ? (
//                     <img
//                       src={primaryHighlight.src}
//                       alt={primaryHighlight.story.title}
//                       className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//                     />
//                   ) : (
//                     <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
//                   )}

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />

//                   <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
//                     <p className="text-xs uppercase tracking-[0.22em] text-zinc-300/80">
//                       Highlight story
//                     </p>
//                     <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
//                       {primaryHighlight.story.title}
//                     </h3>
//                     <p className="mt-2 max-w-xl text-sm text-zinc-200/80 md:text-base">
//                       {primaryHighlight.story.short}
//                     </p>
//                     <span className="mt-4 inline-flex items-center text-xs font-medium text-zinc-100">
//                       View collection →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </Reveal>

//             {/* Side mini highlight list */}
//             <div className="space-y-3">
//               {restHighlights.map(({ story, collection, src }) => (
//                 <Reveal key={story.slug}>
//                   <Link
//                     href={
//                       collection ? `/portfolio/${collection.slug}` : "/portfolio"
//                     }
//                     className="group flex items-center gap-3 rounded-2xl bg-white/3 p-3 ring-1 ring-white/10 transition hover:bg-white/10"
//                   >
//                     <div className="relative h-16 w-20 overflow-hidden rounded-xl">
//                       {src ? (
//                         <img
//                           src={src}
//                           alt={story.title}
//                           className="h-full w-full object-cover transition group-hover:scale-110"
//                         />
//                       ) : (
//                         <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-xs font-semibold text-white">
//                         {story.title}
//                       </p>
//                       <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400">
//                         {story.short}
//                       </p>
//                       <span className="mt-1 inline-block text-[11px] text-zinc-300 group-hover:text-white">
//                         View collection →
//                       </span>
//                     </div>
//                   </Link>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* 3️⃣ Featured collections strip with arrows */}
//       <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
//         <Reveal className="flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
//               Featured collections
//             </h2>
//             <p className="mt-2 text-sm text-zinc-400 md:text-base">
//               A quick tour through the main themes — swipe or tap the arrows to
//               browse.
//             </p>
//           </div>
//           <Link
//             href="/portfolio"
//             className="hidden text-sm text-zinc-300 hover:text-white md:inline"
//           >
//             See all
//           </Link>
//         </Reveal>

//         <FeaturedCollectionsStrip collections={cols} />
//       </section>
//     </div>
//   );
// }






// app/page.tsx
import Link from "next/link";
import { cldImageUrl } from "@/lib/cloudinary";
import { Reveal } from "@/components/Reveal";
import { HeroSlideshow, type HeroSlide } from "@/components/HeroSlideshow";
import { getCollectionsWithLatestCovers } from "@/lib/collectionsWithLatestCovers";
import {
  fetchHighlightStoriesFromCloudinary,
  type HighlightStory,
} from "@/data/highlightStories";
import { FeaturedCollectionsStrip } from "@/components/FeaturedCollectionsStrip";

type HomeCollection = {
  slug: string;
  title: string;
  description?: string | null;
  coverPublicId?: string | null;
};

export default async function HomePage() {
  // 1) Collections (used for hero fallback + featured strip)
  const cols = (await getCollectionsWithLatestCovers()) as HomeCollection[];

  // 2) Highlight stories from Cloudinary
  let highlights: HighlightStory[] = [];
  try {
    highlights = await fetchHighlightStoriesFromCloudinary();
  } catch (err) {
    console.error("Error loading highlight stories:", err);
  }

  // --- Hero slides --------------------------------------------------------

  // Prefer hero slides built from highlight stories
  const heroSlidesFromHighlights: HeroSlide[] = highlights
    .map((h) => {
      const col = cols.find((c) => c.slug === h.collectionSlug);
      const publicId = h.coverPublicId ?? col?.coverPublicId;
      if (!publicId) return null;

      return {
        src: cldImageUrl(publicId, { width: 2600 }),
        title: h.title,
        subtitle: col?.title ?? h.collectionSlug,
        highlight: h.short || undefined,
        href: col ? `/portfolio/${col.slug}` : undefined,
      } as HeroSlide;
    })
    .filter(Boolean) as HeroSlide[];

  const heroSlides: HeroSlide[] =
    heroSlidesFromHighlights.length > 0
      ? heroSlidesFromHighlights.slice(0, 5)
      : cols
          .filter((c) => c.coverPublicId)
          .slice(0, 5)
          .map(
            (c) =>
              ({
                src: cldImageUrl(c.coverPublicId as string, { width: 2600 }),
                title: c.title,
                subtitle: "Selected work from this collection",
                href: `/portfolio/${c.slug}`,
              }) as HeroSlide,
          );

  // --- Highlight cards for the section -----------------------------------

  const highlightCards =
    highlights.length > 0
      ? highlights.slice(0, 6).map((h) => {
          const col = cols.find((c) => c.slug === h.collectionSlug);
          const publicId = h.coverPublicId ?? col?.coverPublicId;
          const src =
            publicId &&
            cldImageUrl(publicId as string, {
              width: 1600,
            });

          return { story: h, collection: col, src };
        })
      : [];

  const [primaryHighlight, ...restHighlights] = highlightCards;

  return (
    <div>
      {/* 1️⃣ Cinematic hero slideshow */}
      {heroSlides.length > 0 && <HeroSlideshow slides={heroSlides} />}

      {/* 2️⃣ Highlight stories – only if Cloudinary returned something */}
      {primaryHighlight && (
        <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
          <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                Highlight stories
              </h2>
              <p className="mt-2 max-w-xl text-sm text-zinc-400 md:text-base">
                Pulled straight from your Cloudinary folders — tweak titles and
                descriptions in the dashboard and they’ll update here.
              </p>
            </div>
            <Link
              href="/stories"
              className="mt-2 text-sm text-zinc-300 hover:text-white md:mt-0"
            >
              View all highlights →
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
            {/* Main big highlight card */}
            <Reveal>
              <Link
                href={
                  primaryHighlight.collection
                    ? `/portfolio/${primaryHighlight.collection.slug}`
                    : "/portfolio"
                }
                className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  {primaryHighlight.src ? (
                    <img
                      src={primaryHighlight.src}
                      alt={primaryHighlight.story.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-300/80">
                      Highlight story
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {primaryHighlight.story.title}
                    </h3>
                    {primaryHighlight.story.short && (
                      <p className="mt-2 max-w-xl text-sm text-zinc-200/80 md:text-base">
                        {primaryHighlight.story.short}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center text-xs font-medium text-zinc-100">
                      View collection →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Side mini list */}
            <div className="space-y-3">
              {restHighlights.map(({ story, collection, src }) => (
                <Reveal key={story.slug}>
                  <Link
                    href={
                      collection ? `/portfolio/${collection.slug}` : "/portfolio"
                    }
                    className="group flex items-center gap-3 rounded-2xl bg-white/3 p-3 ring-1 ring-white/10 transition hover:bg-white/10"
                  >
                    <div className="relative h-16 w-20 overflow-hidden rounded-xl">
                      {src ? (
                        <img
                          src={src}
                          alt={story.title}
                          className="h-full w-full object-cover transition group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/0" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">
                        {story.title}
                      </p>
                      {story.short && (
                        <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400">
                          {story.short}
                        </p>
                      )}
                      <span className="mt-1 inline-block text-[11px] text-zinc-300 group-hover:text-white">
                        View collection →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3️⃣ Featured collections strip with arrows */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              Featured collections
            </h2>
            <p className="mt-2 text-sm text-zinc-400 md:text-base">
              A quick tour through the main themes — swipe or tap the arrows to
              browse.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="hidden text-sm text-zinc-300 hover:text-white md:inline"
          >
            See all
          </Link>
        </Reveal>

        <FeaturedCollectionsStrip collections={cols} />
      </section>
    </div>
  );
}

