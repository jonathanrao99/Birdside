import RoutePage from "@/components/site/RoutePage";
import { createStaticRouteMetadata } from "@/lib/page-metadata";

export const generateMetadata = createStaticRouteMetadata("/about");

export default function AboutPage() {
  return <RoutePage route="/about" />;
}
