import { getHomeServices } from "@/src/lib";
import { ServiceRow } from "../../interactive-components";

export default async function ServicesSection() {
  const servicesData = await getHomeServices();

  return <ServiceRow services={servicesData} />;
}
