export function cldImageUrl(publicId: string, opts?: {
  cloudName?: string;
  width?: number;
  quality?: string | number;
  format?: string;
  dpr?: string | number;
}) {
  const cloudName = opts?.cloudName ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return "";
  const t: string[] = [];
  if (opts?.width) t.push(`w_${opts.width}`);
  t.push("c_limit");
  t.push(`q_${opts?.quality ?? "auto"}`);
  t.push(`f_${opts?.format ?? "auto"}`);
  if (opts?.dpr) t.push(`dpr_${opts.dpr}`);
  return `https://res.cloudinary.com/${cloudName}/image/upload/${t.join(",")}/${publicId}`;
}
