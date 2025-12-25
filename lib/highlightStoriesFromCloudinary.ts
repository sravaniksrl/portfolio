// lib/highlightStoriesFromCloudinary.ts
import { v2 as cloudinary } from "cloudinary";

export type HighlightStory = {
  slug: string;
  title: string;
  short: string;
  collectionSlug: string;
  heroPublicId?: string;
};

export async function getHighlightStoriesFromCloudinary(): Promise<HighlightStory[]> {
  try {
    const res = await cloudinary.search
      .expression(`folder=portfolio/* AND context.story_slug=*`)
      .with_field("context")
      .max_results(200)
      .execute();

    const stories: HighlightStory[] = [];

    for (const r of res.resources) {
      const ctx = r.context?.custom ?? {};

      if (!ctx.story_slug) continue;

      stories.push({
        slug: ctx.story_slug as string,
        title: ctx.story_title ?? ctx.story_slug,
        short: ctx.short_desc ?? "",
        collectionSlug: ctx.collection_slug ?? "",
        heroPublicId: r.public_id,
      });
    }

    return stories;
  } catch (e: any) {
    console.error("❌ Cloudinary highlight fetch failed:", e);
    return [];
  }
}
