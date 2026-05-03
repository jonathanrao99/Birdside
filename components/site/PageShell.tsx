import SiteFooter from "@/components/site/SiteFooter";
import SiteNavbar from "@/components/site/SiteNavbar";
import { Fragment, type ReactNode } from "react";

export type PageShellMainSlot = string | ReactNode;

type PageShellProps = {
  /** Legacy single HTML document fragment (most routes). Omit when using `mainSlots`. */
  mainHtml?: string;
  /** Ordered segments: HTML strings render as inner HTML; nodes render as-is (e.g. `OurMenu`). */
  mainSlots?: PageShellMainSlot[];
  /** Rendered after the navbar and before main content (e.g. home hero). */
  lead?: ReactNode;
  /** Optional content inserted between lead and legacy `mainHtml`. */
  preMain?: ReactNode;
  /** Optional marker tag to insert `preMain` before within `mainHtml`. */
  insertPreMainBefore?: string;
};

function renderMainSlots(slots: PageShellMainSlot[]) {
  return slots.map((slot, i) =>
    typeof slot === "string" ? (
      <div key={i} dangerouslySetInnerHTML={{ __html: slot }} />
    ) : (
      <Fragment key={i}>{slot}</Fragment>
    )
  );
}

export default function PageShell({
  mainHtml = "",
  mainSlots,
  lead,
  preMain,
  insertPreMainBefore
}: PageShellProps) {
  if (mainSlots && mainSlots.length > 0) {
    return (
      <div className="page-wrapper">
        <div id="birdside-preloader-reveal">
          <SiteNavbar />
          {lead}
          {renderMainSlots(mainSlots)}
        </div>
        <SiteFooter />
      </div>
    );
  }

  const marker = insertPreMainBefore;
  const hasMarker = preMain && marker && mainHtml.includes(marker);

  if (hasMarker && marker) {
    const splitIndex = mainHtml.indexOf(marker);
    const beforeHtml = mainHtml.slice(0, splitIndex);
    const afterHtml = mainHtml.slice(splitIndex);
    return (
      <div className="page-wrapper">
        <div id="birdside-preloader-reveal">
          <SiteNavbar />
          {lead}
          <div dangerouslySetInnerHTML={{ __html: beforeHtml }} />
          {preMain}
          <div dangerouslySetInnerHTML={{ __html: afterHtml }} />
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div id="birdside-preloader-reveal">
        <SiteNavbar />
        {lead}
        {preMain}
        <div dangerouslySetInnerHTML={{ __html: mainHtml }} />
      </div>
      <SiteFooter />
    </div>
  );
}
