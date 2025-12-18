// import { notFound } from "next/navigation";
// import { collections } from "@/data/collections";
// import { SectionHeader } from "@/components/SectionHeader";
// import { Pagination } from "@/components/Pagination";
// import { GalleryExperience } from "@/components/GalleryExperience";
// import { listCloudinaryFolderImages } from "@/lib/cloudinaryAdmin";

// export const dynamic = "force-dynamic"; // Cloudinary is remote content
// const PAGE_SIZE = 36;

// export default async function CollectionPage({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ collection: string }>;
//   searchParams: Promise<Record<string, string | string[] | undefined>>;
// }) {
//   const { collection } = await params;
//   const sp = await searchParams;
//   const page = Math.max(1, Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1);

//   const c = collections.find((x) => x.slug === collection);
//   if (!c) return notFound();

//   // ✅ Fetch from Cloudinary folder (e.g. "portfolio/cityscapes")
//   const res = await listCloudinaryFolderImages({
//     folder: c.cloudinaryFolder,
//     maxResults: 500, // fetch up to 500 for now; we can add cursor pagination later
//   });

//   // ✅ Convert Cloudinary resources → items expected by PhotoGrid/GalleryExperience
//   const all = res.resources.map((r: any) => ({
//     publicId: r.public_id,
//     width: r.width,
//     height: r.height,
//     // Optional fields (may be undefined, that's OK)
//     alt: r.public_id.split("/").pop() ?? "Photo",
//     title: r.public_id.split("/").pop() ?? "Photo",
//     location: undefined,
//     year: undefined,
//     lat: undefined,
//     lng: undefined,
//   }));

//   // Local pagination (since Cloudinary cursor pagination is optional)
//   const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
//   const safePage = Math.min(page, totalPages);
//   const start = (safePage - 1) * PAGE_SIZE;
//   const items = all.slice(start, start + PAGE_SIZE);

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
//       <SectionHeader title={c.title} subtitle={c.description} />
//       <div className="mt-6">
//         {/* <div className="text-xs text-zinc-400">First ID: {items[0]?.publicId}</div> */}
//         <GalleryExperience items={items} />
//         <Pagination baseHref={`/portfolio/${c.slug}`} page={safePage} totalPages={totalPages} />
//       </div>
//     </div>
//   );
// }


import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { collections } from "@/data/collections";
import { SectionHeader } from "@/components/SectionHeader";
import { Pagination } from "@/components/Pagination";
import { GalleryExperience } from "@/components/GalleryExperience";
import { listCloudinaryFolderImages } from "@/lib/cloudinaryAdmin";
import { cldImageUrl } from "@/lib/cloudinary";
import type { Photo } from "@/data/photos";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 36;

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { collection } = await params;
  const sp = await searchParams;

  const page = Math.max(
    1,
    Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1
  );

  const c = collections.find((x) => x.slug === collection);
  if (!c) return notFound();

  const rootFolder = c.cloudinaryFolder; // e.g. "portfolio/cityscapes"

  const result = await listCloudinaryFolderImages({
    folder: rootFolder,
    maxResults: 500,
  });

  // Map Cloudinary resources -> Photo objects
  const all: Photo[] = result.resources.map((r: any) => {
    const parts = r.public_id.split("/"); // ["portfolio","cityscapes",...]

    // Only treat it as a location if there is *another* level
    // beyond the collection folder, i.e. portfolio/cityscapes/<Location>/image
    let maybeLocation: string | undefined = undefined;
    if (parts.length > 3) {
      // e.g. ["portfolio","cityscapes","Berlin","img"] -> "Berlin"
      maybeLocation = parts[parts.length - 2];
    }

    const year = r.created_at ? String(r.created_at).slice(0, 4) : undefined;

    return {
      id: r.asset_id,
      publicId: r.public_id,
      width: r.width,
      height: r.height,
      alt: r.public_id.split("/").pop() ?? "Photo",
      caption: r.context?.custom?.caption ?? "",
      location: maybeLocation, // <- sub-folder name (Berlin, Vienna, …)
      year,
      tags: [collection],
      lat: undefined,
      lng: undefined,
    };
  });

  // --- Build "sub-collections" from sub-folders (Berlin, Vienna, …) ---
  type SubCollection = {
    slug: string;          // e.g. "Berlin"
    title: string;         // display title
    coverPublicId: string; // first photo's publicId
    count: number;         // number of photos
  };

  const subMap = new Map<string, SubCollection>();

  for (const p of all) {
    const loc = p.location ?? "Unsorted";
    if (!subMap.has(loc)) {
      subMap.set(loc, {
        slug: loc,
        title: loc,
        coverPublicId: p.publicId,
        count: 1,
      });
    } else {
      subMap.get(loc)!.count += 1;
    }
  }

  const subCollections = Array.from(subMap.values()).sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // --- Gallery pagination (still over all photos for now) ---
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const items = all.slice(start, start + PAGE_SIZE);

  // optional: allow card click to pre-filter by location via ?loc=
  const initialLocationParam =
    typeof sp.loc === "string" ? decodeURIComponent(sp.loc) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <SectionHeader title={c.title} subtitle={c.description} />

      {/* 🔹 Sub-collections (one card per sub-folder) */}
      {subCollections.length > 1 && (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {subCollections.map((sub) => {
            const href = `/portfolio/${c.slug}/${encodeURIComponent(
              sub.slug
            )}`;

            const coverSrc = cldImageUrl(sub.coverPublicId, { width: 1600 });

            return (
              <Link
                key={sub.slug}
                href={href}
                className="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {coverSrc && (
                    <Image
                      src={coverSrc}
                      alt={sub.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {sub.count} photo{sub.count === 1 ? "" : "s"}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-400 group-hover:text-white">
                    View collection →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* 🔹 Full gallery (optionally pre-filtered by ?loc=…) */}
      <div className="mt-10">
        <GalleryExperience
          items={items}
          initialLocation={initialLocationParam}
        />
        <Pagination
          baseHref={`/portfolio/${c.slug}`}
          page={safePage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
