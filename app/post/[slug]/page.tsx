import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import { getPostContent, getPostSlugs } from "@/lib/site-content";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const content = getPostContent(slug);

  if (!content) notFound();

  return <PageShell mainHtml={content.mainHtml} />;
}
