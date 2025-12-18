"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Photo } from "@/data/photos";
import { cldImageUrl } from "@/lib/cloudinary";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function PhotoMap({ items }: { items: Photo[] }) {
  const withCoords = items.filter((p) => typeof p.lat === "number" && typeof p.lng === "number");
  if (withCoords.length === 0) return null;
  const center: [number, number] = [withCoords[0].lat!, withCoords[0].lng!];

  return (
    <div className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-soft">
      <div className="h-[420px] w-full">
        <MapContainer center={center} zoom={4} scrollWheelZoom className="h-full w-full">
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {withCoords.map((p) => (
            <Marker key={p.id} position={[p.lat!, p.lng!]} icon={icon}>
              <Popup>
                <div className="w-[200px]">
                  <img src={cldImageUrl(p.publicId, { width: 600 })} alt={p.alt} className="h-[120px] w-full rounded-lg object-cover" loading="lazy" />
                  <div className="mt-2 text-sm font-medium">{p.caption ?? p.alt}</div>
                  <div className="text-xs opacity-70">{[p.location, p.year].filter(Boolean).join(" • ")}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
