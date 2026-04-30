import RoutePage from "@/components/site/RoutePage";
import { createStaticRouteMetadata } from "@/lib/page-metadata";

export const generateMetadata = createStaticRouteMetadata("/contact");

export default function ContactPage() {
  return <RoutePage route="/contact" />;
}
