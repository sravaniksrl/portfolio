"use client";

import { notFound } from "next/navigation";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/slideshow.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { stories } from "@/data/stories";
import { photos } from "@/data/photos";
import { cldImageUrl } from "@/lib/cloudinary";
import { playShutter } from "@/lib/sfx";

export default function StoryViewer({ params }: { params: { slug: string } }) {
  const story = stories.find(s => s.slug === params.slug);
  if (!story) return notFound();

  const items = story.photoIds.map(id => photos.find(p => p.id === id)).filter(Boolean) as typeof photos;
  const slides = useMemo(() => items.map(p => ({
    src: cldImageUrl(p.publicId, { width: 3000 }),
    title: p.caption ?? "",
    description: [p.location, p.year].filter(Boolean).join(" • "),
  })), [items]);

  const [open, setOpen] = useState(true);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 shadow-soft">
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Story</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{story.title}</h1>
        <p className="mt-2 text-sm text-zinc-300/80 md:text-base">{story.subtitle}</p>
        <button type="button" onClick={() => { playShutter(); setOpen(true); }}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 shadow-soft transition hover:opacity-95">
          Play story
        </button>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Captions, Counter, Slideshow, Thumbnails]}
        slideshow={{ autoplay: true, delay: 2800 }}
        thumbnails={{ position: "bottom", width: 96, height: 64, border: 0, padding: 0, gap: 8 }}
      />
    </div>
  );
}
