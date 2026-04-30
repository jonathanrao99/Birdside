import SiteFooter from "@/components/site/SiteFooter";
import SiteNavbar from "@/components/site/SiteNavbar";
import type { ReactNode } from "react";

type PageShellProps = {
  mainHtml: string;
  /** Rendered after the navbar and before legacy `mainHtml` (e.g. home hero). */
  lead?: ReactNode;
  /** Optional content inserted between lead and legacy main HTML. */
  preMain?: ReactNode;
  /** Optional marker tag to insert `preMain` before within `mainHtml`. */
  insertPreMainBefore?: string;
};

export default function PageShell({
  mainHtml,
  lead,
  preMain,
  insertPreMainBefore
}: PageShellProps) {
  const marker = insertPreMainBefore;
  const hasMarker = preMain && marker && mainHtml.includes(marker);

  if (hasMarker && marker) {
    const splitIndex = mainHtml.indexOf(marker);
    const beforeHtml = mainHtml.slice(0, splitIndex);
    const afterHtml = mainHtml.slice(splitIndex);
    return (
      <div className="page-wrapper">
        <SiteNavbar />
        {lead}
        <div dangerouslySetInnerHTML={{ __html: beforeHtml }} />
        {preMain}
        <div dangerouslySetInnerHTML={{ __html: afterHtml }} />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <SiteNavbar />
      {lead}
      {preMain}
      <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      <SiteFooter />
    </div>
  );
}
