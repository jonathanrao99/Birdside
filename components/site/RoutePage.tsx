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

  const mainHtml =
    route === "/checkout"
      ? content.mainHtml.replace(
          /src=""/g,
          'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="'
        )
      : content.mainHtml;

  return (
    <PageShell
      mainHtml={mainHtml}
      preMain={
        route === "/checkout" ? (
          <h1 className="birdside-sr-only">Checkout</h1>
        ) : undefined
      }
    />
  );
}
