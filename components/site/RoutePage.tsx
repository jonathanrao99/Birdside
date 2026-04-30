import { notFound } from "next/navigation";
import PageShell from "@/components/site/PageShell";
import { getRouteContent } from "@/lib/site-content";

type RoutePageProps = {
  route: string;
};

export default function RoutePage({ route }: RoutePageProps) {
  const content = getRouteContent(route);

  if (!content) {
    notFound();
  }

  return <PageShell mainHtml={content.mainHtml} />;
}
