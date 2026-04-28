import { notFound, redirect } from "next/navigation";
import { existsSync } from "fs";
import path from "path";

type LegacyRouteProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function LegacyRoute({ params }: LegacyRouteProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const joined = slug.join("/");

  const staticPath = joined ? `${joined}/index.html` : "index.html";
  const filePath = path.join(process.cwd(), "public", "legacy", staticPath);

  if (!existsSync(filePath)) {
    notFound();
  }

  redirect(`/legacy/${staticPath}`);
}
