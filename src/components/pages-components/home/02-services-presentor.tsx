import { servicesData } from "@/src/lib/home/servicesData";
import InteractiveServices from "./02-InteractiveServices";
import { getHomeServices } from "@/src/lib";

export default async function ServicesSection() {
  const servicesData = await getHomeServices();

  return <InteractiveServices services={servicesData} />;
}
