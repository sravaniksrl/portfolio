"use client";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ baseHref, page, totalPages }: { baseHref: string; page: number; totalPages: number }) {
  const prev = page > 1 ? `${baseHref}?page=${page - 1}` : null;
  const next = page < totalPages ? `${baseHref}?page=${page + 1}` : null;

  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      <Link href={prev ?? "#"} aria-disabled={!prev}
        className={cn("inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm ring-1 ring-white/10 transition", prev ? "hover:bg-white/10" : "pointer-events-none opacity-40")}>
        <ChevronLeft className="h-4 w-4" /> Previous
      </Link>
      <div className="text-sm text-zinc-400">Page <span className="text-zinc-200">{page}</span> of <span className="text-zinc-200">{totalPages}</span></div>
      <Link href={next ?? "#"} aria-disabled={!next}
        className={cn("inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm ring-1 ring-white/10 transition", next ? "hover:bg-white/10" : "pointer-events-none opacity-40")}>
        Next <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
