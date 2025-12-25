// // data/highlightStories.ts

// export type HighlightStory = {
//   slug: string;          // e.g. "calcutta"
//   title: string;         // e.g. "Calcutta, India"
//   collectionSlug: string; // "cityscapes" | "landscapes" | ...
//   short: string;         // 1–2 line version for homepage
//   full: string;          // optional longer narrative
// };

// export const highlightStories: HighlightStory[] = [
//   {
//     slug: "calcutta",
//     title: "Calcutta, India",
//     collectionSlug: "cityscapes",
//     short:
//       "Calcutta, where history, culture, and modernity blend seamlessly along the banks of the Hooghly River.",
//     full: `Calcutta, where history, culture, and modernity blend seamlessly to create a unique tapestry of experiences. Nestled along the banks of the Hooghly River, Calcutta, also known as Kolkata, is a city that pulsates with life and energy. One of the oldest cities in India, Calcutta is steeped in history. From the grand colonial architecture of buildings like the Victoria Memorial and the Howrah Bridge to the narrow lanes of North Kolkata's old neighborhoods, every corner of the city tells a story.`,
//   },
//   {
//     slug: "amsterdam",
//     title: "Amsterdam, Netherlands",
//     collectionSlug: "cityscapes",
//     short:
//       "Amsterdam’s canals, gabled houses, and soft northern light turn everyday scenes into cinematic frames.",
//     full: `Amsterdam is the capital and the principal commercial and financial centre of the Netherlands. Amsterdam is known for its historical attractions, for its collections of great art, and for the distinctive colour and flavour of its old sections, which have been so well preserved. Amsterdam’s intimate character is best reflected in the narrow, bustling streets of the old town, where much of the population still goes about its business.`,
//   },
//   {
//     slug: "vienna",
//     title: "Vienna, Austria",
//     collectionSlug: "cityscapes",
//     short:
//       "Vienna, a city of classical facades, quiet courtyards, and long perspectives shaped by imperial architects.",
//     full: `Vienna, the capital of Austria, is among the least spoiled of the great old western European capitals. Its central core, the Innere Stadt, is easily manageable by foot and public transportation. In a city renowned for its architecture, many of Vienna’s urban prospects remain basically those devised over several centuries by imperial gardeners and architects.`,
//   },
//   {
//     slug: "budapest",
//     title: "Budapest, Hungary",
//     collectionSlug: "cityscapes",
//     short:
//       "Budapest, where the Danube divides Buda and Pest, and the city glows in layers of history and light.",
//     full: `Budapest, the capital of Hungary, is the political, administrative, industrial, and commercial centre of the country. Once called the “Queen of the Danube,” Budapest has long been the focal point of the nation and a lively cultural centre. The city straddles the Danube River in a magnificent natural setting where the hills of western Hungary meet the plains stretching to the east and south.`,
//   },
//   {
//     slug: "schwaneberg",
//     title: "Schwaneberg, Germany",
//     collectionSlug: "landscapes",
//     short:
//       "Schwaneberg, the pearl of the Börde, where tulip fields and soft hills welcome spring each year.",
//     full: `Schwaneberg – the pearl of the Börde. At the foot of the Harz Mountains lies the sleepy little town of Schwaneberg. Every year from mid-April, the tulip bloom begins in Schwaneberg and the tulips in the fields welcome spring.`,
//   },
//   // Add more later: Prague, Quedlinburg, etc.
// ];


// // data/highlightStories.ts
// import "server-only";
// import { v2 as cloudinary } from "cloudinary";

// export type HighlightStory = {
//   slug: string;            // story slug, from context.story_slug
//   title: string;           // human title
//   short: string;           // short description
//   collectionSlug: string;  // which collection this highlight belongs to
//   coverPublicId: string;   // Cloudinary public_id used as cover
// };

// let cache: HighlightStory[] | null = null;


