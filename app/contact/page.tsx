import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <SectionHeader title="Contact" subtitle="For collaborations, licensing, prints, or a hello — reach out." />
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <a href={site.socials.email} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 shadow-soft transition hover:bg-white/10">
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-400">Email</p>
          <p className="mt-2 text-base font-medium text-white">Send an email</p>
          <p className="mt-1 text-sm text-zinc-400">Opens your email client</p>
        </a>
        <a href={site.socials.instagram || "#"} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 shadow-soft transition hover:bg-white/10">
          <p className="text-sm uppercase tracking-[0.22em] text-zinc-400">Social</p>
          <p className="mt-2 text-base font-medium text-white">Instagram</p>
          <p className="mt-1 text-sm text-zinc-400">Add the link in lib/site.ts</p>
        </a>
      </div>
    </div>
  );
}
