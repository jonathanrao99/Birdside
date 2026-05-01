import { getOurMenuHtml } from "@/lib/site-content";

/** Shared home-style Our Menu block (`section_home-menu`); content lives in `global.ourMenuHtml`. */
export default function OurMenu() {
  const html = getOurMenuHtml();
  if (!html) return null;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
