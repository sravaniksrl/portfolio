"use client";
import { useEffect, useState } from "react";
import { getSfxSetting, toggleSfx } from "@/lib/sfx";
import { Volume2, VolumeX } from "lucide-react";

export function ToggleSfx() {
  const [s, setS] = useState<"on" | "off">("on");
  useEffect(() => { setS(getSfxSetting()); }, []);
  return (
    <button onClick={() => setS(toggleSfx())}
      className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/10"
      aria-label="Toggle sound effects" title="Toggle sound effects" type="button">
      {s === "on" ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      SFX {s.toUpperCase()}
    </button>
  );
}
