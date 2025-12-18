import { cn } from "@/lib/cn";
export function SectionHeader({ title, subtitle, className, right }: { title: string; subtitle?: string; className?: string; right?: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2 md:flex-row md:items-end md:justify-between", className)}>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">{title}</h2>
        {subtitle ? <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">{subtitle}</p> : null}
      </div>
      {right ? <div className="mt-3 md:mt-0">{right}</div> : null}
    </div>
  );
}
