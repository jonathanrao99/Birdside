import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPostContent, getPostSlugs } from "@/lib/site-content";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getPostContent(slug);
  if (!content) return {};
  return buildPageMetadata(content.route, content);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const content = getPostContent(slug);

  if (!content) notFound();

  return <PageShell mainHtml={content.mainHtml} />;
}
