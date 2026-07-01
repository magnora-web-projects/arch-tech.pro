import { marqueeData } from "@/src/lib";
import InteractiveMarquee from "./05-InteractiveMarquee";

export default function MarqueeSection() {
  return (
    <section className="pb-24 w-full border-y border-slate-100">
      <InteractiveMarquee items={marqueeData} />
    </section>
  );
}
