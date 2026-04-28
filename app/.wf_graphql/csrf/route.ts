import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ csrfToken: "legacy-static-site" });
}

export async function GET() {
  return NextResponse.json({ csrfToken: "legacy-static-site" });
}
