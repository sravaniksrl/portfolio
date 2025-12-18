// "use client";

// import Image from "next/image";
// import { cldImageUrl } from "@/lib/cloudinary";
// import type { Photo } from "@/data/photos";

// export function PhotoGrid({ items }: { items: Photo[] }) {
//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//       {items.map((photo) => {
//         const src = cldImageUrl(photo.publicId, {
//           width: 1600,
//           quality: "auto",
//           format: "auto",
//         });

//         return (
//           <div
//             key={photo.publicId}
//             className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/20"
//           >
//             <Image
//               src={src}
//               alt={photo.publicId}
//               fill
//               sizes="(max-width: 768px) 100vw, 33vw"
//               className="object-cover transition-transform duration-700 hover:scale-105"
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/data/photos";
import { cldImageUrl } from "@/lib/cloudinary";

type Props = {
  items: Photo[];
  enableLightbox?: boolean;
};

export function PhotoGrid({ items, enableLightbox = false }: Props) {
  const [active, setActive] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((photo) => {
          const src = cldImageUrl(photo.publicId, { width: 1200 });

          const body = (
            <Image
              src={src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="h-full w-full rounded-3xl object-cover transition-transform duration-300 group-hover:scale-105"
            />
          );

          return (
            <div
              key={photo.publicId}
              className="group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10"
            >
              {enableLightbox ? (
                <button
                  type="button"
                  onClick={() => setActive(photo)}
                  className="block h-full w-full cursor-zoom-in"
                >
                  {body}
                </button>
              ) : (
                body
              )}
            </div>
          );
        })}
      </div>

      {enableLightbox && active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          {/* close button */}
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-100 hover:bg-white/20"
          >
            Close ✕
          </button>

          {/* image */}
          <div className="max-h-[90vh] max-w-[95vw]">
            <Image
              src={cldImageUrl(active.publicId, { width: 2000 })}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="h-auto w-auto max-h-[90vh] max-w-[95vw] rounded-3xl object-contain"
            />
            {active.caption && (
              <p className="mt-3 text-center text-sm text-zinc-200">
                {active.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
