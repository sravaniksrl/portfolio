import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { cldImageUrl } from "@/lib/cloudinary";

export const dynamic = "force-static";

export default function AboutPage() {
  const portrait = cldImageUrl("demo/portrait", { width: 1400 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <SectionHeader title="About" subtitle="A short story behind the lens — and the kinds of images you’ll find here." />
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[420px_1fr] md:items-start">
        <Reveal className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-soft">
          <div className="aspect-[4/5] w-full">
            {portrait ? <img src={portrait} alt="Portrait" className="h-full w-full object-cover opacity-95" /> : <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />}
          </div>
        </Reveal>

        <Reveal className="space-y-5 text-zinc-300">
          <p className="text-base leading-relaxed">
            I’m Srinivas — an engineer and a nature & photography enthusiast. I like to photograph places the way they feel,
            not just the way they look: the calm before sunrise, the texture of streets after rain, and the small moments that pass too quickly.
          </p>
          <p className="text-base leading-relaxed">
            This portfolio is organized into collections and stories so you can browse smoothly without distractions.
          </p>
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.22em] text-zinc-400">Pro touch</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Add a one-line note for each collection (why you love it), and keep captions short. It reads premium.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
