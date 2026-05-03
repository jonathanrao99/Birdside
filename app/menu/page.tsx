import MenuPageLead from "@/components/site/MenuPageLead";
import OurMenu from "@/components/site/OurMenu";
import PageShell from "@/components/site/PageShell";
import { createStaticRouteMetadata } from "@/lib/page-metadata";
import { getMenuRouteLeadAndRestInnerMainHtml } from "@/lib/split-page-html";
import { getRouteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";

export const generateMetadata = createStaticRouteMetadata("/menu");

export default function MenuPage() {
  const content = getRouteContent("/menu");
  if (!content) notFound();
  const { lead, rest } = getMenuRouteLeadAndRestInnerMainHtml(content.mainHtml);

  return (
    <PageShell
      mainSlots={[
        <div key="menu-main" className="main-wrapper">
          <OurMenu />
          <MenuPageLead html={lead} />
          <div dangerouslySetInnerHTML={{ __html: rest }} />
        </div>
      ]}
    />
  );
}
