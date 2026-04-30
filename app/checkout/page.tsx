import RoutePage from "@/components/site/RoutePage";
import { createStaticRouteMetadata } from "@/lib/page-metadata";

export const generateMetadata = createStaticRouteMetadata("/checkout");

export default function CheckoutPage() {
  return <RoutePage route="/checkout" />;
}