// export async function fetchHighlightStoriesFromCloudinary(): Promise<HighlightStory[]> {
//   try {
//     const res = await cloudinary.search
//       // Only filter by folder, keep it simple.
//       // This syntax mirrors what already works in getCollectionsWithLatestCovers.
//       .expression("folder:portfolio/*")
//       .with_field("context")
//       .max_results(200)
//       .execute();

//     const resources = (res as any).resources ?? [];

//     const stories = resources
//     .map((r: any): HighlightStory | null => {
//         const ctx = r.context?.custom ?? {};

//         if (!ctx.story_slug) return null;

//         const collectionSlug =
//         ctx.collection_slug || ctx.story_collection || r.folder?.split("/")[1];

//         if (!collectionSlug) return null;

//         return {
//         slug: ctx.story_slug as string,
//         title: (ctx.story_title || r.public_id) as string,
//         short: (ctx.story_short || "") as string,
//         collectionSlug,
//         coverPublicId: r.public_id as string,
//         };
//     })
//     .filter(
//         (x: HighlightStory | null): x is HighlightStory => x !== null
//     );

//     return stories;

//   } catch (err) {
//     console.error("❌ Cloudinary highlight fetch failed:", err);
//     return [];
//   }
// }

// /**
//  * Server-side helper used by pages/components.
//  * Caches results in memory for the life of the server process.
//  */
// export async function getHighlightStories(): Promise<HighlightStory[]> {
//   if (cache) return cache;
//   cache = await fetchHighlightStoriesFromCloudinary();
//   return cache;
// }





// data/highlightStories.ts
import "server-only";
import { v2 as cloudinary } from "cloudinary";

export type HighlightStory = {
  slug: string;            // unique id we can use in URLs
  title: string;           // human-readable title
  short: string;           // short blurb / teaser
  collectionSlug: string;  // e.g. "cityscapes"
  coverPublicId?: string;  // Cloudinary public_id
};

/**
 * Fetch highlight stories from Cloudinary using contextual metadata.
 *
 * This is intentionally forgiving about key names so it works with
 * the metadata you've already added in the UI.
 *
 * We look for keys like:
 *  - story_title, title
 *  - story_short, story_teaser, story_caption
 *  - story_collection, collection_slug, collection
 *  - story_slug, slug  (or we slugify the title if missing)
 */
export async function fetchHighlightStoriesFromCloudinary(): Promise<
  HighlightStory[]
> {
  try {
    const res = await cloudinary.search
      // Adjust "portfolio/*" if your root folder is different
      .expression("folder=portfolio/*")
      .with_field("context")
      .max_results(200)
      .execute();

    const resources = (res.resources ?? []) as any[];

    const stories: (HighlightStory | null)[] = resources.map((r) => {
      const ctx = (r.context?.custom ?? {}) as Record<string, string | undefined>;

      // Try several options for each field so we don't depend on exact key names.
      const rawTitle =
        ctx.story_title ||
        ctx.title ||
        ctx.story_name ||
        r.public_id;

      const collectionSlug =
        ctx.collection_slug ||
        ctx.story_collection ||
        ctx.collection ||
        (r.folder?.split("/")?.[1] ?? "") || // e.g. portfolio/cityscapes/...
        "";

      if (!rawTitle || !collectionSlug) {
        return null;
      }

      const short =
        ctx.story_short ||
        ctx.story_teaser ||
        ctx.story_caption ||
        "";

      const explicitSlug =
        ctx.story_slug ||
        ctx.slug;

      const slugBase = (explicitSlug || rawTitle).toString().trim();

      const slug = slugBase
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      return {
        slug,
        title: rawTitle,
        short,
        collectionSlug,
        coverPublicId: r.public_id as string,
      };
    });

    // Filter out nulls with a typed predicate (fixes the TS error you saw)
    return stories.filter(
      (x: HighlightStory | null): x is HighlightStory => Boolean(x),
    );
  } catch (err) {
    console.error("❌ Cloudinary highlight fetch failed:", err);
    // No static fallback, just return empty. The homepage will handle it.
    return [];
  }
}
