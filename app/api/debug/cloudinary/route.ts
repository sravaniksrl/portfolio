import { NextResponse } from "next/server";
import { listCloudinaryFolderImages } from "@/lib/cloudinaryAdmin";

export async function GET() {
  try {
    const folder = "portfolio/cityscapes";
    const result = await listCloudinaryFolderImages({ folder, maxResults: 50 });

    return NextResponse.json({
      folder,
      count: result.resources.length,
      first: result.resources[0]?.public_id ?? null,
      nextCursor: result.next_cursor ?? null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
