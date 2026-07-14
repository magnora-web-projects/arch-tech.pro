import { serviceCardsData } from "@/src/lib";
import { ServiceSlider } from "../../interactive-components";

export default function ServicesShowcase() {
  return <ServiceSlider cards={serviceCardsData} />;
}
