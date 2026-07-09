import {
  HowWeWork,
  Intro,
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
      <Intro />
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
