import { processData } from "@/src/lib";
import { HowWeDo } from "../../interactive-components";

export default function ProcessSection() {
  return <HowWeDo steps={processData} />;
}
