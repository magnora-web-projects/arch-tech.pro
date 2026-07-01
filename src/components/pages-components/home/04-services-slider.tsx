import { serviceCardsData } from "@/src/lib";
import InteractiveServiceSlider from "./04-InteractiveServiceSlider";

export default function ServicesShowcase() {
  return <InteractiveServiceSlider cards={serviceCardsData} />;
}
