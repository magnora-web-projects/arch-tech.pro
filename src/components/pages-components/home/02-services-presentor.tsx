import { servicesData } from "@/src/lib/home/servicesData";
import InteractiveServices from "./02-InteractiveServices";

export default function ServicesSection() {
  return <InteractiveServices services={servicesData} />;
}
