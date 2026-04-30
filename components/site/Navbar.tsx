import { getSiteGlobal } from "@/lib/site-content";

export default function Navbar() {
  const { navbarHtml } = getSiteGlobal();

  return <div dangerouslySetInnerHTML={{ __html: navbarHtml }} />;
}
