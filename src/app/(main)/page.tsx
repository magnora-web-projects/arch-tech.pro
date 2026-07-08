import {
  HowWeWork,
  Marketing,
  Marquee,
  ServiceShowCase,
  ServicesOne,
  Slider,
  Smooth,
  WhatWeDo,
} from "@/src/components";

export default function Home() {
  return (
    <Smooth>
      <Slider />
      <ServicesOne />
      <Marketing />
      <ServiceShowCase />
      <Marquee />
      <WhatWeDo />
      <HowWeWork />
    </Smooth>
  );
}
