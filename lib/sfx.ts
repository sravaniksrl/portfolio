"use client";
export function playShutter() {
  try {
    const enabled = window.localStorage.getItem("sfx") ?? "on";
    if (enabled !== "on") return;
    const a = new Audio("/sfx/shutter.mp3");
    a.volume = 0.25;
    void a.play();
  } catch {}
}
export function toggleSfx() {
  const enabled = window.localStorage.getItem("sfx") ?? "on";
  window.localStorage.setItem("sfx", enabled === "on" ? "off" : "on");
  return enabled === "on" ? "off" : "on";
}
export function getSfxSetting() {
  return (typeof window !== "undefined" ? (window.localStorage.getItem("sfx") ?? "on") : "on") as "on" | "off";
}
