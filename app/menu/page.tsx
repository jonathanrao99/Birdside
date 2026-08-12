import BirdsideMenuPageClient from "@/components/site/menu-page/BirdsideMenuPageClient";
import JsonLd from "@/components/site/JsonLd";
import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import { getOurMenuData } from "@/lib/our-menu-data";
import { buildBreadcrumbJsonLd, buildMenuJsonLd } from "@/lib/local-seo";
import { createStaticRouteMetadata } from "@/lib/page-metadata";
import { getMenuRouteLeadAndRestInnerMainHtml } from "@/lib/split-page-html";
import { getRouteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";

export const generateMetadata = createStaticRouteMetadata("/menu");

export default function MenuPage() {
  const content = getRouteContent("/menu");
  if (!content) notFound();
  const { rest } = getMenuRouteLeadAndRestInnerMainHtml(content.mainHtml);
  const menuData = getOurMenuData();

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" }
          ]),
          ...(menuData ? [buildMenuJsonLd(menuData)] : [])
        ]}
      />
      <PageShell
        mainSlots={[
          <div key="menu-main" className="main-wrapper menu-page-route">
            {menuData ? (
              <BirdsideMenuPageClient data={menuData} />
            ) : (
              <OurMenu />
            )}
            <div dangerouslySetInnerHTML={{ __html: rest }} />
          </div>
        ]}
      />
    </>
  );
}
