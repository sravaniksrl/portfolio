// lib/collectionsWithLatestCovers.ts
import { collections, type Collection } from "@/data/collections";
import { getLatestImagePublicId } from "@/lib/cloudinaryAdmin";

export type CollectionWithCover = Collection & {
  coverPublicId?: string;
};

export async function getCollectionsWithLatestCovers(): Promise<CollectionWithCover[]> {
  return await Promise.all(
    collections.map(async (c) => {
      const latest = await getLatestImagePublicId(c.cloudinaryFolder);

      return {
        ...c,
        // prefer latest from Cloudinary, fall back to whatever was in data/collections
        coverPublicId: latest || c.coverPublicId,
      };
    })
  );
}
