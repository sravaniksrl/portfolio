import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div className="flex gap-4">
          {site.socials.instagram ? <a className="hover:text-zinc-200" href={site.socials.instagram} target="_blank" rel="noreferrer">Instagram</a> : null}
          <a className="hover:text-zinc-200" href={site.socials.email}>Email</a>
        </div>
      </div>
    </footer>
  );
}
