import { cn } from "@/lib/cn";
export function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void; }) {
  return (
    <button type="button" onClick={onClick}
      className={cn("rounded-2xl px-3 py-2 text-sm ring-1 transition",
        active ? "bg-white text-zinc-950 ring-white/20" : "bg-white/5 text-zinc-200 ring-white/10 hover:bg-white/10")}>
      {children}
    </button>
  );
}
