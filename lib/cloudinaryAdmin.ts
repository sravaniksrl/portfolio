// import { v2 as cloudinary } from "cloudinary";

// export type CloudinaryResource = {
//   public_id: string;
//   width: number;
//   height: number;
//   created_at?: string;
//   secure_url?: string;
//   context?: any;
// };

// function getAuthHeader() {
//   const key = process.env.CLOUDINARY_API_KEY;
//   const secret = process.env.CLOUDINARY_API_SECRET;
//   if (!key || !secret) throw new Error("Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET");
//   const token = Buffer.from(`${key}:${secret}`).toString("base64");
//   return `Basic ${token}`;
// }

// // export async function listCloudinaryFolderImages(params: {
// //   folder: string;            // e.g. "portfolio/cityscapes"
// //   maxResults?: number;       // Cloudinary max is 500 per request
// //   nextCursor?: string;       // for pagination beyond 500
// // }) {
// //   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// //   if (!cloudName) throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");

// //   const max = Math.min(params.maxResults ?? 100, 500);
// //   const qs = new URLSearchParams({
// //     type: "upload",
// //     prefix: params.folder.endsWith("/") ? params.folder : `${params.folder}/`,
// //     max_results: String(max),
// //   });
// //   if (params.nextCursor) qs.set("next_cursor", params.nextCursor);

// //   const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?${qs.toString()}`;

// //   const res = await fetch(url, {
// //     headers: {
// //       Authorization: getAuthHeader(),
// //     },
// //     // cache on server (fast) and refresh periodically
// //     // next: { revalidate: 3600 }, // 1 hour
// //     cache: "no-store",
// //   });

// //   if (!res.ok) {
// //     const txt = await res.text();
// //     throw new Error(`Cloudinary list failed (${res.status}): ${txt}`);
// //   }

// //   const json = await res.json();
// //   return {
// //     resources: (json.resources ?? []) as CloudinaryResource[],
// //     nextCursor: (json.next_cursor as string | undefined),
// //   };
// // }


// export async function listCloudinaryFolderImages(params: {
//   folder: string;
//   maxResults?: number;
//   nextCursor?: string;
// }) {
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//   if (!cloudName) throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");

//   const key = process.env.CLOUDINARY_API_KEY;
//   const secret = process.env.CLOUDINARY_API_SECRET;
//   if (!key || !secret) throw new Error("Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET");

//   const auth = Buffer.from(`${key}:${secret}`).toString("base64");

//   const body = {
//     expression: `resource_type:image AND folder:${params.folder}`,
//     max_results: Math.min(params.maxResults ?? 100, 500),
//     next_cursor: params.nextCursor,
//     // sort_by: [{ created: "desc" }],
//   };

//   const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${auth}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     const txt = await res.text();
//     throw new Error(`Cloudinary search failed (${res.status}): ${txt}`);
//   }

//   const json = await res.json();

//   return {
//     resources: json.resources ?? [],
//     nextCursor: json.next_cursor as string | undefined,
//   };
// }


// export async function getLatestImagePublicId(
//   folder: string
// ): Promise<string | undefined> {
//   const { resources } = await listCloudinaryFolderImages({
//     folder,
//     maxResults: 1,
//   });

//   return resources[0]?.public_id;
// }


// export type CloudinaryFolder = {
//   name: string; // e.g. "berlin"
//   path: string; // e.g. "portfolio/cityscapes/berlin"
// };

// /**
//  * List sub-folders inside a given Cloudinary folder.
//  * Example: folder="portfolio/cityscapes" → [{ name: "berlin", path: "portfolio/cityscapes/berlin" }, ...]
//  */
// export async function listCloudinarySubfolders(
//   folder: string
// ): Promise<CloudinaryFolder[]> {
//   const auth = getAuthHeader();
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//   if (!cloudName) throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");

//   // Cloudinary Admin API: GET /folders/:path
//   const url = `https://api.cloudinary.com/v1_1/${cloudName}/folders/${encodeURIComponent(
//     folder
//   )}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: auth,
//     },
//     // This code runs only on the server, so it's safe to call Admin API
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("Cloudinary sub_folders error:", res.status, text);
//     throw new Error(`Cloudinary sub_folders failed (${res.status})`);
//   }

//   const data = await res.json();
//   // data.folders: [{ name: "berlin", path: "portfolio/cityscapes/berlin" }, ...]
//   return (data.folders || []) as CloudinaryFolder[];
// }


// // export function humanizeFolderName(name: string): string {
// //   // "new-york_city" → "New York City"
// //   return name
// //     .replace(/[-_]+/g, " ")
// //     .replace(/\b\w/g, (c) => c.toUpperCase());
// // }

// lib/cloudinaryAdmin.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
  created_at?: string;
  secure_url?: string;
  folder?: string;
  context?: any;
};

const BASE_EXPR = (folder: string) =>
  // include images directly in the folder *and* in any sub-folder
  `(folder="${folder}" OR folder:"${folder}/*") AND resource_type:image`;

/**
 * List up to `maxResults` images from a folder and all its sub-folders.
 */
export async function listCloudinaryFolderImages(opts: {
  folder: string;
  maxResults?: number;
}) {
  const { folder, maxResults = 500 } = opts;

  const result = await cloudinary.search
    .expression(BASE_EXPR(folder))
    .sort_by("created_at", "desc")
    .max_results(maxResults)
    .execute();

  return result as {
    resources: CloudinaryResource[];
    total_count: number;
    next_cursor?: string;
  };
}

/**
 * Get the latest image’s public_id from a folder (including sub-folders).
 */
export async function getLatestImagePublicId(
  folder: string
): Promise<string | null> {
  const result = await cloudinary.search
    .expression(BASE_EXPR(folder))
    .sort_by("created_at", "desc")
    .max_results(1)
    .execute();

  const resource = (result.resources?.[0] ?? null) as
    | CloudinaryResource
    | null;

  return resource?.public_id ?? null;
}
