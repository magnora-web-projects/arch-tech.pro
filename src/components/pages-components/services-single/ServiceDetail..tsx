import ServiceHero from "./ServiceHero";
import ServiceFeatures from "./ServiceFeatures";
import ServiceContent from "./ServiceContent";
import ServiceFaq from "./ServiceFaq";
import { ServicePageData } from "@/src/lib/types/";

export default function ServiceDetail({ data }: { data: ServicePageData }) {
  return (
    <main className="w-full min-h-screen bg-[#050505] overflow-hidden selection:bg-orange-500/30">
      <ServiceHero
        title={data.title}
        banner_image={data.banner_image}
        header_title={data.header_title}
        header_description={data.header_description}
      />

      <div className="relative z-20 w-full bg-[#050505]">
        <div className="w-[90%] max-w-[1400px] mx-auto py-20 md:py-32">
          <ServiceFeatures features={data.features} />
          <ServiceContent content={data.content} />
          <ServiceFaq
            title={data.faq_title}
            description={data.faq_description}
            faqs={data.faqs}
          />
        </div>
      </div>
    </main>
  );
}
