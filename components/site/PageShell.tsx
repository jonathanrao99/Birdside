import SiteFooter from "@/components/site/SiteFooter";
import SiteNavbar from "@/components/site/SiteNavbar";
import type { ReactNode } from "react";

type PageShellProps = {
  mainHtml: string;
  /** Rendered after the navbar and before legacy `mainHtml` (e.g. home hero). */
  lead?: ReactNode;
};

export default function PageShell({ mainHtml, lead }: PageShellProps) {
  return (
    <div className="page-wrapper">
      <SiteNavbar />
      {lead}
      <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      <SiteFooter />
    </div>
  );
}
