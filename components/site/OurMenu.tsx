import HomeMenuClient from "@/components/site/home-menu/HomeMenuClient";
import { getOurMenuData } from "@/lib/our-menu-data";
import { getOurMenuHtml } from "@/lib/site-content";

/**
 * Prefers structured `content/generated/our-menu.json` (see `scripts/extract-our-menu.mjs`);
 * falls back to legacy `ourMenuHtml` if missing.
 */
export default function OurMenu() {
  const data = getOurMenuData();
  if (data) {
    return (
      <HomeMenuClient
        key={`${data.version}-${data.defaultTabId}-${data.tabs.length}`}
        data={data}
      />
    );
  }
  const html = getOurMenuHtml();
  if (!html) return null;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
