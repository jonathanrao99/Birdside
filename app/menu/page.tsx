import RoutePage from "@/components/site/RoutePage";
import { createStaticRouteMetadata } from "@/lib/page-metadata";

export const generateMetadata = createStaticRouteMetadata("/menu");

export default function MenuPage() {
  return <RoutePage route="/menu" />;
}
