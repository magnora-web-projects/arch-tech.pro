import { marqueeData } from "@/src/lib";
import { Marquee } from "../../interactive-components";

export default function MarqueeSection() {
  return (
    <section className=" w-full border-y border-slate-100">
      <Marquee items={marqueeData} />
    </section>
  );
}
