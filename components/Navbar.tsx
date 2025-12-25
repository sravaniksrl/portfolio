// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/cn";
// import { Camera } from "lucide-react";

// const links = [
//   { href: "/", label: "Home" },
//   { href: "/portfolio", label: "Portfolio" },
//   { href: "/stories", label: "Stories" },
//   { href: "/about", label: "About" },
//   { href: "/contact", label: "Contact" }
// ];

// export function Navbar() {
//   const pathname = usePathname();
//   return (
//     <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur">
//       <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
//         <Link href="/" className="group inline-flex items-center gap-2">
//           <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-soft">
//             <Camera className="h-4 w-4 text-zinc-100" />
//           </span>
//           <span className="text-sm font-medium tracking-wide text-zinc-100/90 group-hover:text-zinc-50">
//             Srinivas Potharaju
//           </span>
//         </Link>

//         <nav className="flex items-center gap-1">
//           {links.map((l) => {
//             const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
//             return (
//               <Link key={l.href} href={l.href}
//                 className={cn("rounded-2xl px-3 py-2 text-sm transition",
//                   active ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white")}>
//                 {l.label}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>
//     </header>
//   );
// }


"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="h-9 w-9 rounded-full bg-white/10" />
          <span className="font-medium">Srinivas Potharaju</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base text-zinc-100 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
