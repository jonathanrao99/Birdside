import RoutePage from "@/components/site/RoutePage";
import { createStaticRouteMetadata } from "@/lib/page-metadata";

export const generateMetadata = createStaticRouteMetadata("/blog");

export default function BlogPage() {
  return <RoutePage route="/blog" />;
}
