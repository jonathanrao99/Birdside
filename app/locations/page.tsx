import RoutePage from "@/components/site/RoutePage";
import { createStaticRouteMetadata } from "@/lib/page-metadata";

export const generateMetadata = createStaticRouteMetadata("/locations");

export default function LocationsPage() {
  return <RoutePage route="/locations" />;
}
