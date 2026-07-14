import {
  Intro,
  Marketing,
  Marquee,
  MarqueeSec,
  ServiceShowCase,
  ServicesOne,
  Slider,
  Smooth,
  WorkFlow,
} from "@/src/components";
import { processData } from "@/src/lib";

export default function Home() {
  return (
    <Smooth>
      <Intro />
      <Slider />
      <ServicesOne />
      <Marketing />
      <ServiceShowCase />
      <MarqueeSec />
      <WorkFlow steps={processData} />
    </Smooth>
  );
}
