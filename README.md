# Premium Photography Portfolio (Next.js)

Includes:
- Collections + Masonry gallery + Fullscreen lightbox
- Story Mode (/stories) with autoplay slideshow
- EXIF/Shot details drawer in lightbox
- Map View (Leaflet) using optional lat/lng per photo
- Before/After edit slider (optional per photo)
- Filters (location/year) + Grid/Map toggle
- Scroll progress indicator + optional shutter SFX toggle

## Run
```bash
npm install
cp .env.example .env.local
# set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
npm run dev
```

## Optional shutter sound
Place an mp3 at: `public/sfx/shutter.mp3` (or remove ToggleSfx feature)
