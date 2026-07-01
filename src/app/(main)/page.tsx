import {
  HowWeWork,
  Marketing,
  Marquee,
  ServiceShowCase,
  ServicesOne,
  Slider,
  WhatWeDo,
} from "@/src/components";

export default function Home() {
  return (
    <>
      <Slider />
      <ServicesOne />
      <Marketing />
      <ServiceShowCase />
      <Marquee />
      <WhatWeDo />
      {/*  */}
      <HowWeWork />
    </>
  );
}
