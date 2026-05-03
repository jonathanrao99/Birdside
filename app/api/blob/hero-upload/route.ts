import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const ALLOWED_PATHS = new Set([
  "hero/BirdsideDesktop.mov",
  "hero/BirdsideHeroMobile.mov"
]);

const MAX_BYTES = 750 * 1024 * 1024;

function assertUploadAuth(clientPayload: string | null): void {
  const envSecret = process.env.HERO_BLOB_UPLOAD_SECRET;
  if (!envSecret) {
    throw new Error("HERO_BLOB_UPLOAD_SECRET is not set");
  }
  let secret: string | undefined;
  try {
    secret = (JSON.parse(clientPayload ?? "{}") as { secret?: string }).secret;
  } catch {
    throw new Error("Invalid client payload");
  }
  if (secret !== envSecret) {
    throw new Error("Unauthorized");
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        assertUploadAuth(clientPayload);
        if (!ALLOWED_PATHS.has(pathname)) {
          throw new Error("Invalid pathname");
        }
        return {
          allowedContentTypes: ["video/quicktime", "video/mp4", "video/webm"],
          maximumSizeInBytes: MAX_BYTES,
          allowOverwrite: true,
          addRandomSuffix: false,
          cacheControlMaxAge: 30 * 24 * 60 * 60
        };
      },
      onUploadCompleted: async () => {
        // Optional: persist URL to DB. Does not run on localhost (Vercel callback).
      }
    });

    return NextResponse.json(jsonResponse);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const status =
      message === "Unauthorized" || message.includes("Invalid pathname")
        ? 403
        : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
