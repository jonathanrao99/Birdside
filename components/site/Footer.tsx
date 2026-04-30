import { getSiteGlobal } from "@/lib/site-content";

export default function Footer() {
  const { footerHtml } = getSiteGlobal();

  return <div dangerouslySetInnerHTML={{ __html: footerHtml }} />;
}
