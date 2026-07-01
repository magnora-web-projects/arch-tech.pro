import { processData } from "@/src/lib";
import InteractiveProcess from "./08-InteractiveHowWeWork";

export default function ProcessSection() {
  return <InteractiveProcess steps={processData} />;
}
