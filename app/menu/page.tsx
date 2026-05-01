import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import { createStaticRouteMetadata } from "@/lib/page-metadata";
import { getMenuRouteInnerMainHtml } from "@/lib/split-page-html";
import { getRouteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";

export const generateMetadata = createStaticRouteMetadata("/menu");

export default function MenuPage() {
  const content = getRouteContent("/menu");
  if (!content) notFound();
  const innerMain = getMenuRouteInnerMainHtml(content.mainHtml);

  return (
    <PageShell
      mainSlots={[
        <div key="menu-main" className="main-wrapper">
          <OurMenu />
          <div dangerouslySetInnerHTML={{ __html: innerMain }} />
        </div>
      ]}
    />
  );
}
