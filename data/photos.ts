export type Exif = {
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
};

export type Photo = {
  id: string;
  publicId: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  location?: string;
  year?: string;
  tags: string[];
  lat?: number;
  lng?: number;
  exif?: Exif;
  beforePublicId?: string;
  afterPublicId?: string;
};

export const photos: Photo[] = [
  { id: "c1", publicId: "demo/city-01", width: 1600, height: 1067, alt: "City at dusk", caption: "City at dusk", location: "Berlin", year: "2023", tags: ["cityscapes"], lat: 52.52, lng: 13.405, exif: { camera: "Sony A7", lens: "35mm", aperture: "f/2.8", shutter: "1/125", iso: "200" } },
  { id: "c2", publicId: "demo/city-02", width: 1200, height: 1600, alt: "Street frame", caption: "Street frame", location: "Amsterdam", year: "2022", tags: ["cityscapes"], lat: 52.3676, lng: 4.9041 },
  { id: "c3", publicId: "demo/city-03", width: 1600, height: 1200, alt: "Reflections", caption: "Reflections", location: "Vienna", year: "2021", tags: ["cityscapes"], lat: 48.2082, lng: 16.3738 },
  { id: "l1", publicId: "demo/land-01", width: 1800, height: 1200, alt: "Mountain ridge", caption: "Mountain ridge", location: "Harz", year: "2022", tags: ["landscapes"] },
  { id: "l2", publicId: "demo/land-02", width: 1200, height: 1800, alt: "Forest trail", caption: "Forest trail", location: "Schwaneberg", year: "2023", tags: ["landscapes"], beforePublicId: "demo/land-02-before", afterPublicId: "demo/land-02" },
  { id: "l3", publicId: "demo/land-03", width: 1600, height: 1067, alt: "Sunset water", caption: "Sunset water", location: "Coast", year: "2021", tags: ["landscapes"] },
  { id: "w1", publicId: "demo/wild-01", width: 1600, height: 1200, alt: "Bird closeup", caption: "Bird closeup", year: "2022", tags: ["wildlife"] },
  { id: "w2", publicId: "demo/wild-02", width: 1200, height: 1600, alt: "Quiet gaze", caption: "Quiet gaze", year: "2023", tags: ["wildlife"] },
  { id: "a1", publicId: "demo/abs-01", width: 1600, height: 1067, alt: "Lines and light", caption: "Lines and light", year: "2023", tags: ["abstract"] },
  { id: "a2", publicId: "demo/abs-02", width: 1200, height: 1600, alt: "Color study", caption: "Color study", year: "2022", tags: ["abstract"] }
];
