// import { collections } from "@/data/collections";
// import { CollectionCard } from "@/components/CollectionCard";
// import { Reveal } from "@/components/Reveal";
// import { SectionHeader } from "@/components/SectionHeader";
// import { ToggleSfx } from "@/components/ToggleSfx";

// export const dynamic = "force-static";

// export default function PortfolioPage() {
//   return (
//     <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
//       <SectionHeader
//         title="Portfolio"
//         subtitle="Collections designed for an immersive, distraction-free viewing experience."
//         right={<ToggleSfx />}
//       />
//       <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
//         {collections.map((c) => (
//           <Reveal key={c.slug}>
//             <CollectionCard c={c} />
//           </Reveal>
//         ))}
//       </div>
//     </div>
//   );
// }


// app/portfolio/page.tsx
import { CollectionCard } from "@/components/CollectionCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ToggleSfx } from "@/components/ToggleSfx";
import { getCollectionsWithLatestCovers } from "@/lib/collectionsWithLatestCovers";

export const revalidate = 60; // adjust as you like

export default async function PortfolioPage() {
  const cols = await getCollectionsWithLatestCovers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <SectionHeader
        title="Portfolio"
        subtitle="Collections designed for an immersive, distraction-free viewing experience."
        right={<ToggleSfx />}
      />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {cols.map((c) => (
          <Reveal key={c.slug}>
            <CollectionCard c={c} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
