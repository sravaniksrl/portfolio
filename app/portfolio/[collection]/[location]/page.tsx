// app/portfolio/[collection]/[location]/page.tsx
import { notFound } from "next/navigation";
import { collections } from "@/data/collections";
import { listCloudinaryFolderImages } from "@/lib/cloudinaryAdmin";
import { SectionHeader } from "@/components/SectionHeader";
import { GalleryExperience } from "@/components/GalleryExperience";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 50;

export default async function SubCollectionPage({
  params,
}: {
  params: Promise<{ collection: string; location: string }>;
}) {
  const { collection, location } = await params;

  // find parent collection (cityscapes, landscapes, …)
  const parent = collections.find((x) => x.slug === collection);
  if (!parent) return notFound();

  // Cloudinary folder: e.g. "portfolio/cityscapes/Berlin"
  const folder = `${parent.cloudinaryFolder}/${decodeURIComponent(location)}`;

  const res = await listCloudinaryFolderImages({
    folder,
    maxResults: PAGE_SIZE,
  });

  if (!res.resources.length) return notFound();

  const items = res.resources.map((r: any) => ({
    id: r.public_id,
    publicId: r.public_id,
    width: r.width,
    height: r.height,
    alt: r.public_id.split("/").pop() ?? "Photo",
    caption: r.context?.custom?.caption ?? undefined,
    location: decodeURIComponent(location),
    year: r.context?.custom?.year ?? undefined,
    tags: [parent.slug],
    lat: r.context?.custom?.lat ? Number(r.context.custom.lat) : undefined,
    lng: r.context?.custom?.lng ? Number(r.context.custom.lng) : undefined,
  }));

  const title = decodeURIComponent(location);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <SectionHeader title={title} subtitle={parent.description} />
      <div className="mt-6">
        <GalleryExperience items={items} />
      </div>
    </div>
  );
}
